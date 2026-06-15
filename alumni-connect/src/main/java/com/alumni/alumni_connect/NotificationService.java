package com.alumni.alumni_connect;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service

public class NotificationService {

    private final NotificationRepository repository;

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(

            NotificationRepository repository,

            SimpMessagingTemplate messagingTemplate

    ) {

        this.repository = repository;

        this.messagingTemplate =
                messagingTemplate;
    }

    // =====================================
    // CREATE NOTIFICATION
    // =====================================

    public void sendNotification(

            String email,

            String message,

            String type,

            String linkUrl

    ) {

        Notification notification =
                new Notification();

        notification.setEmail(email);

        notification.setMessage(message);

        notification.setType(type);

        notification.setLinkUrl(linkUrl);

        notification.setTimestamp(
                LocalDateTime.now()
        );

        // SAVE DATABASE

        Notification saved =
                repository.save(notification);

        // REALTIME WEBSOCKET

        messagingTemplate.convertAndSend(

                "/topic/notifications/" + email,

                saved
        );

        System.out.println(

                "NOTIFICATION SENT TO: "
                        + email
        );
    }
}