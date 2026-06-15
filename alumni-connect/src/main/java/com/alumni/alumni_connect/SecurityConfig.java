package com.alumni.alumni_connect;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

@Configuration

public class SecurityConfig {

    @Bean

    public SecurityFilterChain filterChain(

            HttpSecurity http

    ) throws Exception {

        http

                // =====================================
                // DISABLE CSRF
                // =====================================

                .csrf(csrf -> csrf.disable())

                // =====================================
                // ENABLE CORS
                // =====================================

                .cors(cors -> {})

                // =====================================
                // STATELESS SESSION
                // =====================================

                .sessionManagement(session ->

                        session.sessionCreationPolicy(

                                SessionCreationPolicy.STATELESS
                        )
                )

                // =====================================
                // AUTHORIZATION
                // =====================================

                .authorizeHttpRequests(auth -> auth

                        // =================================
                        // PUBLIC ROUTES
                        // =================================

                        .requestMatchers(

                                "/",

                                "/login",

                                "/signup",

                                "/forgot-password",

                                "/verify-otp",

                                "/reset-password"

                        ).permitAll()

                        // =================================
                        // EVENTS
                        // =================================

                        .requestMatchers(

                                "/events",

                                "/events/**"

                        ).permitAll()

                        // =================================
                        // CHAT + WEBSOCKET
                        // =================================

                        .requestMatchers(

                                "/chat/**",

                                "/messages/**",

                                "/conversations/**",

                                "/topic/**",

                                "/app/**",

                                "/ws/**"

                        ).permitAll()

                        // =================================
                        // USERS + STUDENTS
                        // =================================

                      .requestMatchers(

    "/users/**",

    "/students",

    "/students/**",

    "/notifications/**",

    "/approve/**"

).permitAll()

                        // =================================
                        // H2 CONSOLE
                        // =================================

                        .requestMatchers(

                                "/h2-console/**"

                        ).permitAll()

                        // =================================
                        // OPTIONS REQUESTS
                        // =================================

                        .requestMatchers(

                                HttpMethod.OPTIONS,

                                "/**"

                        ).permitAll()

                        // =================================
                        // EVERYTHING ELSE
                        // =================================

                        .anyRequest().authenticated()
                );

        // =====================================
        // H2 CONSOLE FIX
        // =====================================

        http.headers(headers ->

                headers.frameOptions(

                        frame -> frame.disable()
                )
        );

        return http.build();
    }
}