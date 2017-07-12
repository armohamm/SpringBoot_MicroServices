var microservice = angular.module('microservice', ['ngRoute', 'ngCookies']);

microservice.config(['$routeProvider', function($routeProvider) {
    
	$routeProvider

	.when('/', {

		templateUrl : 'views/home.html',
		controller : 'homeController'
	})

	.when('/product_details', {

		templateUrl : 'views/product_details.html',
		controller : 'productController'
	})

	.when('/login', {
		templateUrl : 'views/login.html',
		controller : "loginController"

	})
	

	.when('/register', {
		templateUrl : 'views/register.html',
		controller : "registerController"

	})

	.when('/confirm_order', {
		templateUrl : 'views/confirm_order.html',
		controller : "confirmOrderController"

	})

	.when('/success', {
		templateUrl : 'views/success.html',
		controller : "successController"
	

	})
	
	.when('/logout', {
		templateUrl : 'views/home.html',
		controller : "homeController"

	})
	
	.when('/profile', {
		templateUrl : 'views/profile2.html',
		controller : "loginController"

	})
	

	.otherwise({
		redirectTo : '/'

	});
	
	
	
}

]);

