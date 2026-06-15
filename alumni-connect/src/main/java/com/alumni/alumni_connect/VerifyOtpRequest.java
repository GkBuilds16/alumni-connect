package com.alumni.alumni_connect;

public class VerifyOtpRequest {

    private String email;

    private String otp;

    // =====================================
    // GET EMAIL
    // =====================================

    public String getEmail() {

        return email;
    }

    // =====================================
    // SET EMAIL
    // =====================================

    public void setEmail(

            String email

    ) {

        this.email = email;
    }

    // =====================================
    // GET OTP
    // =====================================

    public String getOtp() {

        return otp;
    }

    // =====================================
    // SET OTP
    // =====================================

    public void setOtp(

            String otp

    ) {

        this.otp = otp;
    }
}