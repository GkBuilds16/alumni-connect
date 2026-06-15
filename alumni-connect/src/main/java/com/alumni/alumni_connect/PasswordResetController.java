package com.alumni.alumni_connect;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(
        origins = "http://localhost:4200"
)

public class PasswordResetController {

    // =====================================
    // DEPENDENCIES
    // =====================================

    private final UserRepository
            userRepository;

    private final OtpService
            otpService;

    private final EmailService
            emailService;

    private final PasswordEncoder
            passwordEncoder;

    // =====================================
    // CONSTRUCTOR
    // =====================================

    public PasswordResetController(

            UserRepository userRepository,

            OtpService otpService,

            EmailService emailService,

            PasswordEncoder passwordEncoder

    ) {

        this.userRepository =
                userRepository;

        this.otpService =
                otpService;

        this.emailService =
                emailService;

        this.passwordEncoder =
                passwordEncoder;
    }

    // =====================================
    // SEND OTP
    // =====================================

    @PostMapping(
            "/forgot-password"
    )

    public String forgotPassword(

            @RequestBody
            ForgotPasswordRequest request

    ) {

        // CHECK USER

        User user =

                userRepository.findByEmail(

                        request.getEmail()

                ).orElse(null);

        // USER NOT FOUND

        if (user == null) {

            return "User not found";
        }

        // GENERATE OTP

        String otp =

                otpService.generateOtp(

                        request.getEmail()
                );

        // SEND EMAIL

        emailService.sendOtpEmail(

                request.getEmail(),

                otp
        );

        System.out.println(

                "OTP SENT TO: "
                        + request.getEmail()
        );

        return "OTP sent successfully";
    }

    // =====================================
    // VERIFY OTP
    // =====================================

    @PostMapping(
            "/verify-otp"
    )

    public String verifyOtp(

            @RequestBody
            VerifyOtpRequest request

    ) {

        boolean valid =

                otpService.verifyOtp(

                        request.getEmail(),

                        request.getOtp()
                );

        // INVALID OTP

        if (!valid) {

            return "Invalid or expired OTP";
        }

        return "OTP verified";
    }

    // =====================================
    // RESET PASSWORD
    // =====================================

    @PostMapping(
            "/reset-password"
    )

    public String resetPassword(

            @RequestBody
            ResetPasswordRequest request

    ) {

        // FIND USER

        User user =

                userRepository.findByEmail(

                        request.getEmail()

                ).orElse(null);

        // USER NOT FOUND

        if (user == null) {

            return "User not found";
        }

        // ENCODE PASSWORD

        user.setPassword(

                passwordEncoder.encode(

                        request.getNewPassword()
                )
        );

        // SAVE USER

        userRepository.save(user);

        System.out.println(

                "PASSWORD RESET SUCCESS: "
                        + request.getEmail()
        );

        return "Password reset successful";
    }
}