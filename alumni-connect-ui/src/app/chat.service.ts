import { Injectable }
from '@angular/core';

import SockJS
from 'sockjs-client';

import {
  Client
} from '@stomp/stompjs';

@Injectable({

  providedIn: 'root'
})

export class ChatService {

  stompClient!: Client;

  connected = false;

  // ===================================
  // CONNECT
  // ===================================

  connect(callback: any): void {

    // PREVENT DUPLICATE CONNECTIONS

    if (this.connected) {

      callback();

      return;
    }

    // CREATE CLIENT

    this.stompClient = new Client({

      webSocketFactory: () =>

        new SockJS(
          'http://localhost:8080/chat'
        ),

      reconnectDelay: 5000,

      debug: (msg) => {

        console.log(msg);
      },

      // CONNECTED

      onConnect: () => {

        console.log(
          'WEBSOCKET CONNECTED'
        );

        this.connected = true;

        callback();
      },

      // DISCONNECTED

      onDisconnect: () => {

        console.log(
          'WEBSOCKET DISCONNECTED'
        );

        this.connected = false;
      },

      // ERROR

      onStompError: (frame) => {

        console.log(
          'STOMP ERROR',
          frame
        );
      }
    });

    // ACTIVATE

    this.stompClient.activate();
  }

  // ===================================
  // CHAT SUBSCRIBE
  // ===================================

  subscribe(

    email: string,

    callback: any

  ): void {

    if (!this.stompClient) {
      return;
    }

    this.stompClient.subscribe(

      '/topic/messages/' + email,

      (message) => {

        callback(

          JSON.parse(
            message.body
          )
        );
      }
    );
  }

  // ===================================
  // INBOX SUBSCRIBE
  // ===================================

  subscribeInbox(

    email: string,

    callback: any

  ): void {

    if (!this.stompClient) {
      return;
    }

    this.stompClient.subscribe(

      '/topic/messages/' + email,

      (message) => {

        callback(

          JSON.parse(
            message.body
          )
        );
      }
    );
  }

  // ===================================
  // NOTIFICATION SUBSCRIBE
  // ===================================

  subscribeNotifications(

    email: string,

    callback: any

  ): void {

    if (!this.stompClient) {
      return;
    }

    this.stompClient.subscribe(

      '/topic/notifications/' + email,

      (message) => {

        callback(

          JSON.parse(
            message.body
          )
        );
      }
    );
  }

  // ===================================
  // SEND MESSAGE
  // ===================================

  sendMessage(message: any): void {

    // CHECK CONNECTION

    if (

      !this.stompClient
      ||
      !this.connected

    ) {

      console.log(
        'NO ACTIVE CONNECTION'
      );

      return;
    }

    // SEND

    this.stompClient.publish({

      destination: '/app/chat',

      body: JSON.stringify(
        message
      )
    });
  }

  // ===================================
  // DISCONNECT
  // ===================================

  disconnect(): void {

    if (this.stompClient) {

      this.stompClient.deactivate();

      this.connected = false;
    }
  }
}