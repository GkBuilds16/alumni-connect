package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository
        extends JpaRepository<Message, Long> {

    // =========================================
    // GET CONVERSATION BETWEEN 2 USERS
    // =========================================

    @Query("""

        SELECT m FROM Message m

        WHERE

        (
            m.senderEmail = :sender
            AND
            m.receiverEmail = :receiver
        )

        OR

        (
            m.senderEmail = :receiver
            AND
            m.receiverEmail = :sender
        )

        ORDER BY m.id ASC

    """)

    List<Message> findConversation(

            @Param("sender")
            String sender,

            @Param("receiver")
            String receiver
    );

    // =========================================
    // GET ALL MESSAGES OF USER
    // =========================================

    @Query("""

        SELECT m FROM Message m

        WHERE

        m.senderEmail = :email

        OR

        m.receiverEmail = :email

        ORDER BY m.id DESC

    """)

    List<Message> findAllMessages(

            @Param("email")
            String email
    );
    @Query("""

    SELECT m

    FROM Message m

    WHERE

    m.senderEmail = :email

    OR

    m.receiverEmail = :email

    ORDER BY m.id DESC

""")

    List<Message> findInboxMessages(

            @Param("email")
            String email
    );
}