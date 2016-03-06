var myApp = angular.module('2DTrompo', ['ui.router', 'templates'])

myApp.controller('MainController', ['$scope', 'dataStorage', function($scope, dataStorage) {

}]);

myApp.config( function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'home/home.html',
		controller: 'MainController'
	});

	//$urlRouterProvider.otherwise('/');
});