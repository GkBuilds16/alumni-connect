import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule,
  NgIf,
  NgFor
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';

import { NavbarComponent }
from './navbar.component';

@Component({

  selector: 'app-events',

  standalone: true,

  imports: [
    CommonModule,
    NavbarComponent,
    NgIf,
    NgFor
  ],
styles: [`

.page {

  min-height: 100vh;

  background: #f3f4f6;

  padding: 40px;
}

/* ===================================== */
/* HEADER */
/* ===================================== */

.header {

  margin-bottom: 40px;
}

.title {

  font-size: 42px;

  font-weight: bold;

  margin-bottom: 12px;

  color: #111827;
}

.subtitle {

  color: #6b7280;

  max-width: 700px;

  line-height: 1.7;

  font-size: 16px;
}

/* ===================================== */
/* ADMIN */
/* ===================================== */

.admin-section {

  margin-bottom: 60px;
}

.admin-title {

  font-size: 34px;

  font-weight: bold;

  margin-bottom: 24px;

  color: #111827;
}

/* ===================================== */
/* GRID */
/* ===================================== */

.events-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit,minmax(340px,1fr));

  gap: 28px;
}

/* ===================================== */
/* CARD */
/* ===================================== */

.event-card {

  background: white;

  border-radius: 26px;

  padding: 28px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.06);

  transition: 0.3s;
}

.event-card:hover {

  transform:
    translateY(-4px);

  box-shadow:
    0 18px 40px rgba(0,0,0,0.1);
}

/* ===================================== */
/* IMAGE */
/* ===================================== */

.event-image {

  width: 100%;

  height: 220px;

  object-fit: cover;

  border-radius: 18px;

  margin-bottom: 20px;
}

/* ===================================== */
/* BADGES */
/* ===================================== */

.pending-card {

  border-left:
    6px solid #f59e0b;
}

.rejected-card {

  border-left:
    6px solid #dc2626;
}

/* ===================================== */
/* EVENT TOP */
/* ===================================== */

.event-top {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.event-badge {

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  padding: 8px 16px;

  border-radius: 999px;

  font-size: 12px;

  font-weight: bold;
}

.event-date {

  font-size: 14px;

  color: #6b7280;
}

/* ===================================== */
/* TEXT */
/* ===================================== */

.event-title {

  font-size: 24px;

  font-weight: bold;

  margin-bottom: 16px;

  color: #111827;
}

.event-description {

  line-height: 1.8;

  color: #4b5563;

  margin-bottom: 20px;
}

.meta {

  margin-top: 12px;

  font-size: 14px;

  color: #374151;
}

/* ===================================== */
/* ADMIN BUTTONS */
/* ===================================== */

.admin-buttons {

  display: flex;

  gap: 14px;

  margin-top: 24px;

  width: 100%;
}

.approve-btn {

  flex: 1;

  background: #16a34a;

  color: white;

  border: none;

  padding: 14px 18px;

  border-radius: 14px;

  font-weight: 700;

  cursor: pointer;

  font-size: 15px;

  transition: 0.2s;
}

.approve-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px rgba(22,163,74,0.25);
}

.reject-btn {

  flex: 1;

  background: #dc2626;

  color: white;

  border: none;

  padding: 14px 18px;

  border-radius: 14px;

  font-weight: 700;

  cursor: pointer;

  font-size: 15px;

  transition: 0.2s;
}

.reject-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px rgba(220,38,38,0.25);
}

/* ===================================== */
/* REGISTER BUTTON */
/* ===================================== */

.register-btn {

  margin-top: 24px;

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 14px;

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  font-weight: bold;

  cursor: pointer;

  font-size: 15px;

  transition: 0.3s;
}

.register-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px rgba(37,99,235,0.25);
}

/* ===================================== */
/* REGISTERED */
/* ===================================== */

.registered-btn {

  margin-top: 24px;

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 14px;

  background:
    linear-gradient(
      to right,
      #10b981,
      #059669
    );

  color: white;

  font-weight: bold;

  cursor: pointer;

  font-size: 15px;
}

/* ===================================== */
/* MEETING LINK */
/* ===================================== */

.meeting-btn {

  display: block;

  margin-top: 18px;

  text-align: center;

  background: #111827;

  color: white;

  padding: 14px;

  border-radius: 14px;

  text-decoration: none;

  font-weight: bold;

  transition: 0.3s;
}

.meeting-btn:hover {

  background: #1f2937;
}

/* ===================================== */
/* EMPTY */
/* ===================================== */

.empty-state {

  background: white;

  border-radius: 28px;

  padding: 70px 30px;

  text-align: center;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.06);
}

.empty-icon {

  font-size: 70px;

  margin-bottom: 20px;
}

/* ===================================== */
/* LOADING */
/* ===================================== */

.loading {

  padding: 50px;

  text-align: center;

  font-size: 18px;

  font-weight: 600;
}

/* ===================================== */
/* MOBILE */
/* ===================================== */

@media(max-width: 768px) {

  .page {

    padding: 20px;
  }

  .title {

    font-size: 34px;
  }

  .event-card {

    padding: 22px;
  }

  .admin-buttons {

    flex-direction: column;
  }
}

`],
  template: `

<app-navbar></app-navbar>

<div class="page">

  <!-- ===================================== -->
  <!-- HEADER -->
  <!-- ===================================== -->

  <div class="header">

    <h1 class="title">
      Upcoming Events
    </h1>

    <p class="subtitle">

      Discover workshops,
      webinars,
      alumni meetups,
      hackathons,
      and networking events.

    </p>

  </div>

  <!-- ===================================== -->
  <!-- ADMIN APPROVAL SECTION -->
  <!-- ===================================== -->

  <div

    *ngIf="
      role.toUpperCase().includes('ADMIN')
      &&
      pendingEvents.length > 0
    "

    class="admin-section"
  >

    <h2 class="admin-title">

      Pending Event Approvals

    </h2>

    <div class="events-grid">

      <div

        *ngFor="
          let event of pendingEvents
        "

        class="event-card pending-card"
      >

        <!-- EVENT IMAGE -->

        <img

          *ngIf="event.imageUrl"

          [src]="event.imageUrl"

          class="event-image"
        />

        <!-- TITLE -->

        <h2 class="event-title">

          {{ event.title }}

        </h2>

        <!-- DESCRIPTION -->

        <p class="event-description">

          {{ event.description }}

        </p>

        <!-- META -->

        <div class="meta">

          📍 {{ event.location }}

        </div>

        <div class="meta">

          👤 {{ event.createdBy }}

        </div>

        <div class="meta">

          📅 {{ event.eventDate }}

        </div>

        <!-- ADMIN ACTIONS -->

        <div class="admin-buttons">

          <!-- APPROVE -->

          <button

            (click)="approveEvent(
              event.id
            )"

            class="approve-btn"
          >

            Approve

          </button>

          <!-- REJECT -->

          <button

            (click)="rejectEvent(
              event.id
            )"

            class="reject-btn"
          >

            Reject

          </button>

        </div>

      </div>

    </div>

  </div>

  <!-- ===================================== -->
  <!-- ALUMNI REJECTED EVENTS -->
  <!-- ===================================== -->

  <div

    *ngIf="
      role.toUpperCase().includes('ALUMNI')
      &&
      rejectedEvents.length > 0
    "

    class="admin-section"
  >

    <h2 class="admin-title">

      Rejected Events

    </h2>

    <div class="events-grid">

      <div

        *ngFor="
          let event of rejectedEvents
        "

        class="event-card rejected-card"
      >

        <!-- EVENT IMAGE -->

        <img

          *ngIf="event.imageUrl"

          [src]="event.imageUrl"

          class="event-image"
        />

        <!-- TITLE -->

        <h2 class="event-title">

          {{ event.title }}

        </h2>

        <!-- DESCRIPTION -->

        <p class="event-description">

          {{ event.description }}

        </p>

        <!-- STATUS -->

        <div class="meta">

          ❌ Rejected by admin

        </div>

      </div>

    </div>

  </div>

  <!-- ===================================== -->
  <!-- ALUMNI PENDING EVENTS -->
  <!-- ===================================== -->

  <div

    *ngIf="
      role.toUpperCase().includes('ALUMNI')
      &&
      pendingEvents.length > 0
    "

    class="admin-section"
  >

    <h2 class="admin-title">

      Pending Approval

    </h2>

    <div class="events-grid">

      <div

        *ngFor="
          let event of pendingEvents
        "

        class="event-card pending-card"
      >

        <!-- EVENT IMAGE -->

        <img

          *ngIf="event.imageUrl"

          [src]="event.imageUrl"

          class="event-image"
        />

        <!-- TITLE -->

        <h2 class="event-title">

          {{ event.title }}

        </h2>

        <!-- DESCRIPTION -->

        <p class="event-description">

          {{ event.description }}

        </p>

        <!-- STATUS -->

        <div class="meta">

          ⏳ Waiting for admin approval

        </div>

      </div>

    </div>

  </div>

  <!-- ===================================== -->
  <!-- LOADING -->
  <!-- ===================================== -->

  <div

    *ngIf="loading"

    class="loading"
  >

    Loading events...

  </div>

  <!-- ===================================== -->
  <!-- EMPTY -->
  <!-- ===================================== -->

  <div

    *ngIf="
      !loading
      &&
      approvedEvents.length === 0
    "

    class="empty-state"
  >

    <div class="empty-icon">

      📅

    </div>

    <h2>

      No Upcoming Events

    </h2>

  </div>

  <!-- ===================================== -->
  <!-- APPROVED EVENTS -->
  <!-- ===================================== -->

  <div

    *ngIf="
      !loading
      &&
      approvedEvents.length > 0
    "

    class="events-grid"
  >

    <div

      *ngFor="
        let event of approvedEvents
      "

      class="event-card"
    >

      <!-- EVENT IMAGE -->

      <img

        *ngIf="event.imageUrl"

        [src]="event.imageUrl"

        class="event-image"
      />

      <!-- TOP -->

      <div class="event-top">

        <div class="event-badge">

          {{ event.role }}

        </div>

        <div class="event-date">

          📅 {{ event.eventDate }}

        </div>

      </div>

      <!-- TITLE -->

      <h2 class="event-title">

        {{ event.title }}

      </h2>

      <!-- DESCRIPTION -->

      <p class="event-description">

        {{ event.description }}

      </p>

      <!-- LOCATION -->

      <div class="meta">

        📍 {{ event.location }}

      </div>

      <!-- ORGANIZER -->

      <div class="meta">

        👤 Posted by:
        {{ event.createdBy }}

      </div>

      <!-- RSVP -->

      <div class="meta">

        👥
        {{ event.attendeeCount }}
        Registered

      </div>

      <!-- REGISTER -->

      <button

        *ngIf="
          !registeredEvents.has(
            event.id
          )
        "

        (click)="register(event)"

        class="register-btn"
      >

        Register

      </button>

      <!-- REGISTERED -->

      <button

        *ngIf="
          registeredEvents.has(
            event.id
          )
        "

        (click)="cancelRegistration(event)"

        class="registered-btn"
      >

        ✓ Registered

      </button>

      <!-- MEETING LINK -->

      <a

        *ngIf="
          registeredEvents.has(
            event.id
          )
          &&
          event.meetingLink
        "

        [href]="event.meetingLink"

        target="_blank"

        class="meeting-btn"
      >

        Join Event

      </a>

    </div>

  </div>

</div>
`
})


export class EventsComponent
implements OnInit {

  // =====================================
  // USER INFO
  // =====================================

  role = '';

  email = '';

  // =====================================
  // EVENTS
  // =====================================

  events: any[] = [];

  approvedEvents: any[] = [];

  pendingEvents: any[] = [];

  rejectedEvents: any[] = [];

  loading = true;

  // =====================================
  // REGISTRATION
  // =====================================

  registeredEvents =
    new Set<number>();

  registeringEvents =
    new Set<number>();

  constructor(

    private http: HttpClient

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

  // =====================================
  // GET ROLE FROM JWT
  // =====================================

  const token =

    localStorage.getItem(
      'token'
    );

  if (token) {

    const payload = JSON.parse(

      atob(

        token.split('.')[1]
      )
    );

    this.role =

      payload.role || '';

    console.log(
      'JWT ROLE:',
      this.role
    );
  }

  // =====================================
  // GET EMAIL
  // =====================================

  this.email =

    localStorage.getItem(
      'userEmail'
    ) || '';

  console.log(
    'ROLE:',
    this.role
  );

  console.log(
    'EMAIL:',
    this.email
  );

  // =====================================
  // LOAD EVENTS
  // =====================================

  this.loadEvents();
}
  // =====================================
  // LOAD EVENTS
  // =====================================

  loadEvents(): void {

    this.http.get<any[]>(

      'http://localhost:8080/events/all'

    ).subscribe({

     next: (data) => {

  this.events = [...(data || [])];


        console.log("ROLE =", this.role);
console.log("EVENTS =", this.events);
console.log("FIRST STATUS =", this.events[0]?.status);

        console.log(
          'ALL EVENTS:',
          this.events
        );

        // =================================
        // ADMIN
        // =================================

        if (

          this.role
            .toUpperCase()
            .includes('ADMIN')

        ) {

          // APPROVED

          this.approvedEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'APPROVED'
            );

          // PENDING

          this.pendingEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'PENDING'
            );

          // REJECTED

          this.rejectedEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'REJECTED'
            );
        }

        // =================================
        // ALUMNI
        // =================================

        else if (

          this.role
            .toUpperCase()
            .includes('ALUMNI')

        ) {

          // APPROVED

          this.approvedEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'APPROVED'
            );

          // OWN PENDING

          this.pendingEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'PENDING'

                &&

                e.createdBy ===
                this.email
            );

          // OWN REJECTED

          this.rejectedEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'REJECTED'

                &&

                e.createdBy ===
                this.email
            );
        }

        // =================================
        // STUDENT
        // =================================

        else {

          this.approvedEvents =

            this.events.filter(

              e =>

                e.status
                ?.toUpperCase()

                ===

                'APPROVED'
            );

          this.pendingEvents = [];

          this.rejectedEvents = [];
        }

        console.log(
          'PENDING EVENTS:',
          this.pendingEvents
        );

        this.loading = false;
      },

      error: (err) => {

        console.error(
          'LOAD EVENTS ERROR:',
          err
        );

        this.loading = false;
      }
    });
  }

  // =====================================
  // REGISTER
  // =====================================

  register(event: any): void {

    // ALREADY REGISTERED

    if (

      this.registeredEvents.has(
        event.id
      )

    ) {

      return;
    }

    // PREVENT DOUBLE CLICK

    if (

      this.registeringEvents.has(
        event.id
      )

    ) {

      return;
    }

    this.registeringEvents
      .add(event.id);

    const email =

      localStorage.getItem(
        'userEmail'
      );

    this.http.post(

      'http://localhost:8080/events/register'
      +
      '?eventId=' + event.id
      +
      '&studentEmail=' + email,

      {}

    ).subscribe({

      next: () => {

        this.registeredEvents
          .add(event.id);

        event.attendeeCount++;

        this.registeringEvents
          .delete(event.id);
      },

      error: (err) => {

        console.error(err);

        this.registeringEvents
          .delete(event.id);
      }
    });
  }

  // =====================================
  // CANCEL REGISTRATION
  // =====================================

  cancelRegistration(event: any): void {

    const email =

      localStorage.getItem(
        'userEmail'
      );

    this.http.delete(

      'http://localhost:8080/events/register'
      +
      '?eventId=' + event.id
      +
      '&studentEmail=' + email

    ).subscribe({

      next: () => {

        this.registeredEvents
          .delete(event.id);

        if (

          event.attendeeCount > 0

        ) {

          event.attendeeCount--;
        }
      },

      error: (err) => {

        console.error(err);
      }
    });
  }

  // =====================================
  // APPROVE EVENT
  // =====================================

  approveEvent(eventId: number): void {

    this.http.put(

      'http://localhost:8080/events/approve/'
      + eventId,

      {}

    ).subscribe({

      next: () => {

        console.log(
          'EVENT APPROVED'
        );

        this.loadEvents();
      },

      error: (err) => {

        console.error(
          'APPROVE ERROR:',
          err
        );
      }
    });
  }

  // =====================================
  // REJECT EVENT
  // =====================================

  rejectEvent(eventId: number): void {

    this.http.put(

      'http://localhost:8080/events/reject/'
      + eventId,

      {}

    ).subscribe({

      next: () => {

        console.log(
          'EVENT REJECTED'
        );

        this.loadEvents();
      },

      error: (err) => {

        console.error(
          'REJECT ERROR:',
          err
        );
      }
    });
  }
}