package com.shop.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET ="amruta-ecommerce-secret-key-2026-secure";
	
	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
		
	}
	
	public String generateToken(String email, String role) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role",role);
		
		return Jwts.builder()
				.setClaims(claims)
			   .setSubject(email)
			   .setIssuedAt(new Date())
			   .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 ))
			   .signWith(getSigningKey(), SignatureAlgorithm.HS256)
			   .compact();
		}
			   
	public String extractEmail(String token) {
		return getClaims(token).getSubject();
	}
	
	public String extrctRole(String token) {
		return getClaims(token).get("role", String.class);
	}
	
	public Claims getClaims(String toek) {
		return Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(toek)
				.getBody();
	}
	
}
