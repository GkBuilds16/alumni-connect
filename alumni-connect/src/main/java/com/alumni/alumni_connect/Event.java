package com.alumni.alumni_connect;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

@Table(name = "events")

public class Event {

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
    // EVENT DETAILS
    // =====================================

    @Column(nullable = false)

    private String title;

    @Column(
            length = 5000
    )

    private String description;

    private String location;

    private String eventDate;

    // =====================================
    // CREATOR
    // =====================================

    private String createdBy;

    private String role;

    // =====================================
    // APPROVAL WORKFLOW
    // =====================================

    private String status =
            "PENDING";

    // =====================================
    // RSVP COUNT
    // =====================================

    private int attendeeCount = 0;

    // =====================================
    // OPTIONAL FEATURES
    // =====================================

    private String category;

    @Column(length = 2000)

    private String meetingLink;

    @Column(length = 3000)

    private String imageUrl;

    // =====================================
    // CREATED TIME
    // =====================================

    private LocalDateTime createdAt;

    // =====================================
    // CONSTRUCTOR
    // =====================================

    public Event() {
    }

    // =====================================
    // ID
    // =====================================

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    // =====================================
    // TITLE
    // =====================================

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    // =====================================
    // DESCRIPTION
    // =====================================

    public String getDescription() {

        return description;
    }

    public void setDescription(

            String description

    ) {

        this.description =
                description;
    }

    // =====================================
    // LOCATION
    // =====================================

    public String getLocation() {

        return location;
    }

    public void setLocation(

            String location

    ) {

        this.location =
                location;
    }

    // =====================================
    // EVENT DATE
    // =====================================

    public String getEventDate() {

        return eventDate;
    }

    public void setEventDate(

            String eventDate

    ) {

        this.eventDate =
                eventDate;
    }

    // =====================================
    // CREATED BY
    // =====================================

    public String getCreatedBy() {

        return createdBy;
    }

    public void setCreatedBy(

            String createdBy

    ) {

        this.createdBy =
                createdBy;
    }

    // =====================================
    // ROLE
    // =====================================

    public String getRole() {

        return role;
    }

    public void setRole(

            String role

    ) {

        this.role =
                role;
    }

    // =====================================
    // STATUS
    // =====================================

    public String getStatus() {

        return status;
    }

    public void setStatus(

            String status

    ) {

        this.status =
                status;
    }

    // =====================================
    // ATTENDEE COUNT
    // =====================================

    public int getAttendeeCount() {

        return attendeeCount;
    }

    public void setAttendeeCount(

            int attendeeCount

    ) {

        this.attendeeCount =
                attendeeCount;
    }

    // =====================================
    // CATEGORY
    // =====================================

    public String getCategory() {

        return category;
    }

    public void setCategory(

            String category

    ) {

        this.category =
                category;
    }

    // =====================================
    // MEETING LINK
    // =====================================

    public String getMeetingLink() {

        return meetingLink;
    }

    public void setMeetingLink(

            String meetingLink

    ) {

        this.meetingLink =
                meetingLink;
    }

    // =====================================
    // IMAGE URL
    // =====================================

    public String getImageUrl() {

        return imageUrl;
    }

    public void setImageUrl(

            String imageUrl

    ) {

        this.imageUrl =
                imageUrl;
    }

    // =====================================
    // CREATED AT
    // =====================================

    public LocalDateTime getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(

            LocalDateTime createdAt

    ) {

        this.createdAt =
                createdAt;
    }
}