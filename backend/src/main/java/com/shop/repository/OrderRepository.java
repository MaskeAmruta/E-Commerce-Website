package com.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.modul.Order;
import com.shop.modul.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUser(User user);

	
}
