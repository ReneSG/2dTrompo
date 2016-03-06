var myApp = angular.module('2DTrompo', ['ui.router', 'templates'])

myApp.controller('MainController', ['$scope', 'dataStorage', function($scope, dataStorage) {

}]);

myApp.config( function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'home/home.html',
		controller: 'MapsController'
	});

	$urlRouterProvider.otherwise('/');

});

//MAPSCONTROLLER
myApp.controller('MapsController', ['$scope', 'dataStorage', function($scope, dataStorage){

	var infoWindow = new google.maps.InfoWindow({map: map});

	var myStyles =[{
	  featureType: "poi",
	  elementType: "labels",
	  stylers: [
	    { visibility: "off" }
	    ]
	  }
	];

	$scope.map = 
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
	});

	map.setOptions({styles: myStyles}); //Load map myStyles configuration

    if(navigator.geolocation) {
 		 navigator.geolocation.getCurrentPosition(function(position) {
 		 var pos = {
  		  lat: position.coords.latitude,
   		 lng: position.coords.longitude
   		 };

 		 infoWindow.setPosition(pos);
 		 infoWindow.setContent('You are here');
 		 map.setCenter(pos);
 		 }, function() {
   		 handleLocationError(true, infoWindow, map.getCenter());
 		 });
 		 } else {
 		 // Browser doesn't support Geolocation
 		 handleLocationError(false, infoWindow, map.getCenter());
  		 } 
  	//End of maps declaration

  	//Error maps function
	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  	infoWindow.setPosition(pos);
 	 infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
}
}]);