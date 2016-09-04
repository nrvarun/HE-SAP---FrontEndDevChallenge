'use strict';

angular
	.module('topgitApp')
	.controller('HomeCtrl', topGitController);

function topGitController(){
	console.log('topGit is initialized');
}

topGitController.$inject = ['$http'];