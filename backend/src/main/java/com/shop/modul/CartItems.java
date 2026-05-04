package com.shop.modul;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItems {

		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		private Long id;
		private int quentity;
		
		
		//Many items belongs to one cart
		@ManyToOne 
		@JoinColumn(name = "cart_id")
		private Cart cart;
		
		
		//Many items have Same Products
		
		@ManyToOne
		@JoinColumn(name = "product_id")
		private Product product;


		public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public int getQuentity() {
			return quentity;
		}


		public void setQuentity(int quentity) {
			this.quentity = quentity;
		}


		public Cart getCart() {
			return cart;
		}


		public void setCart(Cart cart) {
			this.cart = cart;
		}


		public Product getProduct() {
			return product;
		}


		public void setProduct(Product product) {
			this.product = product;
		}
		
		
		
		
}
