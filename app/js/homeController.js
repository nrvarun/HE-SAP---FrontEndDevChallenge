'use strict';

angular
	.module('topgitApp')
	.controller('HomeCtrl', topGitController);

function topGitController($http,$scope,$rootScope){
	console.log('topGit is initialized');

	var vm 					= this;
	var langUrl  			= 'https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json';

	vm.langList 			= [];
	vm.gitProjectData 		= [];
	
	vm.gitSuccessFlag		= false; 
	vm.starRatings			= 500;

	vm.getLangList =  function(){
		
		$http
			.get(langUrl)
			.then(function(res){
				vm.langList = res.data;
			});
	};

	vm.getLangList();

	vm.getGithubProjects = function(){
			
		 var githubUrl 		= "https://api.github.com/search/repositories";
		 var langToGet 		= $scope.langField;
		 var stars 	   		= $scope.starRating;
		 var API_PATH  		= githubUrl+'?q='+'language:'+langToGet+'&stars:>='+stars; 	 

		 $rootScope.lang 	= $scope.langField;

		 console.log(githubUrl+'?q='+'stars:>='+stars+'&'+'language:'+langToGet);

		 $http
		 	.get(API_PATH)
		 	.then(gitSuccess,gitError);

		 function gitSuccess(res){
		 		console.log(res.data);

		 		vm.gitSuccessFlag 	= true;
		 		$rootScope.repos 	= res.data.length;
		 		vm.gitProjectData 	= res.data.items;
		 		
		 		console.log(res.data.items[0]);
		 }

		 function gitError(res){
		 	console.log('Error retreiving data');
		 }

	}

};

topGitController.$inject = ['$http','$scope','$rootScope'];

angular.module('topgitApp')
	   .directive('input', function() {
					  return {
					    restrict: 'E',
					    require: '?ngModel',
					    link: function(scope, element, attrs, ngModel) {
					      if ('type' in attrs && attrs.type.toLowerCase() === 'range') {
					        ngModel.$parsers.push(parseFloat);
					      }
					    }
					  };
					});