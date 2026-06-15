package com.alumni.alumni_connect;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import java.util.List;

import java.util.Map;

import java.util.Optional;

@RestController

@CrossOrigin(origins = "http://localhost:4200")

public class EventController {

    // =====================================
    // REPOSITORIES
    // =====================================

    private final EventRepository
            eventRepository;

    private final EventRegistrationRepository
            registrationRepository;

    private final EmailService
            emailService;

    // =====================================
    // CONSTRUCTOR
    // =====================================

    public EventController(

            EventRepository eventRepository,

            EventRegistrationRepository registrationRepository,

            EmailService emailService

    ) {

        this.eventRepository =
                eventRepository;

        this.registrationRepository =
                registrationRepository;

        this.emailService =
                emailService;
    }

    // =====================================
    // CREATE EVENT
    // =====================================

    @PostMapping("/events")

    public Event createEvent(

            @RequestBody Event event

    ) {

        // CREATED TIME

        event.setCreatedAt(
                LocalDateTime.now()
        );

        // APPROVAL WORKFLOW

        if (

                event.getRole() != null

                        &&

                        event.getRole()
                                .toUpperCase()
                                .contains("ADMIN")

        ) {

            // ADMIN EVENTS AUTO APPROVED

            event.setStatus(
                    "APPROVED"
            );

        }

        else {

            // ALUMNI EVENTS REQUIRE APPROVAL

            event.setStatus(
                    "PENDING"
            );
        }

        // INITIAL RSVP COUNT

        event.setAttendeeCount(0);

        return eventRepository.save(
                event
        );
    }

    // =====================================
    // STUDENT EVENTS
    // ONLY APPROVED EVENTS
    // =====================================

    @GetMapping("/events")

    public List<Event> getApprovedEvents() {

        return eventRepository
                .findByStatusOrderByCreatedAtDesc(
                        "APPROVED"
                );
    }

    // =====================================
    // ADMIN EVENT PANEL
    // VIEW ALL EVENTS
    // =====================================

    @GetMapping("/events/all")

    public List<Event> getAllEvents() {

        return eventRepository
                .findAllByOrderByCreatedAtDesc();
    }

    // =====================================
    // APPROVE EVENT
    // =====================================

    @PutMapping("/events/approve/{id}")

    public Event approveEvent(

            @PathVariable Long id

    ) {

        Optional<Event> optionalEvent =

                eventRepository.findById(id);

        if (

                optionalEvent.isEmpty()

        ) {

            throw new RuntimeException(
                    "Event not found"
            );
        }

        Event event =
                optionalEvent.get();

        event.setStatus(
                "APPROVED"
        );

        return eventRepository.save(
                event
        );
    }

    // =====================================
    // REJECT EVENT
    // =====================================

    @PutMapping("/events/reject/{id}")

    public Event rejectEvent(

            @PathVariable Long id

    ) {

        Optional<Event> optionalEvent =

                eventRepository.findById(id);

        if (

                optionalEvent.isEmpty()

        ) {

            throw new RuntimeException(
                    "Event not found"
            );
        }

        Event event =
                optionalEvent.get();

        event.setStatus(
                "REJECTED"
        );

        return eventRepository.save(
                event
        );
    }

    // =====================================
    // REGISTER FOR EVENT
    // =====================================

    @PostMapping("/events/register")

    public ResponseEntity<?> registerForEvent(

            @RequestParam Long eventId,

            @RequestParam String studentEmail

    ) {

        // CHECK DUPLICATE

        boolean alreadyRegistered =

                registrationRepository

                        .existsByEventIdAndStudentEmail(

                                eventId,

                                studentEmail
                        );

        if (alreadyRegistered) {

            return ResponseEntity.ok(

                    Map.of(

                            "message",
                            "Already registered"
                    )
            );
        }

        // CREATE REGISTRATION

        EventRegistration registration =

                new EventRegistration();

        registration.setEventId(
                eventId
        );

        registration.setStudentEmail(
                studentEmail
        );

        registration.setRegisteredAt(
                LocalDateTime.now()
        );

        registrationRepository.save(
                registration
        );

        // UPDATE RSVP COUNT

        Optional<Event> optionalEvent =

                eventRepository.findById(
                        eventId
                );

        if (

                optionalEvent.isPresent()

        ) {

            Event event =
                    optionalEvent.get();

            event.setAttendeeCount(

                    event.getAttendeeCount()
                            + 1
            );

            eventRepository.save(
                    event
            );

            // =====================================
            // SEND EMAIL
            // =====================================

            emailService.sendEventRegistrationEmail(

                    studentEmail,

                    event.getTitle(),

                    event.getEventDate()
                            .toString(),

                    event.getLocation(),

                    event.getMeetingLink()
            );
        }

        return ResponseEntity.ok(

                Map.of(

                        "message",
                        "Registered successfully"
                )
        );
    }

    // =====================================
    // CANCEL REGISTRATION
    // =====================================

    @DeleteMapping("/events/register")

    public ResponseEntity<?> cancelRegistration(

            @RequestParam Long eventId,

            @RequestParam String studentEmail

    ) {

        registrationRepository

                .deleteByEventIdAndStudentEmail(

                        eventId,

                        studentEmail
                );

        // UPDATE RSVP COUNT

        Optional<Event> optionalEvent =

                eventRepository.findById(
                        eventId
                );

        if (

                optionalEvent.isPresent()

        ) {

            Event event =
                    optionalEvent.get();

            if (

                    event.getAttendeeCount()
                            > 0

            ) {

                event.setAttendeeCount(

                        event.getAttendeeCount()
                                - 1
                );

                eventRepository.save(
                        event
                );
            }
        }

        return ResponseEntity.ok(

                Map.of(

                        "message",
                        "Registration cancelled"
                )
        );
    }

    // =====================================
    // EVENT ATTENDEES
    // =====================================

    @GetMapping("/events/attendees/{eventId}")

    public List<EventRegistration>
    getAttendees(

            @PathVariable Long eventId

    ) {

        return registrationRepository

                .findByEventId(
                        eventId
                );
    }
}