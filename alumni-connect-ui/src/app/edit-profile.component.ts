import { Component, OnInit } from '@angular/core';

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
  Router
} from '@angular/router';

@Component({
  selector: 'app-edit-profile',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  template: `

  <div class="page">

    <div class="card">

      <!-- HEADER -->
      <div class="header">

        <h1>
          Edit Profile
        </h1>

        <p>
          Keep your alumni profile updated
        </p>

      </div>

      <!-- FORM -->
      <div class="form-grid">

        <!-- NAME -->
        <div class="field">

          <label>
            Full Name
          </label>

          <input
            [(ngModel)]="user.name"
            placeholder="Enter full name"
          />

        </div>

        <!-- COLLEGE -->
        <div class="field">

          <label>
            College
          </label>

          <input
            [(ngModel)]="user.college"
            placeholder="Enter college"
          />

        </div>

        <!-- BRANCH -->
        <div class="field">

          <label>
            Branch
          </label>

          <input
            [(ngModel)]="user.branch"
            placeholder="Enter branch"
          />

        </div>

        <!-- PASSOUT -->
        <div class="field">

          <label>
            Passout Year
          </label>

          <input
            [(ngModel)]="user.passoutYear"
            placeholder="Enter year"
          />

        </div>

        <!-- ROLL -->
        <div class="field">

          <label>
            Roll Number
          </label>

          <input
            [(ngModel)]="user.rollno"
            placeholder="Enter roll number"
          />

        </div>

        <!-- SECTION -->
        <div class="field">

          <label>
            Section
          </label>

          <input
            [(ngModel)]="user.section"
            placeholder="Enter section"
          />

        </div>

        <!-- COMPANY -->
        <div class="field">

          <label>
            Company
          </label>

          <input
            [(ngModel)]="user.company"
            placeholder="Enter company"
          />

        </div>

        <!-- ROLE -->
        <div class="field">

          <label>
            Job Role
          </label>

          <input
            [(ngModel)]="user.jobRole"
            placeholder="Enter job role"
          />

        </div>

        <!-- SKILLS -->
        <div class="field">

          <label>
            Skills
          </label>

          <input
            [(ngModel)]="user.skills"
            placeholder="Ex: Java, Angular, Spring"
          />

        </div>

        <!-- INTERESTS -->
        <div class="field">

          <label>
            Interests
          </label>

          <input
            [(ngModel)]="user.interests"
            placeholder="Ex: AI, Web Dev"
          />

        </div>

        <!-- LOCATION -->
        <div class="field">

          <label>
            Location
          </label>

          <input
            [(ngModel)]="user.location"
            placeholder="Enter location"
          />

        </div>

        <!-- LINKEDIN -->
        <div class="field">

          <label>
            LinkedIn
          </label>

          <input
            [(ngModel)]="user.linkedin"
            placeholder="LinkedIn URL"
          />

        </div>

        <!-- GITHUB -->
        <div class="field">

          <label>
            GitHub
          </label>

          <input
            [(ngModel)]="user.github"
            placeholder="GitHub URL"
          />

        </div>

        <!-- IMAGE -->
        <div class="field">

          <label>
            Profile Image URL
          </label>

          <input
            [(ngModel)]="user.profileImage"
            placeholder="Paste image URL"
          />

        </div>

      </div>

      <!-- BIO -->
      <div class="bio-section">

        <label>
          Bio
        </label>

        <textarea
          [(ngModel)]="user.bio"
          placeholder="Write about yourself..."
        ></textarea>

      </div>

      <!-- BUTTON -->
      <button
        (click)="updateProfile()"
        class="save-btn"
      >

        Save Changes

      </button>

      <!-- SUCCESS -->
      <div
        *ngIf="message"
        class="success-box"
      >

        {{ message }}

      </div>

    </div>

  </div>
  `,

  styles: [`

* {
  box-sizing: border-box;
}

.page {

  min-height: 100vh;

  background:
    linear-gradient(
      to bottom right,
      #f3f4f6,
      #e5e7eb
    );

  padding: 50px 20px;
}

.card {

  max-width: 1100px;

  margin: auto;

  background: white;

  border-radius: 30px;

  padding: 40px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

.header {

  margin-bottom: 35px;
}

.header h1 {

  font-size: 42px;

  font-weight: 700;

  margin-bottom: 10px;

  color: #111827;
}

.header p {

  color: #6b7280;

  font-size: 16px;
}

.form-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));

  gap: 22px;
}

.field {

  display: flex;

  flex-direction: column;
}

.field label,
.bio-section label {

  margin-bottom: 10px;

  font-weight: 600;

  color: #374151;
}

input,
textarea {

  width: 100%;

  padding: 15px;

  border: 1px solid #d1d5db;

  border-radius: 16px;

  font-size: 15px;

  outline: none;

  transition: 0.2s;
}

input:focus,
textarea:focus {

  border-color: #2563eb;

  box-shadow:
    0 0 0 4px rgba(37,99,235,0.1);
}

.bio-section {

  margin-top: 30px;
}

textarea {

  min-height: 160px;

  resize: vertical;
}

.save-btn {

  width: 100%;

  margin-top: 35px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  border: none;

  padding: 18px;

  border-radius: 18px;

  font-size: 17px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;
}

.save-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(37,99,235,0.2);
}

.success-box {

  margin-top: 22px;

  background: #ecfdf5;

  color: #059669;

  padding: 16px;

  border-radius: 16px;

  text-align: center;

  font-weight: 600;
}

@media(max-width: 768px) {

  .card {

    padding: 25px;
  }

  .header h1 {

    font-size: 32px;
  }
}

`]
})

export class EditProfileComponent
implements OnInit {

  user: any = {};

  message = '';

  constructor(

    private http: HttpClient,

    private router: Router

  ) {}

  ngOnInit(): void {

    // EMAIL
    const email =
      localStorage.getItem('userEmail');

    // TOKEN
    const token =
      localStorage.getItem('token');

    // LOAD PROFILE
    this.http.get<any>(

      'http://localhost:8080/users/email/' + email,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    )

    .subscribe({

      next: (res) => {

        console.log(
          'PROFILE DATA:',
          res
        );

        // IMPORTANT
        this.user = { ...res };
      },

      error: (err) => {

        console.log(
          'LOAD PROFILE ERROR:',
          err
        );
      }
    });
  }

  updateProfile(): void {

    const token =
      localStorage.getItem('token');

    this.http.put(

      'http://localhost:8080/users/' + this.user.id,

      this.user,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    )

    .subscribe({

      next: (res: any) => {

        console.log(
          'UPDATED PROFILE:',
          res
        );

        // IMPORTANT
        this.user = { ...res };

        this.message =
          'Profile updated successfully';
      },

      error: (err) => {

        console.log(
          'UPDATE ERROR:',
          err
        );
      }
    });
  }
}