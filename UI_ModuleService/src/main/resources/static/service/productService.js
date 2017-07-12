microservice
		.service(
				"productService",
				function($http, $location, $cookieStore) {

					var count = {};
					var product = {};
					this.setProduct = function(selectedProduct) {
						$cookieStore.put('selectproduct', selectedProduct);
						product = selectedProduct;
					};
					this.getProduct = function() {
						return product;
					};

					var productOrder = {};
					this.setProductSelected = function(productordered) {
						productOrder = productordered;
					};

					this.getProductSelected = function() {
						return productOrder;
					};

					this.getdata = function(callbackData) {

						var responsePromise = $http
								.get("https://productservice.cfapps.io/products/all");
						responsePromise.success(function(data, status, headers,
								config) {
							callbackData(data);
						});
						responsePromise
								.error(function(data, status, headers, config) {
									alert("AJAX failed! because no webservice is attached yet");
								});
					};

					var orderedproduct = {};

					this.setorderedproduct = function(count) {
						$cookieStore.put('productobj', count);
						orderedproduct = count;
					}

					this.getorderedproduct = function() {
						return orderedproduct;
					}

				});
