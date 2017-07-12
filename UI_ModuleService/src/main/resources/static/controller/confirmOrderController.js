microservice.controller('confirmOrderController', function($scope, $location, productService,
		loginService,confirmOrderService,$cookieStore) {
     
	$scope.showInvoice = function() {
		   var jwtcookie =$cookieStore.get('cookiejwtToken');
		   if (jwtcookie != null) {
			$scope.productcookie =   $cookieStore.get('Orderedproduct');
			$scope.paymentMode = "Cash On Delivery";	
			$scope.totalamt = $scope.productcookie.quantity * $scope.productcookie.cost;
			$scope.username   = $cookieStore.get('usernamecookie');
			$scope.loginuser  = $cookieStore.get('loginuserdata');
			$scope.userphnum  = $cookieStore.get('loginuserphnumcookie');
			$scope.useraddr   = $cookieStore.get('loginuseraddresscookie');
			$scope.userfname  = $cookieStore.get('loginuserfnamecookie');
			$scope.useremail  = $cookieStore.get('loginuseremailcookie');
			$scope.billingAddress = $scope.useraddr;
			$scope.deliveryAddr =  $scope.useraddr;
		   }
	}
	


		$scope.confirmOrder = function() {
		var jwtcookie =$cookieStore.get('cookiejwtToken');
		if (jwtcookie != null) {
			confirmOrderService.saveorder($scope.productcookie.id,$scope.username,
					$scope.paymentMode, $scope.billingAddress,
					$scope.deliveryAddr, $scope.productcookie.quantity,
					$scope.totalamt, $cookieStore.get('cookiejwtToken'), function(data) {
					if (data != null ) {
							confirmOrderService.setConfirmorder(data);
							$location.path("/success");
						} else {
							$location.path("/login");
							$scope.error = true;
						}
					});
		}
	}

});
