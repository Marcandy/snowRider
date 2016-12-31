angular.module('snowrider')
  .service('mapService', function ($http, mainService) {

    let map;
    let service;
    let infowindow;
    let  currentL;
    this.initMap = function(geo, results) {
      //location
      if (geo) {
        console.log(geo);
        currentL = geo;
        // {lat: Number(geo.lat), lng: Number(geo.lng)
      } else {
        currentL = {lat: Number(mainService.lat), lng: Number(mainService.long)};
      }


        //creating the new map with the geocode of the currentL
        map = new google.maps.Map(document.getElementById('map'), {
          center: currentL,
          zoom: 10
        });

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);

        // service.textSearch({
        //   location: currentL,
        //   radius: 30000,
        //   query: ['ski, snowboard resorts'],
        //   rankBy: google.maps.places.RankBy.DISTANCE
        // }, callback);
        callback(results);
      }



      function callback(data) {
        // if (status === google.maps.places.PlacesServiceStatus.OK) {
          // console.log(results)
          // for (var i = 0; i < results.length; i++) {
          //   createMarker(results[i]); // creating a makrer for each of the result in the map
          // }
          var arr;
          console.log(data);
          if (data) { //made a condition to not initia map right away
            arr = data;
          } else {
            arr = mainService.pass();
          }
          for (var i = 0; i < arr.length; i++) {
            createMarker(arr[i]); // creating a makrer for each of the result in the map
          }
        // }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + '<br>' + place.formatted_address);
          // infowindow.setContent(place.formatted_address);

          infowindow.open(map, this);
        });
      }

});
