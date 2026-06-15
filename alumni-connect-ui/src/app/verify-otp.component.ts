import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router,
  RouterLink
} from '@angular/router';

@Component({

  selector: 'app-verify-otp',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  template: `

<div class="page">

  <div class="card">

    <!-- ICON -->

    <div class="icon">

      🔑

    </div>

    <!-- TITLE -->

    <h1>
      Verify OTP
    </h1>

    <p>
      Enter the 6-digit OTP sent to your email
    </p>

    <!-- SUCCESS -->

    <div

      *ngIf="success"

      class="success"
    >

      {{ success }}

    </div>

    <!-- ERROR -->

    <div

      *ngIf="error"

      class="error"
    >

      {{ error }}

    </div>

    <!-- OTP INPUT -->

    <input

      [(ngModel)]="otp"

      maxlength="6"

      placeholder="Enter OTP"
    />

    <!-- BUTTON -->

    <button

      (click)="verifyOtp()"

      [disabled]="loading"
    >

      {{

        loading

        ? 'Verifying...'

        : 'Verify OTP'
      }}

    </button>

    <!-- BACK -->

    <a

      routerLink="/forgot-password"

      class="back-link"
    >

      Back

    </a>

  </div>

</div>
`,

  styles: [`

.page {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background:
    linear-gradient(
      135deg,
      #eef2ff,
      #f8fafc
    );

  padding: 20px;
}

.card {

  width: 100%;

  max-width: 450px;

  background: white;

  border-radius: 30px;

  padding: 45px;

  text-align: center;

  box-shadow:
    0 15px 40px rgba(0,0,0,0.08);
}

/* ICON */

.icon {

  width: 90px;

  height: 90px;

  margin: auto;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 42px;

  color: white;

  margin-bottom: 25px;
}

/* TITLE */

h1 {

  font-size: 34px;

  margin-bottom: 12px;

  color: #111827;
}

p {

  color: #6b7280;

  margin-bottom: 30px;
}

/* INPUT */

input {

  width: 100%;

  padding: 18px;

  border-radius: 16px;

  border:
    1px solid #d1d5db;

  outline: none;

  margin-bottom: 22px;

  font-size: 22px;

  text-align: center;

  letter-spacing: 8px;

  transition: 0.2s;
}

input:focus {

  border-color: #2563eb;

  box-shadow:
    0 0 0 4px rgba(37,99,235,0.1);
}

/* BUTTON */

button {

  width: 100%;

  padding: 18px;

  border: none;

  border-radius: 16px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  font-size: 16px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;
}

button:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 10px 20px rgba(37,99,235,0.25);
}

button:disabled {

  opacity: 0.7;

  cursor: not-allowed;
}

/* SUCCESS */

.success {

  background: #dcfce7;

  color: #166534;

  padding: 14px;

  border-radius: 14px;

  margin-bottom: 18px;
}

/* ERROR */

.error {

  background: #fee2e2;

  color: #991b1b;

  padding: 14px;

  border-radius: 14px;

  margin-bottom: 18px;
}

/* LINK */

.back-link {

  display: inline-block;

  margin-top: 22px;

  color: #2563eb;

  font-weight: 600;

  text-decoration: none;
}

.back-link:hover {

  text-decoration: underline;
}

/* MOBILE */

@media(max-width: 600px) {

  .card {

    padding: 30px;
  }

  h1 {

    font-size: 28px;
  }

  input {

    font-size: 18px;

    letter-spacing: 5px;
  }
}

`]
})

export class VerifyOtpComponent
implements OnInit {

  email = '';

  otp = '';

  loading = false;

  success = '';

  error = '';

  constructor(

    private http: HttpClient,

    private router: Router

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.email =

      localStorage.getItem(
        'resetEmail'
      ) || '';

    // NO EMAIL

    if (!this.email) {

      this.router.navigate([
        '/forgot-password'
      ]);
    }
  }

  // =====================================
  // VERIFY OTP
  // =====================================

  verifyOtp(): void {

    this.success = '';

    this.error = '';

    // VALIDATION

    if (

      !this.otp.trim()

      ||

      this.otp.length !== 6

    ) {

      this.error =
        'Enter valid 6-digit OTP';

      return;
    }

    this.loading = true;

    this.http.post(

      'http://localhost:8080/verify-otp',

      {

        email: this.email,

        otp: this.otp
      },

      {

        responseType: 'text'
      }

    )

    .subscribe({

      next: (res) => {

        this.loading = false;

        this.success = res;

        // NAVIGATE

        setTimeout(() => {

          this.router.navigate([
            '/reset-password'
          ]);

        }, 1500);
      },

      error: (err) => {

        this.loading = false;

        this.error =

          err.error ||

          'OTP verification failed';
      }
    });
  }
}