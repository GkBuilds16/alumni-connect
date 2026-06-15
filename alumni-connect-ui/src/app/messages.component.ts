import {

  Component,

  OnInit

} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { NavbarComponent }
from './navbar.component';

import { ChatService }
from './chat.service';

@Component({

  selector: 'app-messages',

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

  <div class="container">

    <!-- HEADER -->
    <div class="header">

      <div>

        <h1>
          Messages
        </h1>

        <p>
          Your recent conversations
        </p>

      </div>

      <div class="badge">

        {{ conversations.length }}

      </div>

    </div>

    <!-- LOADING -->
    <div

      *ngIf="loading"

      class="loading"
    >

      Loading conversations...

    </div>

    <!-- EMPTY -->
    <div

      *ngIf="
        !loading &&
        conversations.length === 0
      "

      class="empty"
    >

      <div class="empty-icon">
        💬
      </div>

      <h2>
        No conversations yet
      </h2>

      <p>
        Start chatting with alumni and students
      </p>

    </div>

    <!-- CONVERSATIONS -->
    <div

      *ngIf="
        !loading &&
        conversations.length > 0
      "

      class="conversation-list"
    >

      <div

        *ngFor="
          let convo of conversations
        "

        class="conversation-card"

        [routerLink]="[
          '/chat',
          convo.email
        ]"
      >

        <!-- AVATAR -->
        <div class="avatar">

          {{
            convo.email
            ?.charAt(0)
            ?.toUpperCase()
          }}

        </div>

        <!-- DETAILS -->
        <div class="details">

          <div class="top-row">

            <h3>
              {{ convo.email }}
            </h3>

            <span>

              {{
                formatTime(
                  convo.timestamp
                )
              }}

            </span>

          </div>

          <div class="message-row">

            <p>

              {{
                convo.latestMessage
              }}

            </p>

            <div class="online-dot"></div>

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
      to bottom,
      #f8fafc,
      #eef2ff
    );
}

.container {

  max-width: 950px;

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

/* LOADING */

.loading {

  background: white;

  border-radius: 24px;

  padding: 40px;

  text-align: center;

  font-size: 18px;

  color: #6b7280;

  box-shadow:
    0 8px 20px rgba(0,0,0,0.05);
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

.conversation-list {

  display: flex;

  flex-direction: column;

  gap: 18px;
}

/* CARD */

.conversation-card {

  background: white;

  border-radius: 24px;

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 20px;

  cursor: pointer;

  transition: 0.3s;

  box-shadow:
    0 6px 18px rgba(0,0,0,0.05);
}

.conversation-card:hover {

  transform:
    translateY(-4px);

  box-shadow:
    0 12px 25px rgba(0,0,0,0.08);
}

/* AVATAR */

.avatar {

  width: 72px;

  height: 72px;

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

  font-size: 28px;

  font-weight: bold;

  flex-shrink: 0;
}

/* DETAILS */

.details {

  flex: 1;
}

.top-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 10px;
}

.top-row h3 {

  font-size: 20px;

  color: #111827;

  font-weight: 700;
}

.top-row span {

  font-size: 13px;

  color: #6b7280;
}

.message-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 14px;
}

.message-row p {

  color: #4b5563;

  font-size: 15px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  max-width: 500px;
}

.online-dot {

  width: 12px;

  height: 12px;

  border-radius: 50%;

  background: #10b981;

  flex-shrink: 0;
}

/* MOBILE */

@media(max-width: 768px) {

  .header {

    flex-direction: column;

    gap: 20px;

    align-items: flex-start;
  }

  .header h1 {

    font-size: 34px;
  }

  .conversation-card {

    padding: 18px;
  }

  .avatar {

    width: 60px;

    height: 60px;

    font-size: 24px;
  }

  .top-row {

    flex-direction: column;

    align-items: flex-start;

    gap: 4px;
  }

  .message-row p {

    max-width: 200px;
  }
}

`]
})

export class MessagesComponent
implements OnInit {

  conversations: any[] = [];

  email = '';

  loading = true;

  constructor(

    private http: HttpClient,

    private chatService: ChatService

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.email =

      localStorage.getItem(
        'userEmail'
      ) || '';

    // INITIAL LOAD

    this.loadConversations();

    // REALTIME SOCKET

    this.chatService.connect(() => {

      console.log(
        'INBOX SOCKET CONNECTED'
      );

      // REALTIME INBOX

      this.chatService.subscribeInbox(

        this.email,

        (message: any) => {

          console.log(
            'NEW INBOX MESSAGE:',
            message
          );

          const otherUser =

            message.senderEmail === this.email

            ? message.receiverEmail

            : message.senderEmail;

          // FIND EXISTING

          const existing =

            this.conversations.find(

              c => c.email === otherUser
            );

          // UPDATE EXISTING

          if (existing) {

            existing.latestMessage =
              message.content;

            existing.timestamp =
              new Date();

            // MOVE TOP

            this.conversations = [

              existing,

              ...this.conversations.filter(

                c => c.email !== otherUser
              )
            ];
          }

          // NEW CONVERSATION

          else {

            this.conversations.unshift({

              email: otherUser,

              latestMessage:
                message.content,

              timestamp:
                new Date()
            });
          }
        }
      );
    });
  }

  // =====================================
  // LOAD CONVERSATIONS
  // =====================================

  loadConversations(): void {

    const token = localStorage.getItem(
      'token'
    );

    const headers = new HttpHeaders({

      Authorization:
        'Bearer ' + token
    });

    this.http.get<any[]>(

      'http://localhost:8080/conversations/'
      + this.email,

      { headers }

    )

    .subscribe({

      next: (res) => {

        console.log(
          'CONVERSATIONS:',
          res
        );

        this.conversations = res || [];

        this.loading = false;
      },

      error: (err) => {

        console.log(err);

        this.loading = false;
      }
    });
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