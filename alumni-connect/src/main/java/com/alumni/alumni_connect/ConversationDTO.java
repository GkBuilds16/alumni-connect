package com.alumni.alumni_connect;

import java.time.LocalDateTime;

public class ConversationDTO {

    private String email;

    private String latestMessage;

    private LocalDateTime timestamp;

    public ConversationDTO() {}

    public ConversationDTO(

            String email,

            String latestMessage,

            LocalDateTime timestamp

    ) {

        this.email = email;

        this.latestMessage = latestMessage;

        this.timestamp = timestamp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLatestMessage() {
        return latestMessage;
    }

    public void setLatestMessage(
            String latestMessage
    ) {
        this.latestMessage = latestMessage;
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