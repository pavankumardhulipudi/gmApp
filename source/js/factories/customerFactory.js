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