microservice.controller('loginController',function($scope, $location, $route,loginService,productService,confirmOrderService,$cookieStore) {
 	$scope.error = false;
	$scope.isLogin = false;
	$scope.productOrdered = productService.getProductSelected();
	if(($scope.productOrdered) == true){
		$scope.productOrderStatus = "Completed";
	}
	else{
		$scope.productOrderStatus = "Pending";
	}
		$scope.login = function(){
		loginService.generateJwtToken($scope.username, $scope.password, function(data){
				if (data != null) {
					$cookieStore.put('cookiejwtToken',data);
					loginService.setJwttoken(data);
					
				}
				
			loginService.authenticate($scope.username,$scope.password,function(data) {
				if(!$.trim(data)){
						$location.path("/login");
					
					}
					
					else if(data != null){
						loginService.setUserLoggedin("yes");
						$cookieStore.put('UserLoggedincookie',"yes");
						loginService.setLoginuser(data);
					    loginService.setFirstname(data.firstname);
						loginService.setAddress(data.address);
						loginService.setPhoneNum(data.phnumber);
						loginService.setUserEmail(data.email);
						loginService.setUsername($scope.username);
					    $cookieStore.put('loginuserdata',data);
					    $cookieStore.put('loginuserfnamecookie',data.firstname);
					    $cookieStore.put('usernamecookie',data.username);
					    $cookieStore.put('loginuserphnumcookie',data.phnumber);
					    $cookieStore.put('loginuseremailcookie',data.email);
					    $cookieStore.put('loginuseraddresscookie',data.address);
					    $cookieStore.put('loginuserlnamecookie',data.lastName);
					    $scope.username = $cookieStore.get('usernamecookie');
							if($cookieStore.get('loginuserfnamecookie')!=null){
							 var welcomeUsercookie = 'Welcome' + " " +$cookieStore.get('loginuserfnamecookie');
							 $cookieStore.put('cookiewelcomeUser',welcomeUsercookie);
						
							 $scope.isLogin  = true;
						
							 $scope.welcomeuser  = data.firstname;
						
						 }
					    
						if(($scope.productOrderStatus == "Completed") && ($cookieStore.get('cookiejwtToken') !=null)){
							$location.path("/confirm_order");
							window.location.reload(); 
						}
						else{
							$location.path("/");
							$route.reload();
							window.location.reload(); 
							
						}
					}
					else{
						
					}
				});
		
			
		});
		
	};
	
	$scope.welcome = function() {
			var loginuserfname = $cookieStore.get('loginuserfnamecookie');
			 if(loginuserfname !=null){
			 var welcomeUser = 'Welcome' + " " +loginuserfname;
			 $cookieStore.put('cookiewelcomeUser',welcomeUser);
			 $scope.isLogin  = true;
			 $scope.welcomeuser  = loginuserfname;
		 }
			 else{
				 $scope.isLogin  = false;
			 }
	}
	
	
   
    $scope.logout = function() {
    	 $cookieStore.remove('cookiejwtToken');
         $cookieStore.remove('loginuserfnamecookie');
         $cookieStore.remove('loginuserphnumcookie');
		 $cookieStore.remove('loginuseremailcookie');
		 $cookieStore.remove('loginuseraddresscookie');
		 $cookieStore.remove('loginuserfnamecookie');
		 $cookieStore.remove('loginuserlnamecookie');
		 $cookieStore.remove('selectedproductcookie'),
		 $cookieStore.remove('Orderedproduct');
		 $cookieStore.remove('cookiewelcomeUser');
		 $cookieStore.remove('loginuserdata');
		 $location.path("/logout");
		 window.location.reload();
	};
	
	$scope.profile = function() {
		alert("profile clicked");
		 $scope.phnum =  $cookieStore.get('loginuserphnumcookie');
		 $scope.emailaddr =  $cookieStore.get('loginuseremailcookie');
		 $scope.addr =   $cookieStore.get('loginuseraddresscookie');
		 $scope.loginuserfname = $cookieStore.get('loginuserfnamecookie');
		// $scope.loginuserlname = $cookieStore.get('loginuserlnamecookie');
		 
		 // getting previous orders of customer.
		 $scope.username = $cookieStore.get('usernamecookie');
		 $scope.jwttokendata = $cookieStore.get('cookiejwtToken');
		 $scope.previousOrders = confirmOrderService.previousorders($scope.username,$scope.jwttokendata);
		 alert("previous orders:::"+JSON.stringify($scope.previousOrders));
		 
		 
		 $location.path("/profile");
		 
	}
     
	
	
	
});

