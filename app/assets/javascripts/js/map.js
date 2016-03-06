var map;
var service;
var infowindow;

var myFirebaseRef = new Firebase("https://2dtrompo.firebaseio.com/");

var entries;

var lat;
var long;
var name; 
var rating;

var ready_mark = false;

var map;

var marker_;

//var markers = [];

function getEntries(snapshot) {
  console.log(snapshot.val().comment);

  var image = new google.maps.MarkerImage(
    "assets/images/taco1.png",
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(1, 34),
    new google.maps.Size(50, 40));
  
  var latlng = new google.maps.LatLng(snapshot.val().latitude, snapshot.val().longitude);
  var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: snapshot.val().name,
      position: latlng
    });
  //markers.push(marker);
}

$( document ).ready(function() {
    ready_mark = true;
});

function getLattitude() {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
}

$('#map').click(function() {
  console.log("Clicked");
  getLattitude();
});

$('#sub_but').click(function() {
  var nam = $('#nam').val();
  var tac = $('#taco').val();
  var com = $('#com').val();
  var rat = parseInt($('#r1').val()) + parseInt($('#r2').val()) + parseInt($('#r3').val()) + parseInt($('#r4').val()) + parseInt($('#r5').val());
  myFirebaseRef.push({ name: nam, taco: tac, comment: com, latitude: lat, longitude: long, rating: rat });
});

function initializeMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

    var request = {
    location: pos,
    radius: '500',
    query: 'restaurant',
    keyword: 'tacos'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Estos son los taquitos que se encuentran cerca de ti');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];

    var image = new google.maps.MarkerImage(
    "assets/images/taco1.png",
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(1, 34),
    new google.maps.Size(50, 40));

    marker_ = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    })
  }
}
new google.maps.Size(42,68)

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  }
}

myFirebaseRef.on('child_added', function(snapshot) {
    if (ready_mark) {
      //We'll fill this in later.
      console.log("Entry added.");
      getEntries(snapshot);
      //initializeMap();
    }
});