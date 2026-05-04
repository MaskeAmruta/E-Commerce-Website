package com.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.modul.Product;
import com.shop.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repo;
	
	public List<Product> getAllProducts(){
		return repo.findByActiveTrue();	
	}
	
	
	// Admin can Add Product
	public Product addProduct(Product product) {
		return repo.save(product);
	}

	//Admin can update product

	public Product updateProduct(Long id, Product updateProduct) {
		Product product = repo.findById(id).orElseThrow(()-> new RuntimeException("Product not found"));
		
		product.setName(updateProduct.getName());
		product.setDescription(updateProduct.getDescription());
		product.setPrice(updateProduct.getPrice());
		product.setStock(updateProduct.getStock());
		product.setActive(updateProduct.isActive());	
		
		return repo.save(product);
					}
	
	//Admin can delete prduct
	public void deleteProduct(Long id) {
		Product product = repo.findById(id)
				.orElseThrow(()-> new RuntimeException("Product not found"));
		
		product.setActive(false);
		repo.save(product);
	}


	public List<Product> findAll() {
		return repo.findAll();
	}
	

}
