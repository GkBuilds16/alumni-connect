package com.alumni.alumni_connect;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")

public class Notification {

    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )

    private Long id;

    private String email;

    @Column(length = 1000)

    private String message;

    private boolean isRead = false;

    private String type;

    private String linkUrl;

    private LocalDateTime timestamp;

    public Notification() {}

    // =====================================
    // GETTERS & SETTERS
    // =====================================

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message
    ) {
        this.message = message;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(
            boolean read
    ) {
        isRead = read;
    }

    public String getType() {
        return type;
    }

    public void setType(
            String type
    ) {
        this.type = type;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(
            String linkUrl
    ) {
        this.linkUrl = linkUrl;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(
            LocalDateTime timestamp
    ) {
        this.timestamp = timestamp;
    }
}