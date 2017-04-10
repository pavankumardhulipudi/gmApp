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