'use strict';

angular
	.module('topgitApp')
	.controller('MainCtrl', mainController);

function mainController ($scope) {
	 console.log('main is up and running');

	 if(typeof $scope.starRating === 'undefined' ) {
	 	$scope.starRating = 500;
	 	console.log($scope.starRating);
	 }

	 $scope.repoCount = 0;

	 if ($scope.repoCount < 0) {
	 	$scope.repoCount = 0;
	 }
}

mainController.$inject = ['$scope'];