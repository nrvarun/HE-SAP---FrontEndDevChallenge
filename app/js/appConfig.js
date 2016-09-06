'use strict';

angular
	.module('topgitApp')
	.config(configTopGit);

function configTopGit($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl	: 'app/views/home.html'
		})
		.otherwise({ redirectTo: '/' });

}