package com.tech.cadt.product.rest;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.tech.cadt.product.entity.Product;
import com.tech.cadt.product.service.IProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductServiceController {

	private static final Logger logger = LoggerFactory.getLogger(ProductServiceController.class);
	@Autowired
	private IProductService productService;
	
	@RequestMapping("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@CrossOrigin
	public List<Product> getAllItems(){
		return productService.findAllProducts();
	}
	
	@RequestMapping("/id/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@CrossOrigin
	public Product getMenuItem(@PathVariable("id") int id){
		return productService.findproductbasedonId(id);
	}
	

	@RequestMapping("/test")
	@CrossOrigin
	public String testService(){
		return "ProductService Sucess";
	}
	
	@RequestMapping("/updatequantity")
	@CrossOrigin
	public @ResponseBody void updateQuantity(@RequestBody Product productObj){
		
		logger.info("Inside Update Quantity .Recieved Product Obj :"+productObj.getAvailableitems());
		
	   productService.saveProductDetails(productObj);
		
		
	}
	
	
	@RequestMapping("/saveProduct")
	@CrossOrigin
	public @ResponseBody void saveProductDetails(@RequestBody Product productObj){
		
		System.out.println("Inside saveProductDetails");
		
		 productService.saveProductDetails(productObj);
		
	}
	
	
}
