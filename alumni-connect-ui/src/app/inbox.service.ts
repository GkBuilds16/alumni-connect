import { Injectable }
from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import { ChatService }
from './chat.service';

@Injectable({

  providedIn: 'root'
})

export class InboxService {

  // =====================================
  // GLOBAL CONVERSATIONS STATE
  // =====================================

  conversations =
    new BehaviorSubject<any[]>([]);

  email = '';

  initialized = false;

  constructor(

    private chatService: ChatService

  ) {}

  // =====================================
  // INIT
  // =====================================

  init(email: string): void {

    // PREVENT MULTIPLE INIT

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.email = email;

    // CONNECT SOCKET

    this.chatService.connect(() => {

      console.log(
        'GLOBAL INBOX CONNECTED'
      );

      // GLOBAL REALTIME LISTENER

      this.chatService.subscribeInbox(

        this.email,

        (message: any) => {

          console.log(
            'GLOBAL MESSAGE:',
            message
          );

          this.updateInbox(
            message
          );
        }
      );
    });
  }

  // =====================================
  // UPDATE INBOX
  // =====================================

  updateInbox(message: any): void {

    const current =
      this.conversations.value;

    const otherUser =

      message.senderEmail ===
      this.email

      ? message.receiverEmail

      : message.senderEmail;

    const existing =

      current.find(

        c => c.email === otherUser
      );

    // EXISTING CHAT

    if (existing) {

      existing.latestMessage =
        message.content;

      existing.timestamp =
        new Date();

      const updated = [

        existing,

        ...current.filter(

          c => c.email !== otherUser
        )
      ];

      this.conversations.next(
        updated
      );
    }

    // NEW CHAT

    else {

      this.conversations.next([

        {

          email: otherUser,

          latestMessage:
            message.content,

          timestamp:
            new Date()
        },

        ...current
      ]);
    }
  }

  // =====================================
  // SET INITIAL DATA
  // =====================================

  setConversations(
    data: any[]
  ): void {

    this.conversations.next(
      data
    );
  }
}