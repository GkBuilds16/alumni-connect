package com.alumni.alumni_connect;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.Map;

import java.util.Random;

import java.util.concurrent.ConcurrentHashMap;

@Service

public class OtpService {

    // =====================================
    // OTP STORAGE
    // =====================================

    private final Map<String, String>
            otpStorage =
            new ConcurrentHashMap<>();

    private final Map<String, LocalDateTime>
            otpExpiry =
            new ConcurrentHashMap<>();

    // =====================================
    // GENERATE OTP
    // =====================================

    public String generateOtp(

            String email

    ) {

        Random random =
                new Random();

        int number =

                100000
                        + random.nextInt(900000);

        String otp =
                String.valueOf(number);

        // STORE OTP

        otpStorage.put(

                email,

                otp
        );

        // EXPIRY = 5 MINUTES

        otpExpiry.put(

                email,

                LocalDateTime.now()
                        .plusMinutes(5)
        );

        System.out.println(

                "OTP GENERATED FOR "
                        + email
                        + ": "
                        + otp
        );

        return otp;
    }

    // =====================================
    // VERIFY OTP
    // =====================================

    public boolean verifyOtp(

            String email,

            String otp

    ) {

        // CHECK EXISTS

        if (

                !otpStorage.containsKey(email)

        ) {

            return false;
        }

        // CHECK EXPIRY

        LocalDateTime expiry =

                otpExpiry.get(email);

        if (

                expiry.isBefore(
                        LocalDateTime.now()
                )

        ) {

            otpStorage.remove(email);

            otpExpiry.remove(email);

            return false;
        }

        // VERIFY MATCH

        String storedOtp =

                otpStorage.get(email);

        boolean valid =

                storedOtp.equals(otp);

        // REMOVE AFTER SUCCESS

        if (valid) {

            otpStorage.remove(email);

            otpExpiry.remove(email);
        }

        return valid;
    }
}