export function renderPasswordSetupPage(user) {
  return `
    <section class="auth-shell">
      <div class="auth-card">
        <div class="kicker">First login</div>
        <h1 class="auth-title">Update your portal password</h1>
        <p class="auth-copy">Your purchase created a temporary portal login for ${user?.email ?? 'your paid email'}. Set a new password before entering the dashboard.</p>
        <form class="auth-form" data-password-setup-form>
          <label class="auth-label">
            <span>New password</span>
            <input class="form-control auth-input" type="password" name="nextPassword" placeholder="At least 8 characters" />
          </label>
          <label class="auth-label">
            <span>Confirm password</span>
            <input class="form-control auth-input" type="password" name="confirmPassword" placeholder="Repeat the password" />
          </label>
          <div class="auth-actions">
            <button class="btn btn-primary" type="button" data-password-action="save">Save password</button>
          </div>
          <div class="auth-feedback" data-auth-feedback></div>
        </form>
      </div>
    </section>
  `;
}
