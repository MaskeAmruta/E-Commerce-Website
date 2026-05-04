package com.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.modul.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	 List<Product> findByActiveTrue(); 
}
