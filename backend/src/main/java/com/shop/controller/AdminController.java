package com.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.modul.Order;
import com.shop.modul.Product;
import com.shop.service.OrderService;
import com.shop.service.ProductService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins ="*")
public class AdminController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private OrderService orderService;
	
	
	//Get all product activ and  inactive status for admin
	@GetMapping("/products")
	public List<Product> getAllProductForAdmin(){
		return productService.findAll();
	}
	
	//Add Product
	@PostMapping("/product")
	public Product addProduct(@RequestBody Product product) {
		return productService.addProduct(product);
	}
	
	//Update product
	
	@PutMapping("/product/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody Product product ) {
		return productService.updateProduct(id, product);
		
	}
	
	//delete Product
	@DeleteMapping("/product/{id}")
	public String deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return "Product Deleted";
	}
	
	//Admin can view all orders
	
	@GetMapping("/orders")
	public List<Order> getAllOrders(){
		return orderService.getAllOrders();	
	}
	
	//update order status
	
	@PutMapping("/orders/{id}")
	public Order updateOrderStatus(@PathVariable Long id, @PathVariable String status) {
		return orderService.updteOrderStatus(id, status);
		
		
	}
	
}
