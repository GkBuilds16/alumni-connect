import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule,
  NgFor,
  NgIf
} from '@angular/common';

import {
  Router,
} from '@angular/router';

import {HttpClient 
} from '@angular/common/http';

import { NavbarComponent }
from './navbar.component';

import { ApiService }
from './api.service';

import { getRoleFromToken }
from './jwt.util';

@Component({

  selector: 'app-admin-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NavbarComponent
  ],

  template: `

<div class="dashboard-page">
  <!-- NAVBAR -->
  <app-navbar></app-navbar>

  <!-- HERO -->
  <section class="hero-section">

    <div>

      <div class="hero-badge">
        👑 Admin Control Center
      </div>

      <h1 class="hero-title">

        Manage Your
        Alumni Platform

      </h1>

      <p class="hero-subtitle">

        Approve students and alumni,
        monitor platform activity,
        and manage your college alumni network.

      </p>

    </div>

    <button class="hero-btn">

      Admin Panel

    </button>

  </section>

  <!-- STATS -->
  <section class="stats-grid">

    <div class="stat-card">

      <div class="stat-icon blue">
        👥
      </div>

      <div>
<h2>{{ getTotalUsers() }}</h2>

        <p>Total Users</p>

      </div>

    </div>

    <div class="stat-card">

      <div class="stat-icon yellow">
        ⏳
      </div>

      <div>

        <h2>{{ getPendingCount() }}</h2>

        <p>Pending Requests</p>

      </div>

    </div>

    <div class="stat-card">

      <div class="stat-icon green">
        ✅
      </div>

      <div>

        <h2>{{ getApprovedCount() }}</h2>

        <p>Approved Users</p>

      </div>

    </div>

  </section>
  <!-- USERS -->
  <section class="users-section">

    <div class="section-header">

      <div>

        <h2>
          User Management
        </h2>

        <p>
          Review and manage students and alumni
        </p>

      </div>

    </div>

    <!-- EMPTY -->
<div
  class="empty"
  *ngIf="users.length === 0"
>
  No users available
</div>
    <!-- USERS GRID -->
    <div
  class="users-grid"
  *ngIf="users.length > 0"
>
      <div

        *ngFor="
          let user of users
        "

        class="user-card"
      >

        <!-- TOP -->
        <div class="user-top">

          <div class="avatar">

            {{
              user.name
              ?.charAt(0)
              ?.toUpperCase()
            }}

          </div>

          <div>

            <h3>

              {{ user.name }}

            </h3>

            <p>

              {{ user.email }}

            </p>

          </div>

        </div>

        <!-- TAGS -->
        <div class="tags">

          <span class="role-tag">

            {{ user.role }}

          </span>

          <span

            class="status-tag"

            [ngClass]="{

              'approved':
                user.status === 'APPROVED',

              'pending':
                user.status === 'PENDING'
            }"
          >

            {{ user.status }}

          </span>

        </div>

        <!-- DETAILS -->
        <div class="details">

          <div>

            <span class="label">
              Passout Year
            </span>

            <p>

              {{
                user.passoutYear
                || 'N/A'
              }}

            </p>

          </div>

          <div>

            <span class="label">
              Roll No
            </span>

            <p>

              {{
                user.rollno
                || 'N/A'
              }}

            </p>

          </div>

        </div>

        <!-- BUTTON -->
        <button

          *ngIf="
            user.status === 'PENDING'
          "

          (click)="approve(user.id)"

          class="approve-btn"
        >

          Approve User

        </button>

        <button

          *ngIf="
            user.status === 'APPROVED'
          "

          class="approved-btn"
        >

          Approved

        </button>

      </div>

    </div>

  </section>

</div>
`,

  styles: [`

* {

  box-sizing: border-box;
}

.dashboard-page {

  min-height: 100vh;

  background: #f3f4f6;

  padding-bottom: 40px;
}

/* HERO */

.hero-section {

  margin: 25px;

  background:
    linear-gradient(
      to right,
      #111827,
      #1f2937
    );

  border-radius: 28px;

  padding: 60px;

  color: white;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;
}

.hero-badge {

  display: inline-block;

  background:
    rgba(255,255,255,0.1);

  padding: 10px 18px;

  border-radius: 999px;

  margin-bottom: 22px;

  font-size: 14px;
}

.hero-title {

  font-size: 54px;

  font-weight: bold;

  line-height: 1.1;

  margin-bottom: 20px;
}

.hero-subtitle {

  max-width: 700px;

  line-height: 1.7;

  color: #d1d5db;

  font-size: 18px;
}

.hero-btn {

  background: white;

  color: black;

  padding: 16px 26px;

  border-radius: 16px;

  font-weight: bold;

  border: none;

  cursor: pointer;
}

/* STATS */

.stats-grid {

  margin: 30px 25px;

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));

  gap: 24px;
}

.stat-card {

  background: white;

  border-radius: 24px;

  padding: 28px;

  display: flex;

  align-items: center;

  gap: 20px;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.06);
}

.stat-icon {

  width: 70px;

  height: 70px;

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 30px;
}

.blue {

  background: #dbeafe;
}

.yellow {

  background: #fef3c7;
}

.green {

  background: #dcfce7;
}

.stat-card h2 {

  font-size: 34px;

  font-weight: bold;

  margin-bottom: 4px;
}

.stat-card p {

  color: gray;
}

/* USERS */

.users-section {

  margin: 40px 25px;
}

.section-header {

  margin-bottom: 30px;
}

.section-header h2 {

  font-size: 38px;

  font-weight: bold;

  margin-bottom: 10px;
}

.section-header p {

  color: gray;
}

/* EMPTY */

.empty {

  background: white;

  padding: 40px;

  border-radius: 24px;

  text-align: center;

  color: #6b7280;
}

/* GRID */

.users-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(340px, 1fr));

  gap: 24px;
}

/* CARD */

.user-card {

  background: white;

  border-radius: 28px;

  padding: 28px;

  box-shadow:
    0 8px 20px rgba(0,0,0,0.06);

  transition: 0.25s;
}

.user-card:hover {

  transform:
    translateY(-5px);
}

.user-top {

  display: flex;

  align-items: center;

  gap: 18px;

  margin-bottom: 22px;
}

.avatar {

  width: 70px;

  height: 70px;

  border-radius: 50%;

  background: #dbeafe;

  color: #2563eb;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 28px;

  font-weight: bold;
}

.user-top h3 {

  font-size: 24px;

  font-weight: bold;

  margin-bottom: 6px;
}

.user-top p {

  color: gray;
}

/* TAGS */

.tags {

  display: flex;

  gap: 12px;

  margin-bottom: 24px;
}

.role-tag {

  background: #eff6ff;

  color: #2563eb;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 14px;

  font-weight: 600;
}

.status-tag {

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 14px;

  font-weight: 600;
}

.approved {

  background: #dcfce7;

  color: #047857;
}

.pending {

  background: #fef3c7;

  color: #b45309;
}

/* DETAILS */

.details {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;

  margin-bottom: 24px;
}

.label {

  display: block;

  color: gray;

  margin-bottom: 6px;

  font-size: 14px;
}

.details p {

  font-weight: 600;
}

/* BUTTONS */

.approve-btn {

  width: 100%;

  background:
    linear-gradient(
      to right,
      #16a34a,
      #15803d
    );

  color: white;

  border: none;

  padding: 16px;

  border-radius: 16px;

  font-size: 15px;

  font-weight: bold;

  cursor: pointer;

  transition: 0.25s;
}

.approve-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px rgba(22,163,74,0.25);
}

.approved-btn {

  width: 100%;

  background: #f3f4f6;

  color: #6b7280;

  border: none;

  padding: 16px;

  border-radius: 16px;

  font-size: 15px;

  font-weight: bold;
}

/* RESPONSIVE */

@media(max-width: 900px) {

  .hero-section {

    flex-direction: column;

    align-items: flex-start;
  }

  .hero-title {

    font-size: 42px;
  }
}

@media(max-width: 600px) {

  .hero-section {

    padding: 35px;
  }

  .hero-title {

    font-size: 34px;
  }

  .details {

    grid-template-columns: 1fr;
  }
}

`]
})

export class AdminDashboardComponent
implements OnInit {

users: any[] = [];

  constructor(

    private api: ApiService,

    private router: Router

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    const role =
      getRoleFromToken();

    console.log(
      'ADMIN ROLE:',
      role
    );

    // PROTECT ADMIN PAGE

    if (role !== 'ADMIN') {

      this.router.navigate([
        '/'
      ]);

      return;
    }

    // LOAD USERS

    this.loadUsers();
  }

  // =====================================
  // LOAD USERS
  // =====================================

  loadUsers(): void {
    this.api.getUsers()

    .subscribe({

      next: (data: any[]) => {

        console.log(
          'USERS:',
          data
        );

      this.users = [...(data || [])];

console.log('USERS LENGTH =', this.users.length);

      },

      error: (err: any) => {

        console.log(
          'ERROR:',
          err
        );
      }
    });
  }

  // =====================================
  // APPROVE USER
  // =====================================

  approve(id: number): void {

    this.api.approveAlumni(id)

    .subscribe({

      next: () => {

        this.loadUsers();
      },

      error: (err: any) => {

        console.log(
          'ERROR approving:',
          err
        );
      }
    });
  }

  // =====================================
  // PENDING COUNT
  // =====================================

  getPendingCount(): number {

    return this.users.filter(

      u => u.status === 'PENDING'

    ).length;
  }

  getTotalUsers(): number {
  return this.users.length;
}
  // =====================================
  // APPROVED COUNT
  // =====================================

  getApprovedCount(): number {

    return this.users.filter(

      u => u.status === 'APPROVED'

    ).length;
  }
}