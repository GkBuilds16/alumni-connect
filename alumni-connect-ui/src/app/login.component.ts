import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule,
  NgIf
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router,
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  getRoleFromToken
} from './jwt.util';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    RouterLink
  ],

  template: `

<div class="login-page">

  <!-- LEFT SIDE -->

  <section class="left-section">

    <div class="overlay"></div>

    <div class="branding">

      <div class="brand-badge">
        🎓 Alumni Mentorship Platform
      </div>

      <h1 class="brand-title">

        Connect With
        <span>Your Alumni Network</span>

      </h1>

      <p class="brand-subtitle">

        Discover alumni from your college,
        explore career journeys,
        and build meaningful mentorship connections.

      </p>

      <div class="stats">

        <div class="stat-card">

          <h2>250+</h2>

          <p>Verified Alumni</p>

        </div>

        <div class="stat-card">

          <h2>40+</h2>

          <p>Top Companies</p>

        </div>

        <div class="stat-card">

          <h2>1200+</h2>

          <p>Student Connections</p>

        </div>

      </div>

    </div>

  </section>

  <!-- RIGHT SIDE -->

  <section class="right-section">

    <div class="login-card">

      <!-- HEADER -->

      <div class="login-header">

        <div class="role-icon">

          <span *ngIf="role === 'ADMIN'">👑</span>

          <span *ngIf="role === 'STUDENT'">🎓</span>

          <span *ngIf="role === 'ALUMNI'">💼</span>

        </div>

        <h2>

          {{ role }} Login

        </h2>

        <p>

          Access your alumni network account

        </p>

      </div>

      <!-- EMAIL -->

      <div class="form-group">

        <label>Email Address</label>

        <input

          [(ngModel)]="email"

          type="email"

          class="input"

          placeholder="Enter your email"
        />

      </div>

      <!-- PASSWORD -->

      <div class="form-group">

        <label>Password</label>

        <input

          [(ngModel)]="password"

          type="password"

          class="input"

          placeholder="Enter your password"
        />

      </div>

      <!-- LOGIN BUTTON -->

      <button

        (click)="login()"

        class="login-btn"
      >

        Login to Platform

      </button>

      <!-- FORGOT PASSWORD -->

      <div class="forgot-wrapper">

        <a

          routerLink="/forgot-password"

          class="forgot-link"
        >

          Forgot Password?

        </a>

      </div>

      <!-- ERROR -->

      <div

        *ngIf="error"

        class="error-box"
      >

        {{ error }}

      </div>

      <!-- FOOTER -->

      <div class="footer-text">

        Secure login for your college alumni community

      </div>

    </div>

  </section>

</div>
`,

  styles: [`
*{
  font-family:
    Inter,
    "Segoe UI",
    sans-serif;
}
* {

  box-sizing: border-box;
}

/* PAGE */

.login-page {

  min-height: 100vh;

  display: grid;

 grid-template-columns:55% 45%;

  background: #f3f4f6;
}

/* LEFT */

.left-section {

  position: relative;

 background:
linear-gradient(
135deg,
#0f172a,
#1e293b,
#2563eb
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

.branding {

  position: relative;

  z-index: 2;

  color: white;

  max-width: 700px;

  padding: 60px;
}

.brand-badge {

  display: inline-block;

  background: rgba(255,255,255,0.15);

  padding: 10px 18px;

  border-radius: 999px;

  margin-bottom: 24px;

  font-size: 14px;
}

.brand-title {
  font-size:60px;

  font-weight:800;

  line-height:1.05;

  margin-bottom: 24px;
}

.brand-title span {

  display: block;

  color: #bfdbfe;
}

.brand-subtitle {

  font-size: 20px;

  line-height: 1.7;

  opacity: 0.95;

  margin-bottom: 40px;
}
.stats {

  display: flex;

  gap: 16px;

  flex-wrap: wrap;

  margin-top: 40px;
}

.stat-card {

  width: 170px;

  min-height: 140px;

  background: rgba(255,255,255,.08);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,.15);

  border-radius: 24px;

  padding: 24px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  transition: all .3s ease;
}

.stat-card:hover {

  transform: translateY(-6px);

  background: rgba(255,255,255,.12);

  border-color: rgba(255,255,255,.25);
}

.stat-card h2 {

  font-size: 36px;

  font-weight: 800;

  margin: 0 0 10px 0;

  color: white;
}

.stat-card p {

  margin: 0;

  font-size: 14px;

  color: rgba(255,255,255,.85);

  line-height: 1.5;
}
/* RIGHT */

.right-section{
  background:#f8fafc;
  display:flex;
  align-items:center;
  justify-content:center;
}

.login-card{

  width:100%;

  max-width:520px;

  background:white;

  border-radius:32px;

  padding:48px;

  box-shadow:
    0 20px 60px rgba(15,23,42,.08);

  border:1px solid #e5e7eb;
}

/* HEADER */

.login-header {

  text-align: center;

  margin-bottom: 30px;
}

.role-icon{

  width:80px;

  height:80px;

  margin:0 auto 20px;

  border-radius:24px;

  background:#eff6ff;

  display:flex;

  align-items:center;

  justify-content:center;

  font-size:36px;

  position:relative;

  overflow:hidden;
}

.role-icon::after{

  content:"";

  position:absolute;

  inset:0;

  background:
  linear-gradient(
    135deg,
    transparent,
    rgba(255,255,255,.4)
  );
}

.role-icon::after{

  content:"";

  position:absolute;

  inset:0;

  background:
  linear-gradient(
    135deg,
    transparent,
    rgba(255,255,255,.4)
  );
}

.login-header h2 {

  font-size: 36px;

  font-weight: bold;

  margin-bottom: 10px;
}

.login-header p {

  color: gray;
}

/* FORM */

.form-group {

  margin-bottom: 20px;
}

.form-group label {

  display: block;

  margin-bottom: 10px;

  font-weight: 600;

  color: #374151;
}

.input {

  width: 100%;

  padding: 16px;

  border: 1px solid #d1d5db;

  border-radius: 16px;

  outline: none;

  font-size: 15px;

  transition: 0.2s;
}

.input:focus {

  border-color: #2563eb;

  box-shadow:
    0 0 0 4px rgba(37,99,235,0.1);
}

/* BUTTON */

.login-btn {

  width: 100%;

 background:
linear-gradient(
135deg,
#2563eb,
#1d4ed8
);
height:58px;

letter-spacing:.3px;

box-shadow:
0 10px 25px
rgba(37,99,235,.25);

  color: white;

  padding: 16px;

  border-radius: 16px;

  font-size: 16px;

  font-weight: bold;

  border: none;

  margin-top: 10px;

  cursor: pointer;

  transition: 0.25s;
}

.login-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(37,99,235,0.25);
}

/* FORGOT PASSWORD */

.forgot-wrapper {

  margin-top: 18px;

  text-align: center;
}

.forgot-link {

  color: #2563eb;

  text-decoration: none;

  font-weight: 600;

  transition: 0.2s;
}

.forgot-link:hover {

  text-decoration: underline;

  color: #1d4ed8;
}

/* ERROR */

.error-box {

  margin-top: 18px;

  background: #fef2f2;

  color: #dc2626;

  padding: 14px;

  border-radius: 14px;

  text-align: center;

  font-size: 14px;
}

/* FOOTER */

.footer-text {

  text-align: center;

  margin-top: 24px;

  color: gray;

  font-size: 14px;
}

/* RESPONSIVE */

@media(max-width: 1000px) {

  .login-page {

    grid-template-columns: 1fr;
  }

  .left-section {

    min-height: 450px;
  }

  .brand-title {

    font-size: 48px;
  }
}

@media(max-width: 600px) {

  .branding {

    padding: 30px;
  }

  .brand-title {

    font-size: 38px;
  }

  .right-section {

    padding: 20px;
  }

  .login-card {

    padding: 48px;
  }
}

`]
})

export class LoginComponent
implements OnInit {

  email = '';

  password = '';

  role = '';

  error = '';

  constructor(

    private http: HttpClient,

    private router: Router,

    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.role =

      this.route.snapshot.paramMap.get(
        'role'
      ) || '';

    console.log(
      'LOGIN ROLE:',
      this.role
    );
  }

  login(): void {

    this.error = '';

    this.http.post(

      'http://localhost:8080/login',

      {
        email: this.email,
        password: this.password,
        role: this.role
      },

      {
        responseType: 'text'
      }

    )

    .subscribe({

      next: (res: any) => {

        console.log(
          'LOGIN RESPONSE:',
          res
        );

        // INVALID USER

        if (

          res === 'User not found'

          ||

          res ===
          'User not found for selected role'

        ) {

          this.error =
            'Invalid credentials for selected role';

          return;
        }

        // INVALID PASSWORD

        if (

          res === 'Invalid password'

        ) {

          this.error =
            'Invalid password';

          return;
        }

        // WAITING APPROVAL

        if (

          res === 'WAIT_APPROVAL'

        ) {

          this.error =
            'Waiting for admin approval';

          return;
        }

        // TOKEN

        const token =

          res.token || res;

        // SAVE TOKEN
// SAVE TOKEN

localStorage.setItem(
  'token',
  token
);

// SAVE EMAIL

localStorage.setItem(
  'userEmail',
  this.email
);

// ROLE

const jwtRole =
  getRoleFromToken();

console.log(
  'JWT ROLE:',
  jwtRole
);

// SAVE ROLE

localStorage.setItem(

  'role',

  jwtRole || ''
);
        // ADMIN

        if (jwtRole === 'ADMIN') {

         this.router.navigateByUrl(
  '/admin-dashboard'
);
        }

        // STUDENT

        else if (
          jwtRole === 'STUDENT'
        ) {

         this.router.navigateByUrl(
  '/student-dashboard'
);
        }

        // ALUMNI

        else if (
          jwtRole === 'ALUMNI'
        ) {

         this.router.navigateByUrl(
  '/alumni-dashboard'
);
        }

        // FALLBACK

        else {

          this.router.navigate([
            '/'
          ]);
        }
      },

      error: (err) => {

        console.error(err);

        this.error =
          'Server error. Please try again.';
      }
    });
  }
}