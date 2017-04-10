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