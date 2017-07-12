microservice.controller('registerController', function($scope,$route, $location, registerService) {
	$scope.register = function() {
		registerService.userregistration($scope.username,$scope.firstname, $scope.lastname,$scope.password,$scope.email,$scope.phnumber,$scope.address, function(data){
			if(data != null){
				$location.path("/login");
				 window.location.reload();
			}
			else{
				$scope.error = true;
				window.location.reload();
			}	
		});
	};
});
