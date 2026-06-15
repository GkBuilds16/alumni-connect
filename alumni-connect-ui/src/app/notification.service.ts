import { Injectable }
from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { ChatService }
from './chat.service';

@Injectable({

  providedIn: 'root'
})

export class NotificationService {

  // =====================================
  // GLOBAL STATE
  // =====================================

  notifications =
    new BehaviorSubject<any[]>([]);

  unreadCount =
    new BehaviorSubject<number>(0);

  email = '';

  initialized = false;

  constructor(

    private http: HttpClient,

    private chatService: ChatService

  ) {}

  // =====================================
  // INIT
  // =====================================

  init(email: string): void {

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.email = email;

    // LOAD EXISTING

    this.loadNotifications();

    // CONNECT SOCKET

    this.chatService.connect(() => {

      console.log(
        'NOTIFICATION SOCKET CONNECTED'
      );

      // REALTIME SUBSCRIBE

      this.chatService.subscribeNotifications(

        email,

        (notification: any) => {

          console.log(
            'NEW NOTIFICATION:',
            notification
          );

          // ADD TOP

          this.notifications.next([

            notification,

            ...this.notifications.value
          ]);

          // UPDATE COUNT

          this.unreadCount.next(

            this.unreadCount.value + 1
          );
        }
      );
    });
  }

  // =====================================
  // LOAD EXISTING
  // =====================================

  loadNotifications(): void {

    const token = localStorage.getItem(
      'token'
    );

    const headers = new HttpHeaders({

      Authorization:
        'Bearer ' + token
    });

    this.http.get<any[]>(

      'http://localhost:8080/notifications/'
      + this.email,

      { headers }

    )

    .subscribe({

      next: (res) => {

        this.notifications.next(
          res || []
        );

        // COUNT UNREAD

        const unread =

          (res || []).filter(

            n => !n.read
          ).length;

        this.unreadCount.next(
          unread
        );
      },

      error: (err) => {

        console.log(err);
      }
    });
  }

  // =====================================
  // MARK READ
  // =====================================

  markRead(id: number): void {

    const token = localStorage.getItem(
      'token'
    );

    const headers = new HttpHeaders({

      Authorization:
        'Bearer ' + token
    });

    this.http.put(

      'http://localhost:8080/notifications/read/'
      + id,

      {},

      { headers }

    )

    .subscribe({

      next: () => {

        const updated =

          this.notifications.value.map(

            n => {

              if (n.id === id) {

                n.read = true;
              }

              return n;
            }
          );

        this.notifications.next(
          updated
        );

        const unread =

          updated.filter(

            n => !n.read
          ).length;

        this.unreadCount.next(
          unread
        );
      }
    });
  }
}