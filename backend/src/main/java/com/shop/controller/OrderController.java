package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.modul.Order;
import com.shop.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins="*")
public class OrderController {
	
	@Autowired
	private OrderService service;
	
	//Place Order 
	@PostMapping("/place")
	public String placeOrder(@RequestParam Long userId) {
		return service.placeOrder(userId);
	}
	
	
	//Get Orders
	public List<Order>getOrders(@PathVariable Long userId){
		return service.getUserOrders(userId);
	}
	
}
