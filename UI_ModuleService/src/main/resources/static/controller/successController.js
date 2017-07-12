microservice.controller('successController', function($scope, $location,$route, productService, confirmOrderService,loginService,$cookieStore) {

		$scope.showOrderedProduct = function() {
			if ($cookieStore.get('cookiejwtToken') != null) {
			$scope.product = productService.getProduct();
			$scope.order =  confirmOrderService.getConfirmorder();
			$scope.username   = $cookieStore.get('usernamecookie');
			$scope.loginuser  = $cookieStore.get('loginuserdata');
			$scope.userphnum  = $cookieStore.get('loginuserphnumcookie');
			$scope.useraddr   = $cookieStore.get('loginuseraddresscookie');
			$scope.userfname  = $cookieStore.get('loginuserfnamecookie');
			$scope.useremail  = $cookieStore.get('loginuseremailcookie');
		}
			else {
				$location.path("/login");
				$route.reload();
				window.location.reload(); 
			}
	}

	
	$scope.cancel = function() {
		$location.path("/");
		 $route.reload();
		 window.location.reload(); 
	};

});
