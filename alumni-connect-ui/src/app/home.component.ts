import { Component, OnInit } from '@angular/core';

import { NavbarComponent }
from './navbar.component';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink
  ],

  template: `

    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <div class="home-page">

      <!-- HERO SECTION -->
      <section class="hero">

        <div class="hero-content">

          <div class="welcome-badge">
            🎓 Alumni Connect Platform
          </div>

          <h1 class="hero-title">
            Welcome {{ email }} 👋
          </h1>

          <p class="hero-subtitle">

            Connect with alumni from your college,
            explore career journeys,
            and build meaningful mentorship connections.

          </p>

          <div class="hero-buttons">

            <!-- EXPLORE -->
            <button

              class="primary-btn"

              routerLink="/alumni-list"
            >

              Explore Alumni

            </button>

            <!-- MESSAGES -->
            <button

              class="secondary-btn"

              routerLink="/messages"
            >

              View Messages

            </button>

          </div>

        </div>

        <!-- HERO CARD -->
        <div class="hero-card">

          <div class="hero-card-top">

            <div class="hero-avatar">
              A
            </div>

            <div>

              <h3>Anita Sharma</h3>

              <p>Software Engineer at Google</p>

            </div>

          </div>

          <p class="hero-card-text">

            “Happy to mentor students in backend development,
            DSA and placements preparation.”

          </p>

          <div class="skills">

            <span>Java</span>

            <span>Spring Boot</span>

            <span>Angular</span>

          </div>

          <button

            class="message-btn"

            [routerLink]="[
              '/chat',
              'vinu@gmail.com'
            ]"
          >

            Message Alumni

          </button>

        </div>

      </section>

      <!-- CONNECTIONS -->
      <section class="connections-section">

        <div class="section-header">

          <h2>

            {{
              role === 'STUDENT'
              ? 'Connect With Alumni'
              : 'Connect With Students'
            }}

          </h2>

          <p>
            Start networking instantly
          </p>

        </div>

        <div class="connections-grid">

          <div

            *ngFor="let user of users"

            class="connection-card"
          >

            <div class="avatar">

             {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}

            </div>

            <h3>

              {{ user.name }}

            </h3>

            <p>

              {{
                user.company
                || user.branch
              }}

            </p>

            <div class="tags">

              <span>

                {{ user.branch }}

              </span>

              <span>

                {{ user.passoutYear }}

              </span>

            </div>

            <div class="actions">

              <button

                [routerLink]="[
                  '/profile',
                  user.id
                ]"

                class="view-btn"
              >

                View Profile

              </button>

              <button

                [routerLink]="[
                  '/chat',
                  user.email
                ]"

                class="message-btn"
              >

                Message

              </button>

            </div>

          </div>

        </div>

      </section>

      <!-- STATS -->
      <section class="stats-grid">

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

      </section>

      <!-- FEATURES -->
      <section class="features-section">

        <div class="section-header">

          <h2>
            Why Alumni Connect?
          </h2>

          <p>
            A focused mentorship platform
            for your college community
          </p>

        </div>

        <div class="features-grid">

          <!-- CARD -->
          <div class="feature-card">

            <div class="feature-icon">
              🔍
            </div>

            <h3>
              Explore Alumni
            </h3>

            <p>
              Search alumni by company,
              skills, domain and interests.
            </p>

          </div>

          <!-- CARD -->
          <div class="feature-card">

            <div class="feature-icon">
              💬
            </div>

            <h3>
              Private Messaging
            </h3>

            <p>
              Connect with alumni directly
              without sharing phone numbers.
            </p>

          </div>

          <!-- CARD -->
          <div class="feature-card">

            <div class="feature-icon">
              🚀
            </div>

            <h3>
              Career Guidance
            </h3>

            <p>
              Learn roadmaps, projects,
              interview preparation and referrals.
            </p>

          </div>

        </div>

      </section>

    </div>
  `,

  styles: [`

.home-page {

  min-height: 100vh;

  background: #f3f4f6;

  padding-bottom: 40px;
}

/* HERO */

.hero {

  margin: 25px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  border-radius: 28px;

  padding: 60px;

  color: white;

  display: grid;

  grid-template-columns:
    1.4fr 1fr;

  gap: 40px;

  align-items: center;
}

.welcome-badge {

  display: inline-block;

  background:
    rgba(255,255,255,0.15);

  padding: 10px 18px;

  border-radius: 999px;

  margin-bottom: 20px;

  font-size: 14px;
}

.hero-title {

  font-size: 54px;

  font-weight: bold;

  line-height: 1.1;

  margin-bottom: 20px;
}

.hero-subtitle {

  font-size: 18px;

  line-height: 1.7;

  opacity: 0.95;

  max-width: 700px;
}

.hero-buttons {

  display: flex;

  gap: 16px;

  margin-top: 30px;
}

.primary-btn {

  background: white;

  color: #2563eb;

  padding: 14px 24px;

  border-radius: 14px;

  font-weight: bold;

  border: none;

  cursor: pointer;
}

.secondary-btn {

  background:
    rgba(255,255,255,0.15);

  color: white;

  padding: 14px 24px;

  border-radius: 14px;

  font-weight: bold;

  border:
    1px solid rgba(255,255,255,0.2);

  cursor: pointer;
}

/* HERO CARD */

.hero-card {

  background: white;

  color: black;

  border-radius: 24px;

  padding: 28px;

  box-shadow:
    0 8px 24px rgba(0,0,0,0.15);
}

.hero-card-top {

  display: flex;

  align-items: center;

  gap: 16px;

  margin-bottom: 20px;
}

.hero-avatar {

  width: 70px;

  height: 70px;

  border-radius: 50%;

  background: #dbeafe;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #2563eb;

  font-size: 28px;

  font-weight: bold;
}

.hero-card-top h3 {

  font-size: 22px;

  font-weight: bold;
}

.hero-card-top p {

  color: gray;
}

.hero-card-text {

  line-height: 1.7;

  color: #4b5563;

  margin-bottom: 20px;
}

.skills {

  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 22px;
}

.skills span {

  background: #eff6ff;

  color: #2563eb;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 14px;
}

.message-btn {

  width: 100%;

  background:
    linear-gradient(
      135deg,
      #10b981,
      #059669
    );

  color: white;

  border: none;

  padding: 14px;

  border-radius: 14px;

  font-weight: bold;

  cursor: pointer;
}

/* CONNECTIONS */

.connections-section {

  margin: 40px 25px;
}

.connections-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(280px,1fr));

  gap: 24px;
}

.connection-card {

  background: white;

  border-radius: 24px;

  padding: 28px;

  text-align: center;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.06);

  transition: 0.25s;
}

.connection-card:hover {

  transform: translateY(-5px);
}

.connection-card .avatar {

  width: 80px;

  height: 80px;

  border-radius: 50%;

  background: #dbeafe;

  color: #2563eb;

  display: flex;

  align-items: center;

  justify-content: center;

  margin: auto;

  font-size: 30px;

  font-weight: bold;

  margin-bottom: 18px;
}

.connection-card h3 {

  font-size: 24px;

  margin-bottom: 10px;
}

.connection-card p {

  color: #6b7280;

  margin-bottom: 16px;
}

.tags {

  display: flex;

  justify-content: center;

  gap: 10px;

  flex-wrap: wrap;

  margin-bottom: 20px;
}

.tags span {

  background: #eff6ff;

  color: #2563eb;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 13px;
}

.actions {

  display: flex;

  gap: 12px;
}

.view-btn,
.message-btn {

  flex: 1;

  border: none;

  padding: 12px;

  border-radius: 12px;

  cursor: pointer;

  font-weight: 600;
}

.view-btn {

  background: #eff6ff;

  color: #2563eb;
}

/* STATS */

.stats-grid {

  margin: 30px 25px;

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));

  gap: 24px;
}

.stat-card {

  background: white;

  padding: 32px;

  border-radius: 24px;

  text-align: center;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.06);
}

.stat-card h2 {

  font-size: 40px;

  color: #2563eb;

  margin-bottom: 10px;
}

/* FEATURES */

.features-section {

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

.features-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));

  gap: 24px;
}

.feature-card {

  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.06);

  transition: 0.25s;
}

.feature-card:hover {

  transform: translateY(-6px);
}

.feature-icon {

  font-size: 40px;

  margin-bottom: 20px;
}

.feature-card h3 {

  font-size: 24px;

  font-weight: bold;

  margin-bottom: 14px;
}

.feature-card p {

  color: #4b5563;

  line-height: 1.7;
}

/* RESPONSIVE */

@media(max-width: 900px) {

  .hero {

    grid-template-columns: 1fr;

    padding: 40px;
  }

  .hero-title {

    font-size: 42px;
  }
}

@media(max-width: 600px) {

  .hero {

    padding: 30px;
  }

  .hero-title {

    font-size: 34px;
  }

  .hero-buttons {

    flex-direction: column;
  }

  .actions {

    flex-direction: column;
  }
}

`]
})

export class HomeComponent
implements OnInit {

  email: string | null = '';

  users: any[] = [];

  role = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.email =

      localStorage.getItem(
        'userEmail'
      );

    this.role =

      localStorage.getItem(
        'role'
      ) || '';

    if (!this.email) {

      window.location.href = '/';

      return;
    }

    // STUDENT → LOAD ALUMNI

    if (this.role === 'STUDENT') {

      this.http.get<any[]>(

        'http://localhost:8080/users/alumni'

      )

      .subscribe({

        next: (res) => {

          this.users = res;

          console.log(
            'ALUMNI:',
            res
          );
        }
      });
    }

    // ALUMNI → LOAD STUDENTS

    else if (
      this.role.toUpperCase() === 'ALUMNI'
    ) {

      this.http.get<any[]>(

        'http://localhost:8080/users/students'

      )

      .subscribe({

        next: (res) => {

          this.users = res;

          console.log(
            'STUDENTS:',
            res
          );
        }
      });
    }
  }
}