microservice.service("confirmOrderService", function($http, $location, loginService) {

	var confirmorder = {};
	this.setConfirmorder = function(selectedconfirmorder) {
		confirmorder = selectedconfirmorder;
	};
	this.getConfirmorder = function() {
		return confirmorder;
	};

	this.saveorder = function(productid, username, paymentMode, billingAddress,
			deliveryAddr, orderQuantity, totalamt, jwttoken, callback) {
		var orderdetails = {
			"productid" : productid,
			"username" : username,
			"paymentMode" : paymentMode,
			"billingAddress" : billingAddress,
			"deliveryAddr" : deliveryAddr,
			"orderQuantity" : orderQuantity,
			"totalamt" : totalamt,
			"jwttoken" : jwttoken
		};

		var responsePromise = $http({
			url : "http://localhost:8088/orders/createOrder",
			method : "POST",
			data : orderdetails,
			headers : {
				'Content-Type' : 'application/json',
				"jwttoken" : jwttoken
			}
		});

		responsePromise.success(function(data, status, headers, config) {
			alert("Confirm Order Sucess");
			callback(data);

		});
		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed! because no webservice is attached yet");
		});

	}
	
	
	
	
	this.previousorders = function(username,jwttoken, callback) {
		var previousorders = {		
			"username" : username,
			"jwttoken" : jwttoken
		};

		var responsePromise = $http({
			url : "http://localhost:8088/orders/previousOrders",
			method : "POST",
			data : previousorders,
			headers : {
				'Content-Type' : 'application/json',
				"jwttoken" : jwttoken
			}
		});

		responsePromise.success(function(data, status, headers, config) {
			alert("Previous Orders Sucess");
			callback(data);

		});
		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed! because no webservice is attached yet");
		});

	}
	
	
	

});
