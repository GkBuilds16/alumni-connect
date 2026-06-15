package com.alumni.alumni_connect;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service

public class EmailService {

    // =====================================
    // MAIL SENDER
    // =====================================

    @Autowired

    private JavaMailSender mailSender;

    // =====================================
    // EVENT REGISTRATION EMAIL
    // =====================================

    public void sendEventRegistrationEmail(

            String to,

            String eventTitle,

            String eventDate,

            String location,

            String eventLink

    ) {

        try {

            SimpleMailMessage message =

                    new SimpleMailMessage();

            // =====================================
            // RECEIVER
            // =====================================

            message.setTo(to);

            // =====================================
            // SUBJECT
            // =====================================

            message.setSubject(

                    "🎉 Event Registration Successful"
            );

            // =====================================
            // EMAIL BODY
            // =====================================

            message.setText(

                    "Hello,\n\n"

                            +

                            "You have successfully registered for the event.\n\n"

                            +

                            "====================================\n"

                            +

                            "📌 Event Details\n"

                            +

                            "====================================\n\n"

                            +

                            "🎯 Event: "
                            + eventTitle + "\n\n"

                            +

                            "📅 Date: "
                            + eventDate + "\n\n"

                            +

                            "📍 Location: "
                            + location + "\n\n"

                            +

                            "🔗 Meeting Link:\n"
                            + eventLink + "\n\n"

                            +

                            "====================================\n\n"

                            +

                            "We look forward to seeing you there.\n\n"

                            +

                            "Thank you for using Alumni Connect 🚀"
            );

            // =====================================
            // SEND EMAIL
            // =====================================

            mailSender.send(message);

            System.out.println(

                    "EMAIL SENT TO: "
                            + to
            );

        }

        catch (Exception e) {

            System.out.println(

                    "EMAIL ERROR: "
                            + e.getMessage()
            );
        }
    }
    // =====================================
// OTP EMAIL
// =====================================

    public void sendOtpEmail(

            String to,

            String otp

    ) {

        try {

            SimpleMailMessage message =

                    new SimpleMailMessage();

            // =====================================
            // RECEIVER
            // =====================================

            message.setTo(to);

            // =====================================
            // SUBJECT
            // =====================================

            message.setSubject(

                    "OTP Verification"
            );

            // =====================================
            // EMAIL BODY
            // =====================================

            message.setText(

                    "Hello,\n\n"

                            +

                            "Your OTP for Alumni Connect is:\n\n"

                            +

                            otp

                            +

                            "\n\n"

                            +

                            "This OTP is valid for 10 minutes.\n\n"

                            +

                            "Do not share this OTP with anyone.\n\n"

                            +

                            "Thank you,\n"

                            +

                            "Alumni Connect Team"
            );

            // =====================================
            // SEND EMAIL
            // =====================================

            mailSender.send(message);

            System.out.println(

                    "OTP EMAIL SENT TO: "
                            + to
            );
        }

        catch (Exception e) {

            System.out.println(

                    "OTP EMAIL ERROR: "
                            + e.getMessage()
            );
        }
    }
}