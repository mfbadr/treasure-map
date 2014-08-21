/* global google:true */

(function(){
  'use strict';

  var map,
      directionsDisplay;

  $(document).ready(function(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    var lat  = parseFloat($('#data').attr('data-lat')),
        name = $('#data').attr('data-name'),
        lng  = parseFloat($('#data').attr('data-lng'));
    initMap(lat,lng,8);
    addMarker(lat, lng, name);

    //directionsDisplay.setMap(map);
    //var locations = getLocations();
    //calcRoute(locations);
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation:google.maps.Animation.DROP});
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('mapView'), mapOptions);
  }

})();

