package com.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.modul.Cart;
import com.shop.modul.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

	Cart findByUser(User user);
}
