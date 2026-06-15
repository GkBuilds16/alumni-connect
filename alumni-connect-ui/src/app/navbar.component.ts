import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { getRoleFromToken }
from './jwt.util';

@Component({

  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  template: `

<nav class="navbar">

  <!-- LEFT -->

  <div class="left-section">

    <div class="logo-circle">
      🎓
    </div>

    <div>

      <h1 class="logo-title">
        Alumni Connect
      </h1>

      <p class="logo-subtitle">
        College Alumni Network
      </p>

    </div>

  </div>

  <!-- RIGHT -->

  <div class="right-section">

    <!-- HOME -->

    <button

      (click)="goHome()"

      class="nav-btn"
    >

      Home

    </button>

    <!-- EVENTS -->

   <button
  (click)="navigateTo('/events')"
  class="nav-btn">
  Events
</button>

    <!-- POST EVENT -->

    <button
  *ngIf="
    isAdmin()
    ||
    isAlumni()
  "
  (click)="navigateTo('/create-event')"
  class="admin-btn">

      Post Event

    </button>

    <!-- INBOX -->

   <button
  (click)="navigateTo('/messages')"
  class="message-btn">
  Inbox
</button>

    <!-- NOTIFICATIONS -->

<button
  (click)="navigateTo('/notifications')"
  class="nav-btn">
  Notifications
</button>

    <!-- EDIT PROFILE -->

   <button
  (click)="navigateTo('/edit-profile')"
  class="nav-btn">

      Edit Profile

    </button>

    <!-- ADMIN -->

    <button

      *ngIf="isAdmin()"

      (click)="goAdmin()"

      class="admin-btn"
    >

      Admin

    </button>

    <!-- LOGOUT -->

    <button

      (click)="logout()"

      class="logout-btn"
    >

      Logout

    </button>

  </div>

</nav>
`,

  styles: [`

/* =====================================
   NAVBAR
===================================== */

.navbar {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 18px 32px;

  background: white;

  box-shadow:
    0 4px 14px rgba(0,0,0,0.05);

  position: sticky;

  top: 0;

  z-index: 100;
}

/* =====================================
   LEFT
===================================== */

.left-section {

  display: flex;

  align-items: center;

  gap: 14px;
}

.logo-circle {

  width: 54px;

  height: 54px;

  border-radius: 16px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 26px;

  color: white;
}

.logo-title {

  font-size: 22px;

  font-weight: bold;

  margin: 0;
}

.logo-subtitle {

  font-size: 13px;

  color: gray;

  margin: 0;
}

/* =====================================
   RIGHT
===================================== */

.right-section {

  display: flex;

  align-items: center;

  gap: 12px;
}

/* =====================================
   NORMAL BUTTON
===================================== */

.nav-btn {

  background: #f3f4f6;

  border: none;

  padding: 12px 18px;

  border-radius: 14px;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.nav-btn:hover {

  background: #e5e7eb;
}

/* =====================================
   MESSAGE BUTTON
===================================== */

.message-btn {

  background:
    linear-gradient(
      to right,
      #10b981,
      #059669
    );

  color: white;

  border: none;

  padding: 12px 18px;

  border-radius: 14px;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.message-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 6px 16px rgba(16,185,129,0.25);
}

/* =====================================
   ADMIN BUTTON
===================================== */

.admin-btn {

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  border: none;

  padding: 12px 18px;

  border-radius: 14px;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.admin-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 6px 16px rgba(37,99,235,0.25);
}

/* =====================================
   LOGOUT
===================================== */

.logout-btn {

  background: #ef4444;

  color: white;

  border: none;

  padding: 12px 18px;

  border-radius: 14px;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.logout-btn:hover {

  background: #dc2626;
}

/* =====================================
   MOBILE
===================================== */

@media(max-width: 768px) {

  .navbar {

    flex-direction: column;

    gap: 20px;

    padding: 20px;
  }

  .right-section {

    flex-wrap: wrap;

    justify-content: center;
  }
}

`]
})

export class NavbarComponent {

  constructor(

    private router: Router

  ) {}

  // =====================================
  // LOGIN CHECK
  // =====================================

  isLoggedIn(): boolean {

    return localStorage.getItem(
      'token'
    ) !== null;
  }

  // =====================================
  // ADMIN CHECK
  // =====================================

  isAdmin(): boolean {

    return getRoleFromToken()
      === 'ADMIN';
  }

  navigateTo(url: string): void {

  this.router.navigateByUrl(url);
}
  // =====================================
  // ALUMNI CHECK
  // =====================================

  isAlumni(): boolean {

    return getRoleFromToken()
      === 'ALUMNI';
  }

  // =====================================
  // HOME NAVIGATION
  // =====================================

goHome(): void {

  const role = getRoleFromToken();

  if (role === 'STUDENT') {

    this.router.navigateByUrl(
      '/student-dashboard'
    );

  } else if (role === 'ALUMNI') {

    this.router.navigateByUrl(
      '/alumni-dashboard'
    );

  } else if (role === 'ADMIN') {

    this.router.navigateByUrl(
      '/admin-dashboard'
    );

  } else {

    this.router.navigateByUrl('/');
  }
}

  // =====================================
  // ADMIN NAVIGATION
  // =====================================

 goAdmin(): void {

  this.router.navigateByUrl(
    '/admin-dashboard'
  );
}

  // =====================================
  // LOGOUT
  // =====================================

  logout(): void {

    localStorage.clear();

    this.router.navigate([
      '/'
    ]);
  }
}