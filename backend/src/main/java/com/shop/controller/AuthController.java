package com.shop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.modul.User;
import com.shop.repository.UserRepository;
import com.shop.service.UserService;
import com.shop.util.JwtUtil;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
    private	JwtUtil jwtUtil;
	
	@PostMapping("/register")
	public Map<String, Object> register(@RequestBody User user) {
		return service.register(user);
	}
	
	@PostMapping("/login")
	public Map<String, String> login(@RequestBody User user){
		User existing = userRepo.findByEmail(user.getEmail())
				.orElseThrow(()-> new RuntimeException("User not found"));
		
		if(! existing.getPassword().equals(user.getPassword())){
			throw new RuntimeException("Invalid credentials");
		}
		
		String token = jwtUtil.generateToken(existing.getEmail(), existing.getRole());
		
		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		response.put("userId", existing.getId().toString());
		response.put("role" ,existing.getRole());
		
		return response;
	}
	
	
	

}
