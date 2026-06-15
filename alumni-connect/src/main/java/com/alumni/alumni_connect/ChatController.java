package com.alumni.alumni_connect;

import org.springframework.messaging.handler.annotation.MessageMapping;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:4200")

public class ChatController {

    private final MessageRepository repository;

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(

            MessageRepository repository,

            SimpMessagingTemplate messagingTemplate

    ) {

        this.repository = repository;

        this.messagingTemplate = messagingTemplate;
    }

    // =========================================
    // SEND MESSAGE
    // =========================================

    @MessageMapping("/send")

    public void sendMessage(Message message) {

        // SAVE MESSAGE

        Message saved =

                repository.save(message);

        // =====================================
        // SEND TO RECEIVER
        // =====================================

        messagingTemplate.convertAndSend(

                "/topic/messages/"
                        + saved.getReceiverEmail(),

                saved
        );

        // =====================================
        // SEND BACK TO SENDER
        // =====================================

        messagingTemplate.convertAndSend(

                "/topic/messages/"
                        + saved.getSenderEmail(),

                saved
        );

        System.out.println(
                "MESSAGE SENT: "
                        + saved.getContent()
        );
    }

    // =========================================
    // GET CONVERSATION
    // =========================================

    @GetMapping("/messages")

    public List<Message> getMessages(

            @RequestParam String sender,

            @RequestParam String receiver

    ) {

        return repository.findConversation(
                sender,
                receiver
        );
    }
    @GetMapping("/all-messages/{email}")

    public List<Message> getAllMessages(

            @PathVariable String email
    ) {

        return repository.findAllMessages(
                email
        );
    }
}