angular.module('snowrider')
    .controller('searchCtrl', function($scope, mainService, mapService) {

        let geoData;
        var data;
        $scope.photos = [];

        $scope.getResorts = function(zipOcity) { // whne ng-clicked to initiate
            mainService.getResorts().then(function(results) {
                    $scope.resorts = results; // so i can scope it

                    console.log(results);

                    return results

                })
                // .then(function(res) {
                //   for (var i = 0; i < res.length; i++) { // loop  though the result and try to get the photo for each place hile keeping it on scope
                //     mainService.getPhotos(res[i].photos[0].photo_reference).then(function (response) {
                //       $scope.photos.push(response)
                //       console.log($scope.photos);
                //     })
                //
                //   }
                // })


                //  return data;
        }

        $scope.showMap = function() {
            mapService.initMap();
        }

        $scope.showMap(); //initialize an empty map on load



        $scope.geoCode = function(zipCity) {

            mainService.geoCode(zipCity).then(function(response) {
                    console.log(response);
                    geoData = response;
                    return geoData
                })
                .then(function(geo) {
                    console.log(geo);
                    // var data = $scope.getResorts(geo);
                    // console.log($scope.getResorts(geo));

                    // return  $scope.getResorts(geo)
                    return mainService.getResorts(geo).then(function(results) {
                        $scope.resorts = results; // so i can scope it
                        return results;
                    })
                })
                .then(function(results) {
                    console.log(results);
                    console.log(geoData);
                    mapService.initMap(geoData, results);
                })
        }


    })
