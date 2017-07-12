package com.tech.cadt.order.rest;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.tech.cadt.order.rest.JwtUtil;
import com.tech.cadt.order.entity.Order;
import com.tech.cadt.order.entity.Product;
import com.tech.cadt.order.service.IOrderService;
import com.tech.cadt.order.entity.Customer;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderRestServiceController {

	private static final Logger LOGGER = LoggerFactory.getLogger(OrderRestServiceController.class);
   
	
	@Autowired
	private IOrderService orderService;
	
	@RequestMapping("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@CrossOrigin
	public @ResponseBody List<Order> getAllOrders(){
		return orderService.getAllOrders();
	}
	
	@RequestMapping("/id/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@CrossOrigin
	public @ResponseBody Order getOrderbasedonId(@PathVariable("id") long orderId){
		return orderService.getOrderbasedonId(orderId);
	}
	

	@GET
	@RequestMapping("/test")
	@CrossOrigin
	public String testService(){
		return "Order-Service Sucess";
	}
	
	
	
	@Consumes(MediaType.APPLICATION_JSON)
	@RequestMapping(value="/createOrder", method = RequestMethod.POST)
	@CrossOrigin
	public  @ResponseBody Order  createnewOrder(HttpServletResponse httpServletResponse,@RequestBody Order orderObj,@RequestHeader HttpHeaders headers) {

		 LOGGER.info("Inside createnewOrder() new Order Details::" + orderObj.toString());
		 RestTemplate restTemplate = new RestTemplate();
		 Order resultObj = null ;
		try {
			String usernameVal = null;
			long productId = orderObj.getProductid();
			int quantity = orderObj.getOrderQuantity();
			LOGGER.info("Headers::::::" + headers);
			List<String> token = headers.get("jwtToken");
			LOGGER.info("JWT token:::::" + token.get(0));
			String jwttoken = token.get(0);
			if (jwttoken != null) {
				boolean validation = JwtUtil.validateJWT(jwttoken);
				if (validation) {
					String jwtUsername = JwtUtil.getSubject(jwttoken);
					// Get user details from Customer Service here.
					if (orderObj != null)
						usernameVal = orderObj.getUsername();
					LOGGER.info("input Username to the customer service::::::"+ usernameVal);

					// User Authentication
					if (usernameVal.equals(jwtUsername)) {
						orderService.savenewOrder(orderObj);
						LOGGER.info("JWT Token Validataion Sucessful in OrderService.");
						LOGGER.info("new Order Deatils saved Sucessfully");
						updateQuantity(productId, quantity);
						resultObj = orderObj;
					}
				}
			}

		}
		
		catch (Exception e) {
			e.printStackTrace();
		}
		return resultObj;
	}

	private void  updateQuantity(long productId, int quantity) {
		 RestTemplate restTemplate = new RestTemplate();
		try {

			Product productObj = restTemplate.getForObject("http://localhost:8084/products/id/"+productId,Product.class,productId);
			LOGGER.info("Product Obj  ::::" + productObj.toString());
			int availableItems = productObj.getAvailableitems();
			int currentCount = availableItems - quantity;
			productObj.setAvailableitems(currentCount);
			LOGGER.info("After set available items Product Obj  ::::"+ productObj.getAvailableitems());
			/* posting updated product Object */

			restTemplate.postForObject("http://localhost:8084/products/updatequantity",productObj,Product.class);

		}

		catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
}
