#!/usr/bin/env python3
"""
Batch Image Generator for AutoNateAI
Generates multiple images concurrently using OpenAI gpt-image-1.5
"""

import os
import sys
import json
import asyncio
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime
from openai import AsyncOpenAI


class BatchImageGenerator:
    def __init__(
        self,
        api_key: str,
        concurrency: int = 5,
        max_retries: int = 3,
        timeout: int = 120
    ):
        self.api_key = api_key
        self.concurrency = concurrency
        self.max_retries = max_retries
        self.timeout = timeout
        self.semaphore = asyncio.Semaphore(concurrency)
        self.client = AsyncOpenAI(api_key=api_key)
        
        # Stats tracking
        self.successful = 0
        self.failed = 0
        self.start_time: Optional[datetime] = None
    
    async def generate_single_image(
        self,
        image_config: Dict[str, Any],
        index: int,
        total: int
    ) -> bool:
        """Generate a single image with retry logic."""
        prompt = image_config["prompt"]
        output_path = image_config["output"]
        references = image_config.get("references", [])
        model = image_config.get("model", "gpt-image-1.5")
        size = image_config.get("size", "1536x1024")
        quality = image_config.get("quality", "high")
        fidelity = image_config.get("fidelity", "high")
        
        async with self.semaphore:
            # Ensure output directory exists
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            
            for attempt in range(self.max_retries):
                try:
                    # Load reference images if any
                    image_files = []
                    for ref_path in references:
                        if os.path.exists(ref_path):
                            image_files.append(open(ref_path, "rb"))
                        else:
                            print(f"⚠️ Warning: Reference image not found at {ref_path}")
                    
                    # Make API request
                    if image_files:
                        # Using edit endpoint with references
                        result = await self.client.images.edit(
                            model=model,
                            image=image_files,
                            prompt=prompt,
                            input_fidelity=fidelity,
                            size=size,
                            quality=quality
                        )
                    else:
                        # Using generate endpoint
                        result = await self.client.images.generate(
                            model=model,
                            prompt=prompt,
                            size=size,
                            quality=quality
                        )
                    
                    # Save image
                    image_base64 = result.data[0].b64_json
                    import base64
                    image_bytes = base64.b64decode(image_base64)
                    
                    with open(output_path, "wb") as f:
                        f.write(image_bytes)
                    
                    self.successful += 1
                    print(f"✅ [{index}/{total}] {os.path.basename(output_path)}")
                    
                    # Close file handles
                    for f in image_files:
                        f.close()
                    
                    return True
                
                except Exception as e:
                    error_msg = str(e)
                    # Close file handles on error
                    for f in image_files:
                        f.close()
                    
                    # Check for safety block
                    if "safety" in error_msg.lower() or "moderation" in error_msg.lower():
                        print(f"❌ [{index}/{total}] {os.path.basename(output_path)} - Safety blocked")
                        return False
                    
                    # Check for rate limit
                    if "429" in error_msg:
                        wait_time = (2 ** attempt) * 2
                        print(f"⏳ Rate limited, waiting {wait_time}s before retry...")
                        await asyncio.sleep(wait_time)
                        continue
                    
                    print(f"❌ [{index}/{total}] Error: {error_msg}")
                    if attempt < self.max_retries - 1:
                        await asyncio.sleep(2 ** attempt)
                        continue
                    break
            
            self.failed += 1
            return False

    async def generate_batch(self, images: List[Dict[str, Any]]) -> Dict[str, int]:
        """Generate all images in the batch concurrently."""
        self.start_time = datetime.now()
        total = len(images)

        print(f"🚀 Batch Image Generator - Starting...")
        print(f"📊 Total images: {total} | Concurrency: {self.concurrency}")
        print()

        tasks = [
            self.generate_single_image(img_config, i + 1, total)
            for i, img_config in enumerate(images)
        ]

        await asyncio.gather(*tasks)

        elapsed = datetime.now() - self.start_time
        print()
        print(f"🎉 Batch complete! {self.successful}/{total} images generated successfully.")
        print(f"⏱️  Total time: {elapsed}")

        return {
            "successful": self.successful,
            "failed": self.failed,
            "elapsed_seconds": elapsed.total_seconds()
        }


def load_config(config_path: str) -> Dict[str, Any]:
    """Load batch configuration from JSON file."""
    with open(config_path, "r") as f:
        return json.load(f)


def main():
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Batch generate images using OpenAI gpt-image-1.5"
    )
    parser.add_argument(
        "--config",
        required=True,
        help="Path to batch configuration JSON file"
    )
    parser.add_argument(
        "--concurrency",
        type=int,
        default=None,
        help="Override concurrency from config (1-10)"
    )
    
    args = parser.parse_args()
    
    # Load configuration
    try:
        config = load_config(args.config)
    except Exception as e:
        print(f"❌ Error loading config: {e}")
        sys.exit(1)
    
    # Get API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set.")
        sys.exit(1)
    
    # Override concurrency if specified
    concurrency = args.concurrency or config.get("concurrency", 5)
    concurrency = max(1, min(10, concurrency))  # Clamp between 1-10
    
    # Create generator and run
    generator = BatchImageGenerator(
        api_key=api_key,
        concurrency=concurrency,
        max_retries=config.get("max_retries", 3),
        timeout=config.get("timeout", 120)
    )
    
    # Run batch generation
    stats = asyncio.run(generator.generate_batch(config["images"]))
    
    # Exit with appropriate code
    sys.exit(0 if stats["failed"] == 0 else 1)


if __name__ == "__main__":
    main()
