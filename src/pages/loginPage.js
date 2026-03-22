export function renderLoginPage(message = '') {
  return `
    <section class="auth-shell">
      <div class="auth-card">
        <div class="kicker">Member access</div>
        <h1 class="auth-title">Sign in to your workshop dashboard</h1>
        <p class="auth-copy">You already bought the course. Sign in with the paid email you used at checkout. If your portal account was created for you, use the temporary password first and then update it.</p>
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
            <button class="btn btn-outline-light" type="button" data-auth-action="reset">Reset password</button>
          </div>
          <button class="btn btn-dark auth-google" type="button" data-auth-action="google">Continue with Google</button>
          <div class="auth-feedback" data-auth-feedback>${message}</div>
        </form>
      </div>
    </section>
  `;
}
