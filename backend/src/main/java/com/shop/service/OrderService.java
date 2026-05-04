package com.shop.service;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.modul.Cart;
import com.shop.modul.CartItems;
import com.shop.modul.Order;
import com.shop.modul.OrderItem;
import com.shop.modul.Product;
import com.shop.modul.User;
import com.shop.repository.CartItemRepository;
import com.shop.repository.CartRepository;
import com.shop.repository.OrderItemRepository;
import com.shop.repository.OrderRepository;
import com.shop.repository.UserRepository;

@Service
public class OrderService {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private CartItemRepository itemRepo;
	
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private OrderItemRepository orderItemRepo;
	
	@Autowired
	private UserRepository userRepo;

//-------------------------place order-------------------------------------------------
	public String placeOrder(Long userId) {
		User user = userRepo.findById(userId)
				.orElseThrow(()->new RuntimeException("User not found."));
		
		Cart cart = cartRepo.findByUser(user);
		if(cart == null) {
			return "Cart is empty.";
		}
		
		List<CartItems> cartItems = itemRepo.findByCart(cart);

		if(cartItems == null) {
			return " No item added into cart";
		}
		
		//Create Order
		Order order = new Order();
		order.setUser(user);
		order.setStatus("CREATED");
		
		double total = 0;
		order  =orderRepo.save(order);
		
		
//----------------convert CartItem into Order-----------------------
		for(CartItems cartItem : cartItems) {
			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuentity());
			
			double price = cartItem.getProduct().getPrice();
			total +=price * cartItem.getQuentity();
			
			orderItemRepo.save(orderItem);
		}
		
//--------------Update total amount ---------------------------
		order.setTotalAmount(total);
		orderRepo.save(order);
		
//---------------------------------Clear cart -------------------------
		itemRepo.deleteAll(cartItems);
		return "Order placed successfully";
	}
	
//------------------------get User Orders --------------------------------------------
		public List<Order>getUserOrders(Long userId){
			User user = userRepo.findById(userId)
			.orElseThrow(()-> new RuntimeException("User not found."));
			return orderRepo.findByUser(user);			
				
	}
		
//-----------------------Admin can Get All Orders--------------------------
		public List<Order>getAllOrders(){
			return orderRepo.findAll();
		}
	
		//Admin canupdate order status
		
		public Order updteOrderStatus(Long orderId, String status) {
			Order order = orderRepo.findById(orderId).orElseThrow(()-> new RuntimeException("Order not found"));
			
			order.setStatus(status);
			return orderRepo.save(order);
		}
		
}


















