package com.alumni.alumni_connect;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

@Table(name = "event_registrations")

public class EventRegistration {

    // =====================================
    // ID
    // =====================================

    @Id

    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )

    private Long id;

    // =====================================
    // EVENT ID
    // =====================================

    private Long eventId;

    // =====================================
    // STUDENT EMAIL
    // =====================================

    private String studentEmail;

    // =====================================
    // REGISTERED TIME
    // =====================================

    private LocalDateTime registeredAt;

    // =====================================
    // GETTERS + SETTERS
    // =====================================

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    // =====================================
    // EVENT ID
    // =====================================

    public Long getEventId() {

        return eventId;
    }

    public void setEventId(Long eventId) {

        this.eventId = eventId;
    }

    // =====================================
    // STUDENT EMAIL
    // =====================================

    public String getStudentEmail() {

        return studentEmail;
    }

    public void setStudentEmail(

            String studentEmail

    ) {

        this.studentEmail =
                studentEmail;
    }

    // =====================================
    // REGISTERED AT
    // =====================================

    public LocalDateTime getRegisteredAt() {

        return registeredAt;
    }

    public void setRegisteredAt(

            LocalDateTime registeredAt

    ) {

        this.registeredAt =
                registeredAt;
    }
}