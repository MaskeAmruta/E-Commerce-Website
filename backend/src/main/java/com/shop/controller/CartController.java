package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.modul.CartItems;
import com.shop.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins="*")
public class CartController {
	
	@Autowired
	private CartService service;

	//Add To Cart
	@PostMapping("/add")
	public String addToCart(@RequestParam Long userId,
							@RequestParam Long productId,
							@RequestParam int quentity) {
		
		return service.addToCart(userId, productId, quentity);
	}
	
	//View Cart
	@GetMapping("/{userId}")
	public List<CartItems>getCart(@PathVariable Long userId){
		return service.getCartItems(userId);
		
	}
	
	//Remove Items
	@DeleteMapping("/{itemId}")
	public String removeItem(@PathVariable Long itemId) {
		return service.removeItem(itemId);
	}
}
