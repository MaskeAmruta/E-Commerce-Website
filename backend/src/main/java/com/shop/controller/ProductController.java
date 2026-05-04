package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.modul.Product;
import com.shop.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private ProductService service;
	
	@GetMapping
	public List<Product> getProducts(){
		return service.getAllProducts();
	}
	
//	@PostMapping
//	public Product addProduct(@RequestBody Product product) {
////		System.out.println(product);
//		return service.addProduct(product);	
//	}
	
}
