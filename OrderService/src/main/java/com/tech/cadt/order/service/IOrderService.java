package com.tech.cadt.order.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tech.cadt.order.entity.Order;

@Component
public interface IOrderService {

	
	public List<Order> getAllOrders();
	public Order getOrderbasedonId(long orderid);
	public Order savenewOrder(Order orderObj);
	public List<Order> getPreviousOrders(String usernameVal);
	
	
}
