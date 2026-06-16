
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { ChatService }
from './chat.service';

@Component({

  selector: 'app-chat',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
  ],

  template: `

<div class="page">

  <div class="chat-card">

    <!-- HEADER -->
    <div class="header">

      <div>

        <h2>
          Chat
        </h2>

        <p>
          {{ receiverEmail }}
        </p>

      </div>

    </div>

    <!-- MESSAGES -->
    <div
  class="messages"
  #messagesContainer>

      <div

        *ngFor="
          let msg of messages
        "

        class="message-wrapper"

        [class.mine-wrapper]="
          msg.senderEmail === senderEmail
        "
      >

        <div

          class="message"

          [class.mine]="
            msg.senderEmail === senderEmail
          "
        >

          {{ msg.content }}

        </div>

      </div>

    </div>

    <!-- INPUT -->
    <div class="input-area">

      <input

        [(ngModel)]="content"

        (keyup.enter)="send()"

        placeholder="Type message..."
      />

      <button
        (click)="send()"
      >

        Send

      </button>

    </div>

  </div>

</div>
`,

  styles: [`

.page {

  min-height: 100vh;

  background: #f3f4f6;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 30px;
}

.chat-card {

  width: 100%;

  max-width: 1000px;

  height: 88vh;

  background: white;

  border-radius: 28px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

.header {

  padding: 22px;

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;
}

.messages {

  flex: 1;

  overflow-y: auto;

  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 12px;

  background: #f8fafc;

  scroll-behavior: smooth;
}

.messages::-webkit-scrollbar {

  width: 6px;
}

.messages::-webkit-scrollbar-thumb {

  background: #cbd5e1;

  border-radius: 999px;
}

.message-wrapper {

  display: flex;

  margin-bottom: 16px;
}

.mine-wrapper {

  justify-content: flex-end;
}

.message {

  padding: 14px 18px;

  border-radius: 20px;

  max-width: 65%;

  background: white;

  box-shadow:
    0 4px 12px rgba(0,0,0,0.06);

  word-break: break-word;

  line-height: 1.5;
}

.mine {

  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;
}

.input-area {

  display: flex;

  padding: 20px;

  gap: 14px;

  border-top:
    1px solid #e5e7eb;
}

.input-area input {

  flex: 1;

  padding: 16px;

  border-radius: 14px;

  border: 1px solid #d1d5db;

  outline: none;
}

.input-area button {

  background:
    linear-gradient(
      to right,
      #2563eb,
      #4f46e5
    );

  color: white;

  border: none;

  padding: 0 26px;

  border-radius: 14px;

  font-weight: bold;

  cursor: pointer;
}

`]
})

export class ChatComponent
implements OnInit, AfterViewChecked {

  senderEmail = '';

  receiverEmail = '';

  content = '';

  messages: any[] = [];

  socketConnected = false;
  private shouldScroll = false;
@ViewChild('messagesContainer')
messagesContainer!: ElementRef;
  constructor(

    private route: ActivatedRoute,

    private http: HttpClient,

    private chatService: ChatService

  ) {}

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      // CURRENT USER

      this.senderEmail =

        localStorage.getItem(
          'userEmail'
        ) || '';

      // RECEIVER

      this.receiverEmail =

        params.get('email') || '';

      console.log(
        'OPEN CHAT:',
        this.senderEmail,
        this.receiverEmail
      );

      // CLEAR ARRAY

      this.messages = [];

      // LOAD HISTORY

      this.loadMessages();

      // CONNECT SOCKET

      if (!this.socketConnected) {

        this.chatService.connect(() => {

          this.socketConnected = true;

          this.chatService.subscribe(

            this.senderEmail,

            (message: any) => {

              const valid =

                (
                  message.senderEmail
                  === this.senderEmail

                  &&

                  message.receiverEmail
                  === this.receiverEmail
                )

                ||

                (
                  message.senderEmail
                  === this.receiverEmail

                  &&

                  message.receiverEmail
                  === this.senderEmail
                );

              if (!valid) {
                return;
              }

              const exists =

                this.messages.some(

                  m => m.id === message.id
                );
if (!exists) {

  this.messages = [
    ...this.messages,
    message
  ];

  this.shouldScroll = true;
}
            }
          );
        });
      }
    });
  }

  ngAfterViewChecked(): void {

  if (this.shouldScroll) {

    this.scrollToBottom();

    this.shouldScroll = false;
  }
}

  private scrollToBottom(): void {

  setTimeout(() => {

    if (this.messagesContainer) {

      this.messagesContainer
        .nativeElement
        .scrollTop =

        this.messagesContainer
          .nativeElement
          .scrollHeight;

    }

  }, 50);

}
  // =====================================
  // LOAD HISTORY
  // =====================================

  loadMessages(): void {

    const token = localStorage.getItem(
      'token'
    );

    const headers = new HttpHeaders({

      Authorization:
        'Bearer ' + token
    });

    this.http.get<any[]>(

      'http://localhost:8080/messages/conversation'
      + '?sender='
      + this.senderEmail
      + '&receiver='
      + this.receiverEmail,

      { headers }

    )

    .subscribe({

   next: (res) => {

  console.log('CHAT HISTORY COUNT:', res.length);
  console.log('CHAT HISTORY:', res);

  this.messages = [...res];

  this.shouldScroll = true;
},

      error: (err) => {

        console.log(
          err
        );
      }
    });
  }

  // =====================================
  // SEND MESSAGE
  // =====================================

  send(): void {

    if (!this.content.trim()) {
      return;
    }

    const message = {

      senderEmail:
        this.senderEmail,

      receiverEmail:
        this.receiverEmail,

      content:
        this.content
    };

    this.chatService.sendMessage(
      message
    );

    this.content = '';
  }
}