(function(){

	'use strict';

	angular
		.module('topgitApp')
		.config(configTopGit);

	function configTopGit($routeProvider,$compileProvider){

		$routeProvider
			.when('/', {
				templateUrl	: '../views/home/home.html'
			})
			.otherwise({ redirectTo: '/' });
/*		$compileProvider.debugInfoEnabled(false);*/
	}

})();