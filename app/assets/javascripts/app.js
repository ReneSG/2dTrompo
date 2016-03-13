var myApp = angular.module('2DTrompo', ['ui.router', 'templates'])

myApp.controller('MainController', ['$scope', 'dataStorage', function($scope, dataStorage) {

	$scope.user =	dataStorage.getCurrentUser()

	$scope.markerClick = function() {
		
	}

	$scope.getRating = function() {
		console.log($scope.r1);
		console.log($scope.r2);
		console.log($scope.r3);
		console.log($scope.r4);
		console.log($scope.r5);
		rating = $scope.r1 + $scope.r2 + $scope.r3 + $scope.r4 + $scope.r5;
		return rating;
	}

	$scope.form_valid = function() {
		if ($scope.taco == '') {
			return false;
		}
	}

	$scope.addTaco = function(){
		pos = getPosition();
		rating = getRating();
		if(!form_valid()) { return; }
	  	taco_id = dataStorage.tacos.create({
	    	image: $scope.img,
			name: $scope.taco,
			lattitude: pos.lat,
			longitude: pos.lng
	  	});
	  	dataStorage.comments.create({
	  		user_id: $scope.user.id,
	  		body: $scope.comment,
	  		rating: rating,
	  		taco_id: taco_id
	  	})
	  	$scope.taco = '';
	 	$scope.img = '';
	 	$scope.rating = '';
	 	$scope.comment = '';
	};
}]);

myApp.config( function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'home/home.html',
		controller: 'MainController',
		resolve: {
		  commentPromise: ['dataStorage', function(dataStorage){
		    return dataStorage.comments.getAll();
		  }]
		}
	});

	$urlRouterProvider.otherwise('/');
});