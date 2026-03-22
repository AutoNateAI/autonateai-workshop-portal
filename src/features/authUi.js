import {navigateTo} from '../lib/router.js';
import {sendPortalPasswordReset, signInEmail, signInGoogle, updatePortalPassword} from '../lib/auth.js';

export function initAuthUi() {
  const form = document.querySelector('[data-auth-form]');
  const feedback = document.querySelector('[data-auth-feedback]');

  function setFeedback(message) {
    if (feedback) {
      feedback.textContent = message;
    }
  }

  if (form) {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    async function submit() {
      const email = emailInput?.value?.trim();
      const password = passwordInput?.value || '';

      if (!email || !password) {
        setFeedback('Email and password are required.');
        return;
      }

      setFeedback('Signing in...');

      try {
        await signInEmail(email, password);
        navigateTo('/');
      } catch (error) {
        setFeedback(error.message || 'Auth failed.');
      }
    }

    form.querySelector('[data-auth-action="login"]')?.addEventListener('click', () => submit());
    form.querySelector('[data-auth-action="google"]')?.addEventListener('click', async () => {
      setFeedback('Opening Google sign-in...');
      try {
        await signInGoogle();
        navigateTo('/');
      } catch (error) {
        if (error?.code === 'auth/account-exists-with-different-credential') {
          setFeedback('This email already has a portal login. Use the temporary password from checkout or reset it.');
          return;
        }
        setFeedback(error.message || 'Google sign-in failed.');
      }
    });
    form.querySelector('[data-auth-action="reset"]')?.addEventListener('click', async () => {
      const email = emailInput?.value?.trim();
      if (!email) {
        setFeedback('Enter your paid email first, then use reset password.');
        return;
      }
      setFeedback('Sending reset email...');
      try {
        await sendPortalPasswordReset(email);
        setFeedback('Password reset email sent.');
      } catch (error) {
        setFeedback(error.message || 'Could not send password reset email.');
      }
    });
  }

  const passwordSetupForm = document.querySelector('[data-password-setup-form]');
  if (!passwordSetupForm) {
    return;
  }

  const nextPasswordInput = passwordSetupForm.querySelector('input[name="nextPassword"]');
  const confirmPasswordInput = passwordSetupForm.querySelector('input[name="confirmPassword"]');

  passwordSetupForm.querySelector('[data-password-action="save"]')?.addEventListener('click', async () => {
    const nextPassword = nextPasswordInput?.value || '';
    const confirmPassword = confirmPasswordInput?.value || '';

    if (!nextPassword || nextPassword.length < 8) {
      setFeedback('Use a password with at least 8 characters.');
      return;
    }

    if (nextPassword !== confirmPassword) {
      setFeedback('Passwords do not match.');
      return;
    }

    setFeedback('Updating password...');
    try {
      await updatePortalPassword(nextPassword);
      setFeedback('Password updated. Reloading your dashboard...');
      window.location.hash = '/';
      window.location.reload();
    } catch (error) {
      setFeedback(error.message || 'Auth failed.');
    }
  });
}
