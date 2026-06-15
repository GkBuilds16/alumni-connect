import { Component, OnInit } from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import { NavbarComponent }
from './navbar.component';

@Component({
  selector: 'app-profile',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent
  ],

  template: `

  <div class="page">

    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <!-- PROFILE -->
    <div class="profile-wrapper">

      <!-- HERO -->
      <div class="hero-card">

        <!-- LEFT -->
        <div class="hero-left">

          <div class="avatar">

            {{ user?.name?.charAt(0) }}

          </div>

          <div>

            <h1>

              {{ user?.name }}

            </h1>

            <p class="role">

              {{
                user?.jobRole
                || user?.role
              }}

            </p>

            <p class="company">

              {{
                user?.company
                || 'College Community Member'
              }}

            </p>

            <div class="hero-tags">

              <span>

                {{
                  user?.branch
                  || 'Branch'
                }}

              </span>

              <span>

                {{
                  user?.passoutYear
                  || 'Year'
                }}

              </span>

              <span>

                {{
                  user?.location
                  || 'Location'
                }}

              </span>

            </div>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="hero-right">

          <!-- EDIT PROFILE -->
          <button

            *ngIf="
              loggedInEmail === user?.email
            "

            class="edit-btn"

            [routerLink]="[
              '/edit-profile'
            ]"
          >

            Edit Profile

          </button>

        </div>

      </div>

      <!-- STATS -->
      <div class="stats-grid">

        <div class="stat-card">

          <h2>

            {{ user?.skills ? '12+' : '0' }}

          </h2>

          <p>
            Skills
          </p>

        </div>

        <div class="stat-card">

          <h2>

            {{ user?.company ? '1' : '0' }}

          </h2>

          <p>
            Companies
          </p>

        </div>

        <div class="stat-card">

          <h2>

            {{ user?.linkedin ? '2' : '0' }}

          </h2>

          <p>
            Social Links
          </p>

        </div>

      </div>

      <!-- CONTENT -->
      <div class="content-grid">

        <!-- LEFT -->
        <div>

          <!-- ABOUT -->
          <div class="card">

            <div class="card-header">

              <h2>
                About
              </h2>

            </div>

            <p class="bio">

              {{
                user?.bio
                || 'No bio added yet.'
              }}

            </p>

          </div>

          <!-- SKILLS -->
          <div class="card">

            <div class="card-header">

              <h2>
                Skills
              </h2>

            </div>

            <div class="skills">

              <span>

                {{
                  user?.skills
                  || 'No skills added'
                }}

              </span>

            </div>

          </div>

          <!-- INTERESTS -->
          <div class="card">

            <div class="card-header">

              <h2>
                Interests
              </h2>

            </div>

            <div class="interests">

              <span>

                {{
                  user?.interests
                  || 'No interests added'
                }}

              </span>

            </div>

          </div>

        </div>

        <!-- RIGHT -->
        <div>

          <!-- MESSAGE BUTTON -->


          <!-- EDUCATION -->
          <div class="card">

            <div class="card-header">

              <h2>
                Education
              </h2>

            </div>

            <div class="info-item">

              <label>
                College
              </label>

              <p>

                {{
                  user?.college
                  || 'Not added'
                }}

              </p>

            </div>

            <div class="info-item">

              <label>
                Branch
              </label>

              <p>

                {{
                  user?.branch
                  || 'Not added'
                }}

              </p>

            </div>

            <div class="info-item">

              <label>
                Passout Year
              </label>

              <p>

                {{
                  user?.passoutYear
                  || 'Not added'
                }}

              </p>

            </div>

          </div>

          <!-- PROFESSIONAL -->
          <div class="card">

            <div class="card-header">

              <h2>
                Professional
              </h2>

            </div>

            <div class="info-item">

              <label>
                Company
              </label>

              <p>

                {{
                  user?.company
                  || 'Not added'
                }}

              </p>

            </div>

            <div class="info-item">

              <label>
                Job Role
              </label>

              <p>

                {{
                  user?.jobRole
                  || 'Not added'
                }}

              </p>

            </div>

            <div class="info-item">

              <label>
                Location
              </label>

              <p>

                {{
                  user?.location
                  || 'Not added'
                }}

              </p>

            </div>

          </div>

          <!-- LINKS -->
          <div class="card">

            <div class="card-header">

              <h2>
                Professional Links
              </h2>

            </div>

            <div class="links">

              <a
                *ngIf="user?.linkedin"
                [href]="user?.linkedin"
                target="_blank"
              >

                LinkedIn Profile

              </a>

              <a
                *ngIf="user?.github"
                [href]="user?.github"
                target="_blank"
              >

                GitHub Profile

              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  `,

  styles: [`

.page {

  min-height: 100vh;

  background:
    linear-gradient(
      to bottom right,
      #f3f4f6,
      #e5e7eb
    );
}

.profile-wrapper {

  max-width: 1400px;

  margin: auto;

  padding: 30px;
}

.hero-card {

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;

  padding: 40px;

  border-radius: 32px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 28px;

  box-shadow:
    0 10px 30px rgba(37,99,235,0.25);
}

.hero-left {

  display: flex;

  align-items: center;

  gap: 24px;
}

.avatar {

  width: 130px;

  height: 130px;

  border-radius: 50%;

  background:
    rgba(255,255,255,0.15);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 50px;

  font-weight: bold;

  backdrop-filter: blur(10px);
}

.hero-left h1 {

  font-size: 44px;

  font-weight: 700;

  margin-bottom: 10px;
}

.role {

  font-size: 21px;

  opacity: 0.95;
}

.company {

  margin-top: 8px;

  opacity: 0.85;
}

.hero-tags {

  display: flex;

  gap: 12px;

  flex-wrap: wrap;

  margin-top: 18px;
}

.hero-tags span {

  background:
    rgba(255,255,255,0.15);

  padding: 10px 16px;

  border-radius: 999px;

  font-size: 14px;
}

.edit-btn {

  background: white;

  color: #2563eb;

  border: none;

  padding: 15px 26px;

  border-radius: 16px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.edit-btn:hover {

  transform: translateY(-2px);
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

  padding: 18px;

  border-radius: 18px;

  font-size: 18px;

  font-weight: 700;

  cursor: pointer;

  margin-bottom: 24px;

  transition: 0.2s;

  box-shadow:
    0 6px 18px rgba(16,185,129,0.25);
}

.message-btn:hover {

  transform: translateY(-2px);
}

.stats-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(220px,1fr));

  gap: 20px;

  margin-bottom: 28px;
}

.stat-card {

  background: white;

  border-radius: 24px;

  padding: 28px;

  text-align: center;

  box-shadow:
    0 4px 14px rgba(0,0,0,0.06);
}

.stat-card h2 {

  font-size: 36px;

  color: #2563eb;

  margin-bottom: 8px;
}

.stat-card p {

  color: #6b7280;
}

.content-grid {

  display: grid;

  grid-template-columns:
    1.2fr 0.8fr;

  gap: 24px;
}

.card {

  background: white;

  border-radius: 24px;

  padding: 28px;

  margin-bottom: 24px;

  box-shadow:
    0 4px 14px rgba(0,0,0,0.06);
}

.card-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.card h2 {

  font-size: 24px;

  color: #111827;

  font-weight: 700;
}

.bio {

  line-height: 1.8;

  color: #4b5563;
}

.skills,
.interests {

  display: flex;

  flex-wrap: wrap;

  gap: 12px;
}

.skills span,
.interests span {

  background: #eff6ff;

  color: #2563eb;

  padding: 10px 16px;

  border-radius: 999px;

  font-weight: 600;

  font-size: 14px;
}

.info-item {

  margin-bottom: 22px;
}

.info-item label {

  display: block;

  color: #6b7280;

  margin-bottom: 6px;

  font-size: 14px;
}

.info-item p {

  font-size: 17px;

  color: #111827;

  font-weight: 600;
}

.links {

  display: flex;

  flex-direction: column;

  gap: 14px;
}

.links a {

  text-decoration: none;

  color: #2563eb;

  background: #eff6ff;

  padding: 14px 18px;

  border-radius: 14px;

  font-weight: 700;

  transition: 0.2s;
}

.links a:hover {

  background: #dbeafe;
}

@media(max-width: 1000px) {

  .content-grid {

    grid-template-columns: 1fr;
  }

  .hero-card {

    flex-direction: column;

    align-items: flex-start;

    gap: 24px;
  }
}

@media(max-width: 768px) {

  .hero-left {

    flex-direction: column;

    align-items: flex-start;
  }

  .hero-left h1 {

    font-size: 32px;
  }

  .edit-btn {

    width: 100%;
  }
}

`]
})

export class ProfileComponent
implements OnInit {

  user: any = null;

  loggedInEmail = '';

  constructor(

    private route: ActivatedRoute,

    private http: HttpClient

  ) {}

  ngOnInit(): void {

    this.loggedInEmail =

      localStorage.getItem(
        'userEmail'
      ) || '';

    const id =
      this.route.snapshot.paramMap.get('id');

    console.log(
      'PROFILE ID:',
      id
    );

    this.http.get<any>(

      'http://localhost:8080/users/' + id

    )

    .subscribe({

      next: (res) => {

        console.log(
          'PROFILE RESPONSE:',
          res
        );

        this.user = { ...res };
      },

      error: (err) => {

        console.log(
          'PROFILE ERROR:',
          err
        );
      }
    });
  }
}