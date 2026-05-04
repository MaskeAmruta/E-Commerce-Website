package com.shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.modul.Cart;
import com.shop.modul.CartItems;
import com.shop.modul.Product;

public interface CartItemRepository extends JpaRepository<CartItems, Long>{
	List<CartItems>findByCart(Cart cart);
	
	Optional<CartItems> findByCartAndProduct(Cart cart, Product product);
}
