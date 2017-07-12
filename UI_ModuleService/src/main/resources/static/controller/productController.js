microservice.controller('productController', function($scope,$location, productService, loginService,confirmOrderService,$cookieStore) {
	$scope.min = 1;
	$scope.loginuserstatus = $cookieStore.get('UserLoggedincookie');
	var jwtcookie =$cookieStore.get('cookiejwtToken');
	 
	$scope.getAllProducts = function() {
		productService.getdata(function(data) {
			$scope.returndata = data;	
		});

	};

	$scope.buy = function(product) {
		productService.setProduct(product);
		 $location.path("/product_details");
		
	};

	$scope.showProduct = function(orderedproduct) {
		$scope.product  = $cookieStore.get('selectproduct');
		$cookieStore.put('selectedproductcookie',$scope.product);
		$scope.selectproductcookie = $cookieStore.get('selectedproductcookie');
		productService.setorderedproduct(orderedproduct);
	}

	$scope.order = function(product) {
		productService.setProductSelected(true);
		$cookieStore.put('Orderedproduct',$scope.product);
		alert("ordered ...product::::::::::::"+JSON.stringify(product));
		var jwtcookie = $cookieStore.get('cookiejwtToken');
		if ($scope.loginuserstatus == "yes" || jwtcookie != null) {
			$location.path("/confirm_order");
		}

		else{
			$location.path("/login");
		}
			
	};	

});


