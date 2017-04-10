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