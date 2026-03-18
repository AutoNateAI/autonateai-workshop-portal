import {copyText} from '../lib/copy.js';
import {workflowIndex} from '../data/workflows.js';

export function initCopyPrompt() {
  document.querySelectorAll('[data-copy-prompt]').forEach((button) => {
    button.addEventListener('click', async () => {
      const slug = button.getAttribute('data-copy-prompt');
      const workflow = workflowIndex[slug];
      if (!workflow) {
        return;
      }

      await copyText(workflow.prompt);
      const originalText = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    });
  });
}
