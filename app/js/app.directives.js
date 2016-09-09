(function(){

	angular
	.module('topgitApp')
	.directive('projectCard', projectCard);

	function  projectCard () {
		return {
			restrict: 'E',
			transclude: false,
			templateUrl: '../views/home/project-card.html',
			link: function (scope, iElement, iAttrs) {
				console.log('project card directive is running.');
			}
		};
	};

})();