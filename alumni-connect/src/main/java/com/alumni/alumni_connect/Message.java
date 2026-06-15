package com.alumni.alumni_connect;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")

public class Message {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String senderEmail;

    private String receiverEmail;

    @Column(length = 2000)

    private String content;

    private LocalDateTime timestamp;

    public Message() {}

    public Message(

            String senderEmail,

            String receiverEmail,

            String content,

            LocalDateTime timestamp

    ) {

        this.senderEmail = senderEmail;

        this.receiverEmail = receiverEmail;

        this.content = content;

        this.timestamp = timestamp;
    }

    // ID

    public Long getId() {
        return id;
    }

    // SENDER

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    // RECEIVER

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    // CONTENT

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // TIMESTAMP

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}