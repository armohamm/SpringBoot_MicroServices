package com.tech.cadt.product.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tech.cadt.product.entity.Product;


@Component
public interface IProductService  {

	public List<Product> findAllProducts();

	public Product findproductbasedonId(int id);

	public void  saveProductDetails(Product productObj);	

}


