(function() {
	"use strict";

	angular.module("gm.common", []);

	angular.module("gm.factories", [
		"gm.common"
	]);

	angular.module("gm.services", [
		"gm.common"
	]);

	angular.module("gm.app", [
		"ui.router",
		"ngStorage",
		"gm.common",
		"gm.factories",
		"gm.services"
	]);

})();
(function() {
	"use strict";

	angular.module("gm.app").config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("viewCustomers", {
				url: "/view",
				templateUrl: "/views/viewCustomers.html",
				controller: "CustomersCtrl"
			})
			.state("editCustomer", {
				url: "/edit",
				templateUrl: "/views/editCustomer.html",
				controller: "EditCustomerCtrl"
			})
			.state("addCustomer", {
				url: "/add",
				templateUrl: "/views/addCustomer.html",
				controller: "AddCustomerCtrl"
			});
		$urlRouterProvider.otherwise("/view");
	});

})();
(function() {
	"use strict";

	angular.module("gm.common").controller("AddCustomerCtrl", [
		"$scope", "$state", "CustomerFactory",
		function(scope, state, customerFactory) {

			scope.customer = {};

			scope.isCustomerAdded = false;

			scope.addCustomer = function() {
				if(scope.customer.email && scope.customer.firstName && scope.customer.lastName) {
					customerFactory.addCustomer(scope.customer);
					scope.isCustomerAdded = true;
				}
			};

			scope.resetScope = function() {
				delete scope.isAddCustomerSuccess;
				delete scope.customer;
			}

		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("gm.common").controller("CustomersCtrl", [
		"$scope", "CustomerFactory",
		function(scope, customerFactory) {

			scope.customers = customerFactory.customers;
			scope.isCustomerDeleted = false;

			scope.deleteCustomer = function() {
				customerFactory.deleteCustomer(scope.selectedCustomerIndex);
				scope.isCustomerDeleted = true;
			}

			scope.setCustomerIndex = function(index) {
				scope.selectedCustomerIndex = index;
				customerFactory.getCurrentCustomerIndex = index;
				scope.isCustomerDeleted = false;
			}

		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("gm.common").controller("EditCustomerCtrl", [
		"$scope", "CustomerFactory",
		function(scope, customerFactory) {

			scope.customer = customerFactory.getSelectedCustomer().customer;

			scope.isCustomerUpdated = false;

			scope.updateCustomer = function() {
				if(scope.customer.email && scope.customer.firstName && scope.customer.lastName) {
					customerFactory.updateCustomer(scope.customer);
					scope.isCustomerUpdated = true;
				}
			}
		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("gm.factories").factory("CustomerFactory", [
		"$rootScope", "StorageService",
		function(rootscope, storageService) {

			var customerFactory = {};

			customerFactory.customers = storageService.getCustomers() || [];

			customerFactory.getCurrentCustomerIndex;

			customerFactory.addCustomer = function(customer) {
				customerFactory.customers.push(customer);
				storageService.setCustomers(customerFactory.customers);
            };

            customerFactory.updateCustomer = function(customer) {
            	customerFactory.customers[customerFactory.getCurrentCustomerIndex] = customer;
            	storageService.setCustomers(customerFactory.customers);
            };

            customerFactory.deleteCustomer = function(index) {
            	customerFactory.customers.splice(index, 1);
            	storageService.setCustomers(customerFactory.customers);
            };

            customerFactory.getSelectedCustomer = function() {
            	var customerDetails = {
            		customer: customerFactory.customers[customerFactory.getCurrentCustomerIndex],
            		customerIndex: customerFactory.getCurrentCustomerIndex
            	}
				return customerDetails;
            };

			return customerFactory;

		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("gm.services").service("StorageService", [
		"$rootScope",
		function(rootscope) {

			this.setCustomers = function(customers) {
				localStorage.gmCustomers = JSON.stringify(customers);
            };

            this.getCustomers = function() {
				var customers = localStorage.gmCustomers;
            	if(typeof customers === "string") {
            		return JSON.parse(customers);
            	}
            };

		}
	]);
	
})();