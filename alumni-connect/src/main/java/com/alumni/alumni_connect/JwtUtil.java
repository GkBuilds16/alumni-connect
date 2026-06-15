package com.alumni.alumni_connect;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 🔐 SECRET KEY (must be at least 32 chars for HS256)
    private static final String SECRET = "mysecretkeymysecretkeymysecretkey12345";

    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ⏳ Token validity (1 hour)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    // 🔹 Generate JWT
    public static String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)   // 🔥 explicit algorithm
                .compact();
    }

    // 🔹 Validate token (throws exception if invalid)
    public static Claims validateToken(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 🔹 Extract email
    public static String extractEmail(String token) {
        return validateToken(token).getSubject();
    }

    // 🔹 Extract role
    public static String extractRole(String token) {
        return validateToken(token).get("role", String.class);
    }

    // 🔹 Check expiration
    public static boolean isTokenExpired(String token) {
        try {
            return validateToken(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    // 🔹 Safe validation (no crash)
    public static boolean isValidToken(String token) {
        try {
            validateToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}