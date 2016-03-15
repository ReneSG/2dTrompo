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

	//Current position
	var currentPos;
	var displayedMarkers = [];
	var usedMarkers = [];

	var jsonTest = [
		{
			latlng: {lat: 25.654278, lng: -100.293509},
			title: "Taquetos"

		},
		{
			latlng: {lat: 25.634278, lng: -100.273509},
			title: "Taquetos 2"
		},
		{
			latlng: {lat: 25.648866, lng: -100.292253},
			title: "taquetos 3"
		}];

	var infoWindow = new google.maps.InfoWindow({map: map});
	var myStyles =[{
	  featureType: "poi",
	  elementType: "labels",
	  stylers: [
	    { visibility: "off" }
	    ]
	  }
	];

	//GIVE CURRENT POSITION
	$scope.getPosition = function(){
		return currentPos;
	};

	//ADD MARKERS
	$scope.makeMarkers = function(){
		//Get markers from database

		for(var j = 0; j<jsonTest.length; j++){
			if((Math.abs(Math.abs(jsonTest[j].latlng.lat) - Math.abs(currentPos.lat))) < 0.005 && (Math.abs(Math.abs(jsonTest[j].latlng.lng) - Math.abs(currentPos.lng)) < 0.005)){
				usedMarkers.push(jsonTest[j]);
			}
		}

		for(var i = 0; i<usedMarkers.length; i++){

			if(usedMarkers[i] != displayedMarkers[i]){
				var currentMarker = usedMarkers[i];

				displayedMarkers[i]= new google.maps.Marker({
			    position: currentMarker.latlng,
			    map: map,
			    title: currentMarker.title
			  	});

			  	displayedMarkers[i].setMap(map);
			  }
		}

		$scope.addOnClickToMarkers();
	}

	//UPDATE MAP WHEN USER ADDS LOCATION
	$scope.mapUpdate = function(){

	};

	$scope.markersUpdate = function(){

		$scope.addOnClickToMarkers();
	}

	$scope.userAddMarker = function(userMarker){
		currentMarker.push(userMarker);

		$scope.markersUpdate;
	}

	$scope.addOnClickToMarkers = function(){

		for(var i = 0; i < usedMarkers.length; i++){
			usedMarkers[i].OnClick = function(){
				//ADD ON CLICK
			}
		}
	}

	//Instance of map
	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
	});

	$scope.map = function(){ 

	map.setOptions({styles: myStyles}); //Load map myStyles configuration

    if(navigator.geolocation) {
 		 navigator.geolocation.getCurrentPosition(function(position) {
 		 var pos = {
  		  lat: position.coords.latitude,
   		 lng: position.coords.longitude
   		 };
   		 currentPos = {
  		  lat: position.coords.latitude,
   		 lng: position.coords.longitude
   		 }; //Define current position

 		 infoWindow.setPosition(pos);
 		 map.setCenter(pos);

 		 $scope.makeMarkers();

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
}}();

}]);