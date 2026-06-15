import {

  Component,

  ChangeDetectorRef

} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Component({

  selector: 'app-create-event',

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
        Create Event
      </h1>

      <p>
        Organize alumni meetups,
        hackathons, webinars,
        workshops and networking events
      </p>

    </div>

    <!-- TITLE -->

    <div class="input-group">

      <label>
        Event Title
      </label>

      <input

        [(ngModel)]="title"

        placeholder="Enter event title"
      />

    </div>

    <!-- DESCRIPTION -->

    <div class="input-group">

      <label>
        Description
      </label>

      <textarea

        [(ngModel)]="description"

        placeholder="Describe your event..."
      ></textarea>

    </div>

    <!-- LOCATION -->

    <div class="input-group">

      <label>
        Location
      </label>

      <input

        [(ngModel)]="location"

        placeholder="Enter location"
      />

    </div>
    <!-- IMAGE URL -->

<div class="input-group">

  <label>
    Event Poster URL
  </label>

  <input

    [(ngModel)]="imageUrl"

    placeholder="Paste poster image URL"
  />

</div>
<!-- MEETING LINK -->

<div class="input-group">

  <label>
    Meeting Link
  </label>

  <input

    [(ngModel)]="meetingLink"

    placeholder="Zoom / Google Meet link"
  />

</div>
<!-- CATEGORY -->

<div class="input-group">

  <label>
    Category
  </label>

  <input

    [(ngModel)]="category"

    placeholder="Hackathon / Workshop / Webinar"
  />

</div>
    <!-- DATE -->

    <div class="input-group">

      <label>
        Event Date
      </label>

      <input

        [(ngModel)]="eventDate"

        type="date"
      />

    </div>

    <!-- BUTTON -->

    <button

      (click)="createEvent()"

      [disabled]="loading"
    >

      {{ loading
        ? 'Posting...'
        : 'Post Event'
      }}

    </button>

    <!-- SUCCESS -->

    <div

      *ngIf="successMessage"

      class="success"
    >

      {{ successMessage }}

    </div>

    <!-- ERROR -->

    <div

      *ngIf="errorMessage"

      class="error"
    >

      {{ errorMessage }}

    </div>

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
      to bottom,
      #f8fafc,
      #eef2ff
    );

  padding: 30px;
}

.card {

  width: 100%;

  max-width: 700px;

  background: white;

  padding: 40px;

  border-radius: 28px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

/* HEADER */

.header {

  margin-bottom: 30px;
}

.header h1 {

  font-size: 40px;

  margin-bottom: 10px;

  color: #111827;
}

.header p {

  color: #6b7280;

  line-height: 1.6;
}

/* INPUT GROUP */

.input-group {

  margin-bottom: 22px;
}

.input-group label {

  display: block;

  margin-bottom: 10px;

  font-weight: 600;

  color: #374151;
}

input,
textarea {

  width: 100%;

  padding: 16px;

  border-radius: 16px;

  border: 1px solid #d1d5db;

  font-size: 15px;

  transition: 0.2s;

  outline: none;
}

input:focus,
textarea:focus {

  border-color: #2563eb;

  box-shadow:
    0 0 0 4px rgba(37,99,235,0.1);
}

textarea {

  min-height: 160px;

  resize: vertical;
}

/* BUTTON */

button {

  width: 100%;

  padding: 16px;

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

  font-weight: bold;

  cursor: pointer;

  transition: 0.3s;
}

button:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 18px rgba(37,99,235,0.25);
}

button:disabled {

  opacity: 0.7;

  cursor: not-allowed;
}

/* SUCCESS */

.success {

  margin-top: 20px;

  padding: 16px;

  border-radius: 14px;

  background: #dcfce7;

  color: #166534;

  font-weight: 600;
}

/* ERROR */

.error {

  margin-top: 20px;

  padding: 16px;

  border-radius: 14px;

  background: #fee2e2;

  color: #991b1b;

  font-weight: 600;
}

/* MOBILE */

@media(max-width: 768px) {

  .card {

    padding: 28px;
  }

  .header h1 {

    font-size: 32px;
  }
}

`]
})

export class CreateEventComponent {

  title = '';

  description = '';

  location = '';

  eventDate = '';

  imageUrl = '';

meetingLink = '';

category = '';
  successMessage = '';

  errorMessage = '';

  loading = false;

  constructor(

  private http: HttpClient,

  private cdr: ChangeDetectorRef

) {}

  // =====================================
  // CREATE EVENT
  // =====================================

  createEvent(): void {

  // RESET

  this.successMessage = '';

  this.errorMessage = '';

  // VALIDATION

  if (

    !this.title.trim()

    ||

    !this.description.trim()

    ||

    !this.location.trim()

    ||

    !this.eventDate

  ) {

    this.errorMessage =
      'Please fill all fields';

    return;
  }

  const token =
    localStorage.getItem('token');

  const email =
    localStorage.getItem('userEmail');

  const role =
    localStorage.getItem('role');

  const headers = new HttpHeaders({

    Authorization:
      'Bearer ' + token
  });

  // START LOADING

  this.loading = true;

  this.http.post(

  'http://localhost:8080/events',

  {

    title: this.title,

    description: this.description,

    location: this.location,

    eventDate: this.eventDate,

    createdBy: email,

    role: role,

    imageUrl: this.imageUrl,

    meetingLink: this.meetingLink,

    category: this.category
  },

  { headers }

)

.subscribe({

  next: (res) => {

    console.log(
      'EVENT CREATED:',
      res
    );

    this.successMessage =
      'Event posted successfully';

    // RESET FORM

    this.title = '';

    this.description = '';

    this.location = '';

    this.eventDate = '';

    this.imageUrl = '';

    this.meetingLink = '';

    this.category = '';

    // STOP LOADING

    setTimeout(() => {

      this.loading = false;

      this.cdr.detectChanges();

    }, 0);
  },

  error: (err) => {

    console.log(
      'EVENT ERROR:',
      err
    );

    this.errorMessage =
      'Failed to create event';

    // STOP LOADING

    setTimeout(() => {

      this.loading = false;

      this.cdr.detectChanges();

    }, 0);
  }
});
}
}