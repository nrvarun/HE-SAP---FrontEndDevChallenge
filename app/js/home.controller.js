(function(){

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
	vm.noProjectDataFlag    = true;

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

		 var toggleBtn = angular.element(document.querySelector('.home__search__form__field__btn'));

		 toggleBtn.parent(this).parent(this).addClass('is-hidden');

		 console.log(toggleBtn.parent(this).parent(this));
			
		 var githubUrl 			= "https://api.github.com/search/repositories";
		 var langToGet 			= $scope.langField;
		 var stars 	   			= $scope.starRating;
		 var API_PATH  			= githubUrl+'?q='+'language:'+langToGet+'&stars:>='+stars; 	 

		 console.log(githubUrl+'?q='+'stars:>='+stars+'&'+'language:'+langToGet);

		 $http
		 	.get(API_PATH)
		 	.then(gitSuccess,gitError);

		 function gitSuccess(res){

		 		vm.gitSuccessFlag 	= true;
		 		vm.gitProjectData 	= res.data.items;

		 		$scope.repoCount  	= res.data.items.length;

		 		vm.noProjectDataFlag    = false;
		 		
		 		console.log('X-RateLimit-Limit : '+res.headers('X-RateLimit-Limit')+', X-RateLimit-Remaining : '+res.headers('X-RateLimit-Remaining'));
		 }

		 function gitError(res){
		 	console.log('Error retreiving data');
		 	alert(res.data.errors[0].message);
		 }

	}

};

topGitController.$inject = ['$http','$scope'];

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

})();