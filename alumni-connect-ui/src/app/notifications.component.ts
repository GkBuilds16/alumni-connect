import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { NavbarComponent }
from './navbar.component';

import { NotificationService }
from './notification.service';

@Component({

  selector: 'app-notifications',

  standalone: true,

  imports: [
    CommonModule,
    NavbarComponent
  ],

  template: `

<div class="page">

  <!-- NAVBAR -->

  <app-navbar></app-navbar>

  <div class="container">

    <!-- HEADER -->

    <div class="header">

      <div>

        <h1>
          Notifications
        </h1>

        <p>
          Stay updated with realtime alerts
        </p>

      </div>

      <div class="badge">

        {{ notifications.length }}

      </div>

    </div>

    <!-- EMPTY -->

    <div

      *ngIf="
        notifications.length === 0
      "

      class="empty"
    >

      <div class="empty-icon">
        🔔
      </div>

      <h2>
        No notifications yet
      </h2>

      <p>
        Notifications will appear here
      </p>

    </div>

    <!-- NOTIFICATIONS -->

    <div

      *ngIf="
        notifications.length > 0
      "

      class="notification-list"
    >

      <div

        *ngFor="
          let n of notifications
        "

        class="notification-card"

        [class.unread]="
          !n.read
        "

        (click)="openNotification(n)"
      >

        <!-- ICON -->

        <div class="icon">

          🔔

        </div>

        <!-- CONTENT -->

        <div class="content">

          <div class="top-row">

            <h3>

              {{ n.message }}

            </h3>

            <span>

              {{
                formatTime(
                  n.timestamp
                )
              }}

            </span>

          </div>

          <p>

            {{
              n.type
            }}

          </p>

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

  max-width: 900px;

  margin: auto;

  padding: 40px 20px;
}

/* HEADER */

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 35px;
}

.header h1 {

  font-size: 42px;

  font-weight: 800;

  margin-bottom: 10px;

  color: #111827;
}

.header p {

  color: #6b7280;

  font-size: 17px;
}

.badge {

  width: 60px;

  height: 60px;

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

  font-size: 24px;

  font-weight: bold;
}

/* EMPTY */

.empty {

  background: white;

  border-radius: 24px;

  padding: 80px 30px;

  text-align: center;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.06);
}

.empty-icon {

  font-size: 60px;

  margin-bottom: 20px;
}

.empty h2 {

  font-size: 30px;

  margin-bottom: 12px;

  color: #111827;
}

.empty p {

  color: #6b7280;
}

/* LIST */

.notification-list {

  display: flex;

  flex-direction: column;

  gap: 18px;
}

/* CARD */

.notification-card {

  background: white;

  border-radius: 24px;

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 18px;

  cursor: pointer;

  transition: 0.3s;

  box-shadow:
    0 6px 18px rgba(0,0,0,0.05);
}

.notification-card:hover {

  transform:
    translateY(-4px);

  box-shadow:
    0 12px 25px rgba(0,0,0,0.08);
}

/* UNREAD */

.notification-card.unread {

  border-left:
    6px solid #2563eb;

  background: #eef2ff;
}

/* ICON */

.icon {

  width: 64px;

  height: 64px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 26px;

  color: white;

  flex-shrink: 0;
}

/* CONTENT */

.content {

  flex: 1;
}

.top-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 10px;
}

.top-row h3 {

  font-size: 18px;

  color: #111827;

  font-weight: 700;
}

.top-row span {

  font-size: 13px;

  color: #6b7280;
}

.content p {

  color: #4b5563;

  margin: 0;
}

/* MOBILE */

@media(max-width: 768px) {

  .header {

    flex-direction: column;

    gap: 20px;

    align-items: flex-start;
  }

  .notification-card {

    padding: 18px;
  }

  .top-row {

    flex-direction: column;

    align-items: flex-start;

    gap: 4px;
  }
}

`]
})

export class NotificationsComponent
implements OnInit {

  notifications: any[] = [];

  constructor(

    private notificationService:
    NotificationService,

    private router: Router

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    const email =

      localStorage.getItem(
        'userEmail'
      ) || '';

    // INIT SERVICE

    this.notificationService.init(
      email
    );

    // SUBSCRIBE

    this.notificationService
    .notifications

    .subscribe(data => {

      this.notifications = data;
    });
  }

  // =====================================
  // OPEN NOTIFICATION
  // =====================================

  openNotification(
    notification: any
  ): void {

    // MARK READ

    if (!notification.read) {

      this.notificationService
      .markRead(
        notification.id
      );
    }

    // NAVIGATE

    if (notification.linkUrl) {

      this.router.navigate([
        notification.linkUrl
      ]);
    }
  }

  // =====================================
  // FORMAT TIME
  // =====================================

  formatTime(timestamp: string): string {

    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);

    return date.toLocaleString([], {

      hour: '2-digit',

      minute: '2-digit',

      month: 'short',

      day: 'numeric'
    });
  }
}