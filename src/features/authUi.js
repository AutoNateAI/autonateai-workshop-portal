import {navigateTo} from '../lib/router.js';
import {registerEmail, signInEmail, signInGoogle} from '../lib/auth.js';

export function initAuthUi() {
  const form = document.querySelector('[data-auth-form]');
  if (!form) {
    return;
  }

  const feedback = document.querySelector('[data-auth-feedback]');
  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');

  function setFeedback(message) {
    if (feedback) {
      feedback.textContent = message;
    }
  }

  async function submit(mode) {
    const email = emailInput?.value?.trim();
    const password = passwordInput?.value || '';

    if (!email || !password) {
      setFeedback('Email and password are required.');
      return;
    }

    setFeedback(mode === 'register' ? 'Creating account...' : 'Signing in...');

    try {
      if (mode === 'register') {
        await registerEmail(email, password);
      } else {
        await signInEmail(email, password);
      }
      navigateTo('/');
    } catch (error) {
      setFeedback(error.message || 'Auth failed.');
    }
  }

  form.querySelector('[data-auth-action="login"]')?.addEventListener('click', () => submit('login'));
  form.querySelector('[data-auth-action="register"]')?.addEventListener('click', () => submit('register'));
  form.querySelector('[data-auth-action="google"]')?.addEventListener('click', async () => {
    setFeedback('Opening Google sign-in...');
    try {
      await signInGoogle();
      navigateTo('/');
    } catch (error) {
      setFeedback(error.message || 'Google sign-in failed.');
    }
  });
}
