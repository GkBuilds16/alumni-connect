package com.alumni.alumni_connect;

public class ResetPasswordRequest {

    private String email;

    private String newPassword;

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
    // GET PASSWORD
    // =====================================

    public String getNewPassword() {

        return newPassword;
    }

    // =====================================
    // SET PASSWORD
    // =====================================

    public void setNewPassword(

            String newPassword

    ) {

        this.newPassword = newPassword;
    }
}