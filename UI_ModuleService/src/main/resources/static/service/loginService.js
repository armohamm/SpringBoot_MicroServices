microservice.service("loginService", function($http) {

	var username = {};
	this.setUsername = function(uname) {
		username = uname;
	};
	this.getUsername = function() {
		return username;
	};

	var loginuserObj = {};
	this.setLoginuser = function(userObj) {
		loginuserObj = userObj;
	}
	this.getLoginuser = function() {
		return loginuserObj;
	}

	var jwttoken = {};
	this.setJwttoken = function(Jwttokendata) {
		jwttoken = Jwttokendata;
	}

	this.getJwttoken = function() {
		return jwttoken;
	}

	var fname = {};
	this.setFirstname = function(firstname) {
		fname = firstname;
	}

	this.getFirstname = function() {
		return fname;
	}

	var address1 = {};
	this.setAddress = function(address) {
		address1 = address;
	}

	this.getAddress = function() {
		return address1;
	}

	var phnumber1 = {};
	this.setPhoneNum = function(phnumber) {
		phnumber1 = phnumber;
	}

	this.getPhoneNum = function() {
		return phnumber1;
	}

	var useremail1 = {};
	this.setUserEmail = function(email) {
		this.useremail1 = email;

	}

	this.getUserEmail = function() {
		return useremail1;
	}

	var userloggedin = {}
	this.setUserLoggedin = function(useralreadylogin) {
		userloggedin = useralreadylogin;
	}

	this.getUserLoggedin = function() {
		return userloggedin;
	}

	
	
	
	var  isLogin ={}
	this.setIsUserLogin  =function(isUserloggedin){
		isLogin  = this.isUserloggedin;
	}
	
	this.getIsUserLogin  =function(){
		return isLogin;
	}
	
	this.authenticate = function(username, password, callback) {
		var user = {
			"username" : username,
			"password" : password
		};

		var responsePromise = $http({
			url : "http://localhost:8086/customerService/login",
			method : "POST",
			data : user,
			headers : {
				'Content-Type' : 'application/json',
				'jwtToken' : jwttoken

			}
		});

		responsePromise.success(function(data, status, headers, config) {
			callback(data);

		});
		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed! because no webservice is attached yet");
		});

	}

	this.generateJwtToken = function(username, password, callback, data) {
		var user = {
			"username" : username,
			"password" : password
		};

		var responsePromise = $http({
			url : "http://localhost:8000/loginService/generateToken",
			method : "POST",
			data : user,
			headers : {
				'Content-Type' : 'application/json'
			}
		});

		responsePromise.success(function(data, status, headers, config) {
			alert("Inside loginService jwtToken generation Sucess::: " + data);
			callback(data);

		});
		responsePromise.error(function(data, status, headers, config) {
			alert("AJAX failed! because no webservice is attached yet");
		});

	}

});
