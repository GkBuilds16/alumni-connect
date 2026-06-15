package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository

        extends JpaRepository<
        Event,
        Long
        > {

    // =====================================
    // ALL EVENTS
    // =====================================

    List<Event>

    findAllByOrderByCreatedAtDesc();

    // =====================================
    // APPROVED EVENTS
    // =====================================

    List<Event>

    findByStatusOrderByCreatedAtDesc(

            String status
    );

    // =====================================
    // PENDING EVENTS
    // =====================================

    List<Event>

    findByStatus(

            String status
    );

    // =====================================
    // CATEGORY FILTER
    // =====================================

    List<Event>

    findByCategory(

            String category
    );

    // =====================================
    // CREATOR EVENTS
    // =====================================

    List<Event>

    findByCreatedBy(

            String createdBy
    );
}