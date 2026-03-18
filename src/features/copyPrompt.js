import {copyText} from '../lib/copy.js';

export function initCopyPrompt() {
  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const targetId = button.getAttribute('data-copy-target');
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      await copyText(target.textContent || '');
      const originalText = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    });
  });
}
