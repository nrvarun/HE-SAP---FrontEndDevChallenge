'use strict';

angular
	.module('topgitApp')
	.controller('topGitController', topGitController);

function topGitController(){
	console.log('topGit is initialized');
}

topGitController.$inject = ['$http'];