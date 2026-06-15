import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getRoleFromToken } from './jwt.util';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],

  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">

      <div class="bg-white p-8 rounded-xl shadow-lg w-[350px]">

        <h2 class="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        <input
          [(ngModel)]="email"
          class="input"
          placeholder="Email"
        />

        <input
          [(ngModel)]="password"
          type="password"
          class="input"
          placeholder="Password"
        />

        <button (click)="login()" class="btn-primary w-full">
          Login
        </button>

        <p style="color:red" *ngIf="error">
          {{ error }}
        </p>

      </div>

    </div>
  `,

  styles: [`
    .input {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
      padding: 10px;
      border-radius: 6px;
      margin-top: 10px;
      border: none;
      cursor: pointer;
    }
  `]
})
export class AdminLoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.error = '';

    this.http.post('http://localhost:8080/login', {
      email: this.email,
      password: this.password
    }, { responseType: 'text' })

    .subscribe({

      next: (res) => {

        console.log("LOGIN RESPONSE:", res);

        // ❌ invalid login
        if (
          res === 'User not found' ||
          res === 'Invalid password'
        ) {
          this.error = res;
          return;
        }

        // 🔐 JWT TOKEN
        const token = res;

        // 🔥 SAVE TOKEN
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', this.email);

        // 🔥 EXTRACT ROLE
        const role = getRoleFromToken();

        console.log("ROLE:", role);

        // 🔥 ONLY ADMIN ALLOWED
        if (role === 'ADMIN') {

          localStorage.setItem('role', role);

          this.router.navigate(['/admin-dashboard']);

        } else {

          this.error = 'Access denied. Not an admin.';
        }
      },

      error: (err) => {

        console.error(err);

        this.error = 'Server error';
      }
    });
  }
}