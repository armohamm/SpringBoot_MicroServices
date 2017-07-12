package com.tech.cadt.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@Component
@ComponentScan("com.tech.cadt.product")
@CrossOrigin
public class ProductService {
	public static void main(String[] args) {
		SpringApplication.run(ProductService.class, args);
	}
}