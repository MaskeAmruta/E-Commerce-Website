package com.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.modul.Cart;
import com.shop.modul.CartItems;
import com.shop.modul.Product;
import com.shop.modul.User;
import com.shop.repository.CartItemRepository;
import com.shop.repository.CartRepository;
import com.shop.repository.ProductRepository;
import com.shop.repository.UserRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private CartItemRepository itemsRepo;
	
	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private UserRepository userRepo; 
	
	
	//Get or Create Cart
	public Cart getCart(Long userId) {
		 User user = userRepo.findById(userId)
				 .orElseThrow(() -> new RuntimeException("User Not found") );
		 
		 Cart cart = cartRepo.findByUser(user);
		 
		 if(cart == null) {
			 cart = new Cart();
			 cart.setUser(user);
			 cartRepo.save(cart);
		 }
		
		return cart;	
	}
	
	//Add Items To Cart
	public String addToCart(Long userId, Long productId, int qty ) {
		
		Cart cart = getCart(userId);
		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product Not found."));
		
		
		//Check if Product already existing in cart
		Optional<CartItems> existingItem = itemsRepo.findByCartAndProduct(cart, product);
		
		if(existingItem.isPresent()) {
			CartItems item =existingItem.get();
			
			item.setQuentity(item.getQuentity() + qty);
			itemsRepo.save(item);
		}else {
			CartItems item = new CartItems();
			
			item.setCart(cart);
			item.setProduct(product);
			item.setQuentity(qty);
			
			itemsRepo.save(item);
		}
		
		return "Product added to Cart" ;
	}
	
	//View or get Items
	public List<CartItems> getCartItems(Long userId){
		Cart cart = getCart(userId);
		return itemsRepo.findByCart(cart);	
	}
	
	
	//Remove Items
	public String removeItem(Long itemId) {
		itemsRepo.deleteById(itemId);
		return "Item Removed" ;
	}
	
	
	
}
