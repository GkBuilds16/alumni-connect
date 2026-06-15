package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRegistrationRepository

        extends JpaRepository<
        EventRegistration,
        Long
        > {

    // =====================================
    // FIND BY EVENT
    // =====================================

    List<EventRegistration>

    findByEventId(Long eventId);

    // =====================================
    // CHECK EXISTING REGISTRATION
    // =====================================

    boolean existsByEventIdAndStudentEmail(

            Long eventId,

            String studentEmail
    );

    // =====================================
    // COUNT REGISTRATIONS
    // =====================================

    int countByEventId(

            Long eventId
    );

    // =====================================
    // DELETE REGISTRATION
    // =====================================

    void deleteByEventIdAndStudentEmail(

            Long eventId,

            String studentEmail
    );

    // =====================================
    // STUDENT EVENTS
    // =====================================

    List<EventRegistration>

    findByStudentEmail(

            String studentEmail
    );
}