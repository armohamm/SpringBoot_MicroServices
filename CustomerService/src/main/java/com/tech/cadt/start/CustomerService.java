package com.tech.cadt.start;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;


@SpringBootApplication
@Component
@ComponentScan("com.tech.cadt.customer")

public class CustomerService {
	public static void main(String[] args) {
		SpringApplication.run(CustomerService.class, args);
		 final Logger LOGGER = LoggerFactory.getLogger(CustomerService.class);
		   String customlogger ="ADMS Loger::::";
		   LOGGER.info(customlogger+"CustomerService Started");
	}
}