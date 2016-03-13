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

	//Instance of map
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
	});

	$scope.map = map.setOptions({styles: myStyles}); //Load map myStyles configuration

    if(navigator.geolocation) {
 		 navigator.geolocation.getCurrentPosition(function(position) {
 		 var pos = {
  		  lat: position.coords.latitude,
   		 lng: position.coords.longitude
   		 };
   		 console.log(pos);
   		 currentPos = pos; //Define current position

 		 infoWindow.setPosition(pos);
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
	//GIVE CURRENT POSITION
	$scope.getPosition = function(){
		return currentPos;
	};

	//ADD MARKERS
	$scope.makeMarkers = function(){
		//Get markers from database
			console.log(currentPos);

		for(var j = 0; j<jsonTest.length; j++){
			
			if((Math.abs(jsonTest[j].latlng.lat - currentPos.lat) < 0.1) && (Math.abs(jsonTest[j].latlng.lng - currentPos.lng) < 0.1)){

				usedMarkers.push(marker);
			
			}
		}

		for(var i = 0; i<usedMarkers.length; i++){

			var currentMarker = usedMarkers;

			displayedMarkers[i]= new google.maps.Marker({
		    position: currentMarker.latlng,
		    map: map,
		    title: currentMarker.title
		  	});

		  	usedMarkers[i].setMap(map);
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

}]);