package com.tech.cadt.customer.dao;

import java.util.List;

import org.springframework.stereotype.Component;
import com.tech.cadt.customer.entity.Customer;


@Component
public interface ICustomerDAO  {
	
	

	public List<Customer> getCustomerDetailsbyUserId(String username);

	public String  saveCustomerDetails(Customer customerObj);
	
	public List<Customer> getAllCustomers();
}
