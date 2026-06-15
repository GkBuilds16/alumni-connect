package com.alumni.alumni_connect;

import org.springframework.context.annotation.Configuration;

import org.springframework.messaging.simp.config.MessageBrokerRegistry;

import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration

@EnableWebSocketMessageBroker

public class WebSocketConfig
        implements WebSocketMessageBrokerConfigurer {

    @Override

    public void configureMessageBroker(

            MessageBrokerRegistry registry

    ) {

        // WHERE CLIENT SUBSCRIBES

        registry.enableSimpleBroker(
                "/topic"
        );

        // WHERE CLIENT SENDS

        registry.setApplicationDestinationPrefixes(
                "/app"
        );
    }

    @Override

    public void registerStompEndpoints(

            StompEndpointRegistry registry

    ) {

        registry

                .addEndpoint("/chat")

                .setAllowedOriginPatterns("*")

                .withSockJS();
    }
}