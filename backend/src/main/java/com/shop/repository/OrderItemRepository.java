package com.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.modul.OrderItem;

public interface OrderItemRepository  extends JpaRepository<OrderItem, Long>{

}
