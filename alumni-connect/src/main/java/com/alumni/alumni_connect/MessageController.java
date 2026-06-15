package com.alumni.alumni_connect;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController

@CrossOrigin(
        origins = "http://localhost:4200"
)

public class MessageController {

    // =====================================
    // DEPENDENCIES
    // =====================================

    private final SimpMessagingTemplate
            messagingTemplate;

    private final MessageRepository
            repository;

    private final NotificationService
            notificationService;

    // =====================================
    // CONSTRUCTOR
    // =====================================

    public MessageController(

            SimpMessagingTemplate messagingTemplate,

            MessageRepository repository,

            NotificationService notificationService

    ) {

        this.messagingTemplate =
                messagingTemplate;

        this.repository =
                repository;

        this.notificationService =
                notificationService;
    }

    // =====================================
    // SEND MESSAGE
    // =====================================

    @MessageMapping("/chat")

    public void sendMessage(

            @Payload Message message

    ) {

        // SET TIMESTAMP

        message.setTimestamp(
                LocalDateTime.now()
        );

        // SAVE TO MYSQL

        Message saved =
                repository.save(message);

        // =================================
        // REALTIME CHAT
        // =================================

        // SEND TO RECEIVER

        messagingTemplate.convertAndSend(

                "/topic/messages/"
                        + message.getReceiverEmail(),

                saved
        );

        // SEND BACK TO SENDER

        messagingTemplate.convertAndSend(

                "/topic/messages/"
                        + message.getSenderEmail(),

                saved
        );

        // =================================
        // REALTIME NOTIFICATION
        // =================================

        notificationService.sendNotification(

                message.getReceiverEmail(),

                "New message from "
                        + message.getSenderEmail(),

                "MESSAGE",

                "/chat/"
                        + message.getSenderEmail()
        );

        System.out.println(

                "MESSAGE SENT: "
                        + message.getContent()
        );
    }

    // =====================================
    // GET CONVERSATION
    // =====================================

    @GetMapping(
            "/messages/conversation"
    )

    public List<Message> getConversation(

            @RequestParam String sender,

            @RequestParam String receiver

    ) {

        return repository.findConversation(

                sender,

                receiver
        );
    }

    // =====================================
    // GET INBOX CONVERSATIONS
    // =====================================

    @GetMapping(
            "/conversations/{email}"
    )

    public List<ConversationDTO>
    getConversations(

            @PathVariable String email

    ) {

        List<Message> messages =

                repository.findInboxMessages(
                        email
                );

        Map<String, ConversationDTO>
                map = new LinkedHashMap<>();

        for (Message msg : messages) {

            String otherUser;

            // DETERMINE OTHER USER

            if (

                    msg.getSenderEmail()
                            .equals(email)

            ) {

                otherUser =
                        msg.getReceiverEmail();

            }

            else {

                otherUser =
                        msg.getSenderEmail();
            }

            // ONLY LATEST MESSAGE

            if (

                    !map.containsKey(
                            otherUser
                    )

            ) {

                map.put(

                        otherUser,

                        new ConversationDTO(

                                otherUser,

                                msg.getContent(),

                                msg.getTimestamp()
                        )
                );
            }
        }

        return new ArrayList<>(
                map.values()
        );
    }
}