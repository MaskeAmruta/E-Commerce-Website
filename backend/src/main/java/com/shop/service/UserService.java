package com.shop.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.modul.User;
import com.shop.repository.UserRepository;
import com.shop.util.JwtUtil;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public Map<String, Object> register(User user) {

	    Optional<User> existing = repo.findByEmail(user.getEmail());

	    Map<String, Object> response = new HashMap<>();

	    if (existing.isPresent()) {
	        response.put("message", "Email already registered !");
	        return response;
	    }

	    // ✅ force USER role (secure)
	    user.setRole("USER");

	    User savedUser = repo.save(user);

	    // ✅ generate JWT token
	    String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole());

	    // ✅ return login-like response
	    response.put("message", "User Registered Successfully");
	    response.put("token", token);
	    response.put("role", savedUser.getRole());
	    response.put("email", savedUser.getEmail());

	    return response;
	}
	
	public String login(String email, String password) {
		Optional<User> user = repo.findByEmail(email);
		
		if(user.isEmpty()) {
			return "User Not Found !";
		}
		
		if(!user.get().getPassword().equals(password)) {
			return "Invalid Password"; 
		}
		return "Login Sucessfully...";
		
	} 
	

}
