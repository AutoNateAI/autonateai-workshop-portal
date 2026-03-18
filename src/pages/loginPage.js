export function renderLoginPage() {
  return `
    <section class="auth-shell">
      <div class="auth-card">
        <div class="kicker">Member access</div>
        <h1 class="auth-title">Sign in to your workshop dashboard</h1>
        <p class="auth-copy">You already bought the workshop. Use your email or Google sign-in to open the dashboard and access the sheet kits.</p>
        <form class="auth-form" data-auth-form>
          <label class="auth-label">
            <span>Email</span>
            <input class="form-control auth-input" type="email" name="email" placeholder="you@example.com" />
          </label>
          <label class="auth-label">
            <span>Password</span>
            <input class="form-control auth-input" type="password" name="password" placeholder="Password" />
          </label>
          <div class="auth-actions">
            <button class="btn btn-primary" type="button" data-auth-action="login">Sign in</button>
            <button class="btn btn-outline-light" type="button" data-auth-action="register">Create account</button>
          </div>
          <button class="btn btn-dark auth-google" type="button" data-auth-action="google">Continue with Google</button>
          <div class="auth-feedback" data-auth-feedback></div>
        </form>
      </div>
    </section>
  `;
}
