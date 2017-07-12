package com.tech.cadt.product.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import  com.tech.cadt.product.entity.Product;

@Component
public interface IProductsDAO {

	public List<Product> findAllProducts();

	public Product findproductbasedonId(int id);
	
	public Product saveProductDetails(Product productObj);
		

}
