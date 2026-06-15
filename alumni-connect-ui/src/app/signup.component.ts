import { Component, OnInit } from '@angular/core';

import {
  CommonModule,
  NgIf
} from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-signup',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    NgIf
  ],

  template: `

<div class="signup-page">

  <!-- LEFT -->
  <section class="left-section">

    <div class="overlay"></div>

    <div class="branding">

      <div class="brand-badge">
        🎓 Alumni Mentorship Network
      </div>

      <h1 class="brand-title">

        Start Your
        <span>Professional Journey</span>

      </h1>

      <p class="brand-subtitle">

        Join your college alumni platform,
        connect with mentors,
        and grow your career with guidance from seniors.

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

  <!-- RIGHT -->
  <section class="right-section">

    <div class="signup-card">

      <!-- HEADER -->
      <div class="signup-header">

        <div class="role-icon">

          <span *ngIf="role === 'STUDENT'">🎓</span>

          <span *ngIf="role === 'ALUMNI'">💼</span>

        </div>

        <h2>

          {{ role }} Signup

        </h2>

        <p>

          Create your alumni network account

        </p>

      </div>

      <!-- NAME -->
      <div class="form-group">

        <label>Full Name</label>

        <input
          [(ngModel)]="name"
          class="input"
          placeholder="Enter your full name"
        />

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
          placeholder="Create a password"
        />

      </div>

      <!-- STUDENT -->
      <div *ngIf="role === 'STUDENT'">

        <div class="form-group">

          <label>College</label>

          <input
            [(ngModel)]="college"
            class="input"
            placeholder="Enter college name"
          />

        </div>

        <div class="double-grid">

          <div class="form-group">

            <label>Passout Year</label>

            <input
              [(ngModel)]="passoutYear"
              class="input"
              placeholder="2026"
            />

          </div>

          <div class="form-group">

            <label>Section</label>

            <input
              [(ngModel)]="section"
              class="input"
              placeholder="A"
            />

          </div>

        </div>

        <div class="form-group">

          <label>Roll Number</label>

          <input
            [(ngModel)]="rollno"
            class="input"
            placeholder="Enter roll number"
          />

        </div>

      </div>

      <!-- ALUMNI -->
      <div *ngIf="role === 'ALUMNI'">

        <div class="double-grid">

          <div class="form-group">

            <label>Passout Year</label>

            <input
              [(ngModel)]="passoutYear"
              class="input"
              placeholder="2020"
            />

          </div>

          <div class="form-group">

            <label>Roll Number</label>

            <input
              [(ngModel)]="rollno"
              class="input"
              placeholder="Roll No"
            />

          </div>

        </div>

      </div>

      <!-- BUTTON -->
      <button
        (click)="signup()"
        class="signup-btn"
      >

        Create Account

      </button>

      <!-- SUCCESS -->
      <div
        *ngIf="message"
        class="success-box"
      >

        {{ message }}

      </div>

      <!-- FOOTER -->
      <div class="footer-text">

        Your signup request will be verified by admin

      </div>

    </div>

  </section>

</div>
`,

  styles: [`

* {
  box-sizing: border-box;
}

/* PAGE */

.signup-page {
  min-height: 100vh;

  display: grid;

  grid-template-columns: 1.2fr 1fr;

  background: #f3f4f6;
}

/* LEFT */

.left-section {
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
  font-size: 64px;

  line-height: 1.1;

  font-weight: bold;

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

  gap: 20px;

  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255,255,255,0.12);

  padding: 22px;

  border-radius: 22px;

  min-width: 150px;
}

.stat-card h2 {
  font-size: 32px;

  margin-bottom: 8px;
}

/* RIGHT */

.right-section {
  display: flex;

  align-items: center;

  justify-content: center;

  padding: 40px;
}

.signup-card {
  width: 100%;

  max-width: 520px;

  background: white;

  border-radius: 32px;

  padding: 40px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

/* HEADER */

.signup-header {
  text-align: center;

  margin-bottom: 30px;
}

.role-icon {
  width: 80px;

  height: 80px;

  margin: 0 auto 20px;

  border-radius: 24px;

  background: #eff6ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 36px;
}

.signup-header h2 {
  font-size: 36px;

  font-weight: bold;

  margin-bottom: 10px;
}

.signup-header p {
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

.double-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 16px;
}

/* BUTTON */

.signup-btn {
  width: 100%;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

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

.signup-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(37,99,235,0.25);
}

/* SUCCESS */

.success-box {
  margin-top: 18px;

  background: #ecfdf5;

  color: #047857;

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

  .signup-page {
    grid-template-columns: 1fr;
  }

  .left-section {
    min-height: 450px;
  }

  .brand-title {
    font-size: 48px;
  }
}

@media(max-width: 700px) {

  .branding {
    padding: 30px;
  }

  .brand-title {
    font-size: 38px;
  }

  .right-section {
    padding: 20px;
  }

  .signup-card {
    padding: 30px;
  }

  .double-grid {
    grid-template-columns: 1fr;
  }
}

`]
})

export class SignupComponent implements OnInit {

  role = '';

  name = '';

  email = '';

  password = '';

  college = '';

  passoutYear = '';

  rollno = '';

  section = '';

  message = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.role =
      this.route.snapshot.paramMap.get('role') || '';

    console.log(
      'SIGNUP ROLE:',
      this.role
    );
  }

  signup(): void {

    const user = {

      name: this.name,

      email: this.email,

      password: this.password,

      role: this.role,

      college: this.college,

      passoutYear: this.passoutYear,

      rollno: this.rollno,

      section: this.section
    };

    this.http.post(

      'http://localhost:8080/signup',

      user,

      {
        responseType: 'text'
      }

    )

    .subscribe({

      next: (res) => {

        console.log(res);

        this.message =
          'Signup successful! Wait for admin approval.';
      },

      error: (err) => {

        console.error(err);
      }
    });
  }
}