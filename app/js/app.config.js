(function(){

	'use strict';

	angular
		.module('topgitApp')
		.config(configTopGit);

	function configTopGit($routeProvider){

		$routeProvider
			.when('/', {
				templateUrl	: '../views/home/home.html'
			})
			.otherwise({ redirectTo: '/' });

	}

})()