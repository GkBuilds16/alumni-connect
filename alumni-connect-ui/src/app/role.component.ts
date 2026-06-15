import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-role',

  standalone: true,

  template: `

  <div class="landing-page">

    <!-- LEFT SIDE -->
    <section class="hero-section">

      <div class="overlay"></div>

      <div class="hero-content">

        <div class="badge">
          🎓 College Alumni Network
        </div>

        <h1 class="hero-title">

          Connect With
          <span>Your Alumni Community</span>

        </h1>

        <p class="hero-subtitle">

          Discover alumni from your college,
          explore their career journeys,
          and build meaningful mentorship connections.

        </p>

        <div class="hero-stats">

          <div class="stat-box">

            <h2>250+</h2>

            <p>Verified Alumni</p>

          </div>

          <div class="stat-box">

            <h2>40+</h2>

            <p>Top Companies</p>

          </div>

          <div class="stat-box">

            <h2>1200+</h2>

            <p>Connections</p>

          </div>

        </div>

      </div>

    </section>

    <!-- RIGHT SIDE -->
    <section class="auth-section">

      <div class="auth-card">

        <h2 class="auth-title">
          Welcome to Alumni Connect
        </h2>

        <p class="auth-subtitle">
          Choose your role to continue
        </p>

        <!-- ADMIN -->
        <div class="role-card admin">

          <div class="role-top">

            <div class="icon">
              👑
            </div>

            <div>

              <h3>Admin</h3>

              <p>
                Manage approvals and platform access
              </p>

            </div>

          </div>

          <button
            (click)="goLogin('ADMIN')"
            class="primary-btn"
          >

            Login as Admin

          </button>

        </div>

        <!-- STUDENT -->
        <div class="role-card">

          <div class="role-top">

            <div class="icon student">
              🎓
            </div>

            <div>

              <h3>Student</h3>

              <p>
                Discover alumni and seek mentorship
              </p>

            </div>

          </div>

          <div class="actions">

            <button
              (click)="goSignup('STUDENT')"
              class="primary-btn"
            >

              Signup

            </button>

            <button
              (click)="goLogin('STUDENT')"
              class="secondary-btn"
            >

              Login

            </button>

          </div>

        </div>

        <!-- ALUMNI -->
        <div class="role-card">

          <div class="role-top">

            <div class="icon alumni">
              💼
            </div>

            <div>

              <h3>Alumni</h3>

              <p>
                Guide students and build your network
              </p>

            </div>

          </div>

          <div class="actions">

            <button
              (click)="goSignup('ALUMNI')"
              class="primary-btn"
            >

              Signup

            </button>

            <button
              (click)="goLogin('ALUMNI')"
              class="secondary-btn"
            >

              Login

            </button>

          </div>

        </div>

      </div>

    </section>

  </div>
  `,

  styles: [`

* {
  box-sizing: border-box;
}

.landing-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: #f3f4f6;
}

/* LEFT SIDE */

.hero-section {
  position: relative;
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5,
      #7c3aed
    );

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      rgba(255,255,255,0.12),
      transparent
    );
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 60px;
  max-width: 700px;
}

.badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  padding: 10px 18px;
  border-radius: 999px;
  margin-bottom: 24px;
  font-size: 14px;
}

.hero-title {
  font-size: 64px;
  line-height: 1.1;
  font-weight: bold;
  margin-bottom: 24px;
}

.hero-title span {
  display: block;
  color: #bfdbfe;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.7;
  opacity: 0.95;
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-box {
  background: rgba(255,255,255,0.12);
  padding: 22px;
  border-radius: 22px;
  min-width: 150px;
}

.stat-box h2 {
  font-size: 32px;
  margin-bottom: 8px;
}

/* RIGHT SIDE */

.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.auth-card {
  width: 100%;
  max-width: 520px;
}

.auth-title {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
}

.auth-subtitle {
  color: gray;
  margin-bottom: 30px;
  font-size: 16px;
}

/* ROLE CARD */

.role-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 22px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  transition: 0.25s;
}

.role-card:hover {
  transform: translateY(-5px);
}

.role-top {
  display: flex;
  gap: 18px;
  margin-bottom: 20px;
}

.role-top h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 6px;
}

.role-top p {
  color: gray;
  line-height: 1.5;
}

.icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #fef3c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.student {
  background: #dbeafe;
}

.alumni {
  background: #dcfce7;
}

.admin {
  border: 2px solid #facc15;
}

/* BUTTONS */

.actions {
  display: flex;
  gap: 14px;
}

.primary-btn {
  flex: 1;
  background: #2563eb;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.primary-btn:hover {
  background: #1d4ed8;
}

.secondary-btn {
  flex: 1;
  background: #f3f4f6;
  border: none;
  padding: 14px;
  border-radius: 14px;
  font-weight: bold;
  cursor: pointer;
}

.secondary-btn:hover {
  background: #e5e7eb;
}

/* RESPONSIVE */

@media(max-width: 1000px) {

  .landing-page {
    grid-template-columns: 1fr;
  }

  .hero-section {
    min-height: 500px;
  }

  .hero-title {
    font-size: 48px;
  }
}

@media(max-width: 600px) {

  .hero-content {
    padding: 30px;
  }

  .hero-title {
    font-size: 38px;
  }

  .auth-section {
    padding: 20px;
  }

  .actions {
    flex-direction: column;
  }
}

`]
})

export class RoleComponent {

  constructor(
    private router: Router
  ) {}

  // ✅ SIGNUP
  goSignup(role: string): void {

    this.router.navigate([
      '/signup',
      role
    ]);
  }

  // ✅ LOGIN
  goLogin(role: string): void {

    this.router.navigate([
      '/login',
      role
    ]);
  }
}