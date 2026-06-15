package com.alumni.alumni_connect;

import jakarta.servlet.Filter;

import jakarta.servlet.FilterChain;

import jakarta.servlet.ServletException;

import jakarta.servlet.ServletRequest;

import jakarta.servlet.ServletResponse;

import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import java.io.IOException;

import java.util.List;

@Component

public class JwtFilter implements Filter {

    @Override

    public void doFilter(

            ServletRequest request,

            ServletResponse response,

            FilterChain chain

    ) throws IOException, ServletException {

        HttpServletRequest req =

                (HttpServletRequest) request;

        HttpServletResponse res =

                (HttpServletResponse) response;

        String path =

                req.getRequestURI();

        // =====================================
        // DEBUG
        // =====================================

        System.out.println(
                "REQUEST PATH: " + path
        );

        // =====================================
        // PUBLIC ROUTES
        // =====================================

        if (

                path.equals("/")

                        ||

                        path.equals("/login")

                        ||

                        path.equals("/signup")

                        ||

                        path.equals("/forgot-password")

                        ||

                        path.equals("/verify-otp")

                        ||

                        path.equals("/reset-password")

                        ||

                        // =================================
                        // EVENTS
                        // =================================

                        path.startsWith("/events")

                        ||

                        // =================================
                        // NOTIFICATIONS
                        // =================================

                        path.startsWith("/notifications")

                        ||

                        // =================================
                        // STUDENTS
                        // =================================

                        path.startsWith("/students")

                        ||

                        // =================================
                        // CHAT + WEBSOCKET
                        // =================================

                        path.startsWith("/chat")

                        ||

                        path.startsWith("/topic")

                        ||

                        path.startsWith("/app")

                        ||

                        path.startsWith("/ws")

                        ||

                        // =================================
                        // USERS
                        // =================================

                        path.startsWith("/users")

                        ||

                        // =================================
                        // MESSAGES
                        // =================================

                        path.startsWith("/messages")

                        ||

                        path.startsWith("/conversations")

                        ||

                        // =================================
                        // H2 CONSOLE
                        // =================================

                        path.startsWith("/h2-console")

        ) {

            chain.doFilter(
                    request,
                    response
            );

            return;
        }

        // =====================================
        // AUTH HEADER
        // =====================================

        String authHeader =

                req.getHeader(
                        "Authorization"
                );

        System.out.println(
                "AUTH HEADER: "
                        + authHeader
        );

        // =====================================
        // TOKEN MISSING
        // =====================================

        if (

                authHeader == null

                        ||

                        !authHeader.startsWith(
                                "Bearer "
                        )

        ) {

            System.out.println(
                    "JWT TOKEN MISSING"
            );

            res.setStatus(

                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            res.getWriter().write(

                    "Unauthorized: Token Missing"
            );

            return;
        }

        // =====================================
        // EXTRACT TOKEN
        // =====================================

        String token =

                authHeader.substring(7);

        try {

            // =================================
            // EXTRACT EMAIL
            // =================================

            String email =

                    JwtUtil.extractEmail(
                            token
                    );

            // =================================
            // EXTRACT ROLE
            // =================================

            String role =

                    JwtUtil.extractRole(
                            token
                    );

            System.out.println(
                    "EMAIL: " + email
            );

            System.out.println(
                    "ROLE: " + role
            );

            // =================================
            // CREATE AUTH
            // =================================

            UsernamePasswordAuthenticationToken
                    authentication =

                    new UsernamePasswordAuthenticationToken(

                            email,

                            null,

                            List.of(

                                    new SimpleGrantedAuthority(

                                            "ROLE_" + role
                                    )
                            )
                    );

            // =================================
            // SET AUTH
            // =================================

            SecurityContextHolder

                    .getContext()

                    .setAuthentication(

                            authentication
                    );

        }

        catch (Exception e) {

            System.out.println(

                    "JWT ERROR: "
                            + e.getMessage()
            );

            res.setStatus(

                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );

            res.getWriter().write(

                    "Unauthorized: Invalid Token"
            );

            return;
        }

        // =====================================
        // CONTINUE
        // =====================================

        chain.doFilter(
                request,
                response
        );
    }
}