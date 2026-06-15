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
  Router,
  RouterLink
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { NavbarComponent }
from '../navbar.component';

@Component({

  selector: 'app-alumni-dashboard',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    RouterLink,

    NavbarComponent
  ],

  template: `

<div class="page">

  <!-- NAVBAR -->
  <app-navbar></app-navbar>

  <div class="container">

    <!-- HERO -->
    <div class="hero">

      <div>

        <h1>
          Alumni Dashboard
        </h1>

        <p>
          Connect with students,
          mentor juniors,
          post opportunities
          and grow your network.
        </p>

      </div>

      <div class="hero-badge">

        {{ filteredStudents.length }}

      </div>

    </div>

    <!-- ACTIONS -->
    <div class="actions">

      <button
        routerLink="/create-event"
      >
        Create Event
      </button>

      <button
        routerLink="/events"
      >
        View Events
      </button>

      <button
        routerLink="/messages"
      >
        Inbox
      </button>

    </div>

    <!-- SEARCH -->
    <div class="search-box">

      <input

        [(ngModel)]="search"

        (input)="filterStudents()"

        placeholder="Search students..."
      />

    </div>

    <!-- EMPTY -->
    <div

      *ngIf="
        filteredStudents.length === 0
      "

      class="empty"
    >

      No students found

    </div>

    <!-- STUDENTS -->
    <div class="grid">

      <div

        *ngFor="
          let student of filteredStudents
        "

        class="card"
      >

        <div class="avatar">

          {{
            student.name
            ?.charAt(0)
            ?.toUpperCase()
          }}

        </div>

        <h3>
          {{ student.name }}
        </h3>

        <p>
          {{ student.email }}
        </p>

        <span>
          {{
            student.department
            || 'Department'
          }}
        </span>

        <div class="buttons">

          <button

            [routerLink]="[
              '/profile',
              student.id
            ]"
          >

            View Profile

          </button>

          <button

            [routerLink]="[
              '/chat',
              student.email
            ]"
          >

            Message

          </button>

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
      to bottom,
      #f8fafc,
      #eef2ff
    );
}

.container {

  max-width: 1300px;

  margin: auto;

  padding: 40px 20px;
}

/* HERO */

.hero {

  background: white;

  border-radius: 28px;

  padding: 40px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.05);
}

.hero h1 {

  font-size: 46px;

  margin-bottom: 12px;

  color: #111827;
}

.hero p {

  color: #6b7280;

  max-width: 700px;

  line-height: 1.7;
}

.hero-badge {

  width: 90px;

  height: 90px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 34px;

  font-weight: bold;
}

/* ACTIONS */

.actions {

  display: flex;

  gap: 18px;

  margin-bottom: 30px;

  flex-wrap: wrap;
}

.actions button {

  border: none;

  padding: 14px 24px;

  border-radius: 16px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  font-weight: bold;

  cursor: pointer;

  transition: 0.3s;
}

.actions button:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px rgba(37,99,235,0.2);
}

/* SEARCH */

.search-box {

  margin-bottom: 30px;
}

.search-box input {

  width: 100%;

  padding: 18px;

  border-radius: 18px;

  border: 1px solid #d1d5db;

  outline: none;

  font-size: 15px;
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

.grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(300px,1fr));

  gap: 24px;
}

/* CARD */

.card {

  background: white;

  border-radius: 24px;

  padding: 30px;

  text-align: center;

  box-shadow:
    0 8px 20px rgba(0,0,0,0.05);

  transition: 0.3s;
}

.card:hover {

  transform:
    translateY(-5px);
}

.avatar {

  width: 90px;

  height: 90px;

  border-radius: 50%;

  margin: auto;

  margin-bottom: 20px;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 34px;

  font-weight: bold;
}

.card h3 {

  font-size: 24px;

  margin-bottom: 10px;
}

.card p {

  color: #6b7280;

  margin-bottom: 10px;
}

.card span {

  display: inline-block;

  margin-bottom: 20px;

  padding: 8px 16px;

  border-radius: 999px;

  background: #eef2ff;

  color: #4f46e5;

  font-size: 14px;

  font-weight: 600;
}

/* BUTTONS */

.buttons {

  display: flex;

  gap: 12px;
}

.buttons button {

  flex: 1;

  border: none;

  padding: 14px;

  border-radius: 14px;

  cursor: pointer;

  font-weight: bold;
}

.buttons button:first-child {

  background: #f3f4f6;
}

.buttons button:last-child {

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;
}

/* MOBILE */

@media(max-width: 768px) {

  .hero {

    flex-direction: column;

    gap: 24px;

    text-align: center;
  }

  .hero h1 {

    font-size: 36px;
  }

  .buttons {

    flex-direction: column;
  }
}

`]
})

export class AlumniDashboardComponent
implements OnInit {

  students: any[] = [];

  filteredStudents: any[] = [];

  search = '';

  constructor(

    private http: HttpClient,

    private router: Router

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.loadStudents();
  }

  // =====================================
  // LOAD STUDENTS
  // =====================================

  loadStudents(): void {

    const token = localStorage.getItem(
      'token'
    );

    const headers = new HttpHeaders({

      Authorization:
        'Bearer ' + token
    });

    this.http.get<any[]>(

      'http://localhost:8080/users/students',

      { headers }

    )

    .subscribe({

      next: (res) => {

        this.students = res || [];

        this.filteredStudents =
          this.students;

        console.log(
          'STUDENTS:',
          res
        );
      },

      error: (err) => {

        console.log(err);
      }
    });
  }

  // =====================================
  // FILTER STUDENTS
  // =====================================

  filterStudents(): void {

    const value =
      this.search.toLowerCase();

    this.filteredStudents =

      this.students.filter(

        student =>

          student.name
          ?.toLowerCase()
          .includes(value)

          ||

          student.email
          ?.toLowerCase()
          .includes(value)

          ||

          student.department
          ?.toLowerCase()
          .includes(value)
      );
  }
}