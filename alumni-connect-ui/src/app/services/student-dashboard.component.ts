import { Component, OnInit } from '@angular/core';

import {
  CommonModule,
  NgFor
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-student-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    NgFor,
    NavbarComponent,
    RouterLink
  ],

  template: `

  <div class="min-h-screen bg-gray-100">

    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <!-- HERO -->
    <section class="hero">

      <div>

        <h1 class="hero-title">
          Welcome {{ userName }} 👋
        </h1>

        <p class="hero-subtitle">

          Discover alumni from your college
          and connect with professionals
          working in your dream companies.

        </p>

      </div>

      <button
        class="explore-btn"
        (click)="goToExplore()"
      >
        Explore Alumni
      </button>

    </section>

    <!-- STATS -->
    <section class="stats-grid">

      <div class="stat-card">

        <h2>{{ featuredAlumni.length }}</h2>

        <p>Active Alumni</p>

      </div>

      <div class="stat-card">

        <h2>40+</h2>

        <p>Companies</p>

      </div>

      <div class="stat-card">

        <h2>120+</h2>

        <p>Student Connections</p>

      </div>

    </section>

    <!-- ALUMNI -->
    <section class="section">

      <div class="section-header">

        <div>

          <h2>College Alumni</h2>

          <p>
            Connect with alumni from your college
          </p>

        </div>

      </div>

      <div class="alumni-grid">

        <div
          *ngFor="let alumni of featuredAlumni"
          class="alumni-card"
        >

          <!-- TOP -->
          <div class="card-top">

            <div class="avatar">

              {{ alumni.name?.charAt(0) }}

            </div>

            <div>

              <h3>

                {{ alumni.name }}

              </h3>

              <p>

                {{ alumni.company || 'Company not added' }}

              </p>

            </div>

          </div>

          <!-- ROLE -->
          <div class="role-badge">

            {{ alumni.jobRole || 'Alumni' }}

          </div>

          <!-- BIO -->
          <p class="bio">

            {{
              alumni.bio
              || 'Part of your college alumni network.'
            }}

          </p>

          <!-- SKILLS -->
          <div class="skills">

            <span>

              {{ alumni.skills || 'No skills added' }}

            </span>

          </div>

          <!-- DEBUG ID -->
          <p class="debug-id">

            ID: {{ alumni.id }}

          </p>

          <!-- BUTTONS -->
          <div class="card-actions">

            <button

              *ngIf="alumni.id"

              class="profile-btn"

              [routerLink]="[
                '/profile',
                alumni.id
              ]"
            >
              View Profile
            </button>

            <button

  class="message-btn"

  [routerLink]="[
    '/chat',
    alumni.email
  ]"

>

  Message

</button>

          </div>

        </div>

      </div>

    </section>

  </div>
  `,

  styles: [`

.hero {
  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  padding: 50px;

  border-radius: 24px;

  margin: 25px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;
}

.hero-title {
  font-size: 40px;

  font-weight: bold;

  margin-bottom: 10px;
}

.hero-subtitle {
  max-width: 700px;

  opacity: 0.9;

  line-height: 1.6;
}

.explore-btn {
  background: white;

  color: #2563eb;

  padding: 14px 24px;

  border-radius: 14px;

  font-weight: bold;

  border: none;

  cursor: pointer;

  transition: 0.2s;
}

.explore-btn:hover {
  transform: translateY(-2px);
}

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));

  gap: 20px;

  margin: 25px;
}

.stat-card {
  background: white;

  padding: 30px;

  border-radius: 22px;

  box-shadow:
    0 4px 12px rgba(0,0,0,0.08);

  text-align: center;
}

.stat-card h2 {
  font-size: 36px;

  color: #2563eb;

  margin-bottom: 8px;
}

.section {
  margin: 30px 25px;
}

.section-header {
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 30px;

  font-weight: bold;
}

.section-header p {
  color: gray;
}

.alumni-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(320px, 1fr));

  gap: 24px;
}

.alumni-card {
  background: white;

  border-radius: 24px;

  padding: 24px;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.08);

  transition: 0.25s;
}

.alumni-card:hover {
  transform: translateY(-6px);
}

.card-top {
  display: flex;

  align-items: center;

  gap: 16px;

  margin-bottom: 18px;
}

.avatar {
  width: 60px;

  height: 60px;

  border-radius: 50%;

  background: #dbeafe;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 24px;

  font-weight: bold;

  color: #2563eb;
}

.card-top h3 {
  font-size: 20px;

  font-weight: bold;
}

.card-top p {
  color: gray;
}

.role-badge {
  display: inline-block;

  background: #eff6ff;

  color: #2563eb;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 14px;

  margin-bottom: 16px;
}

.bio {
  color: #4b5563;

  line-height: 1.6;

  margin-bottom: 18px;
}

.skills {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 20px;
}

.skills span {
  background: #f3f4f6;

  padding: 8px 12px;

  border-radius: 999px;

  font-size: 13px;
}

.debug-id {
  margin-bottom: 15px;

  font-weight: bold;

  color: #2563eb;
}

.card-actions {
  display: flex;

  gap: 12px;
}

.profile-btn {
  flex: 1;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  padding: 12px;

  border-radius: 14px;

  font-weight: 600;

  border: none;

  cursor: pointer;
}

.message-btn {
  flex: 1;

  background: #f3f4f6;

  padding: 12px;

  border-radius: 14px;

  font-weight: 600;

  border: none;

  cursor: pointer;
}

@media(max-width: 768px) {

  .hero {
    flex-direction: column;

    align-items: flex-start;
  }

  .hero-title {
    font-size: 30px;
  }
}

`]
})

export class StudentDashboardComponent
implements OnInit {

  userName = '';

  featuredAlumni: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.userName =

      localStorage.getItem(
        'userEmail'
      ) || 'Student';

    // LOAD REAL ALUMNI
    this.http.get<any[]>(

      'http://localhost:8080/users/alumni'

    )

    .subscribe({

      next: (data) => {

        console.log(
          'ALUMNI:',
          data
        );

        this.featuredAlumni = data;
      },

      error: (err) => {

        console.log(
          'ALUMNI ERROR:',
          err
        );
      }
    });
  }

  goToExplore(): void {

    this.router.navigate([
      '/alumni-list'
    ]);
  }
}