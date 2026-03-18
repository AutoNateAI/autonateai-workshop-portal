import {copyText} from '../lib/copy.js';

export function initCopyPrompt() {
  document.querySelectorAll('[data-template-field]').forEach((field) => {
    field.addEventListener('input', autoSizeField);
    autoSizeField({currentTarget: field});
  });

  document.querySelectorAll('[data-copy-template]').forEach((button) => {
    button.addEventListener('click', async () => {
      const templateId = button.getAttribute('data-copy-template');
      const template = document.getElementById(templateId);
      const promptRoot = document.querySelector(`[data-prompt-root="${templateId}"]`);
      if (!template || !promptRoot) {
        return;
      }

      const fields = Array.from(promptRoot.querySelectorAll('[data-template-field]'));
      let fieldIndex = 0;
      const compiledText = (template.value || '').replace(/\[[^\]]+\]/g, (match) => {
        const field = fields[fieldIndex++];
        const value = field?.value?.trim();
        return value || match;
      });

      await copyText(compiledText);
      const originalText = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    });
  });
}

function autoSizeField(event) {
  const field = event.currentTarget;
  field.style.height = 'auto';
  field.style.height = `${Math.max(38, field.scrollHeight)}px`;
}
