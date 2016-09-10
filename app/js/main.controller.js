(function(){

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
	 $scope.isActive  = false;

	 if ($scope.repoCount < 0) {
	 	$scope.repoCount = 0;
	 }

	 $scope.toggleSearchBar = function(){
	 	var sbar  = angular.element(document.querySelector('#home-search-form'));
	 	sbar.toggleClass('is-hidden');
	 }
}

mainController.$inject = ['$scope'];
	
})();