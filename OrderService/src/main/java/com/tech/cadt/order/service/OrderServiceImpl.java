package com.tech.cadt.order.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




import com.tech.cadt.order.entity.Order;
import com.tech.cadt.order.dao.IOrderDAO;

@Component
@Transactional
public class OrderServiceImpl  implements IOrderService{

	
	@Autowired
	private IOrderDAO orderdao;
	
	
	@Override
	public List<Order> getAllOrders() {
		
		return orderdao.getAllOrders();
	}

	@Override
	public Order getOrderbasedonId(long orderId) {
		
		return  orderdao.getOrderbasedonId(orderId);
	}

	@Override
	public Order savenewOrder(Order orderObj) {
		
		return orderdao.savenewOrder(orderObj);
		
	}

	@Override
	public List<Order> getPreviousOrders(String usernameVal) {
		
		return  orderdao.getPreviousOrders(usernameVal);
	}

	
	
	
}
