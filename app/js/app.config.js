'use strict';

angular
	.module('topgitApp')
	.config(configTopGit);

function configTopGit($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl	: 'views/home.html',
			controller 	: 'HomeCtrl'
		})
		.when('/about', {
			templateUrl	: 'views/about',
			controller 	: 'AboutCtrl'
		})
		.otherwise({ redirectTo: '/' });

}