(function() {
    'use strict';

    function MapCtrl($scope) {
        var vm = this;
        var mymap;
        var lat;
        var lng;

        angular.extend(vm, {
            changeMapLayer : changeMapLayer,
            wasChecked : false,
            isShow : false,
            name : null,
            address : null,
            lat : null,
            lng : null
        });

        initMap();

        function initMap() {
            mymap = L.map('mapid').setView([55.755826, 37.617299900000035], 5);

            L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            }).addTo(mymap);

            var ac = new google.maps.places.Autocomplete(
                (document.getElementById('autocomplete')), {
                    types: ['geocode']
                }
            );

            ac.addListener('place_changed', function() {
                var place = ac.getPlace();
                lng = place.geometry.location.lng();
                lat = place.geometry.location.lat();

                vm.name = place.name;
                vm.address = place.formatted_address;
                vm.lng = lng;
                vm.lat = lat;

                mymap.setView([lat, lng], 16);

                placeMarker();

                vm.isShow = true;

                if ($scope.$$phase !== '$apply' && $scope.$$phase !== '$digest') {
                    $scope.$apply();
                };
            });
        };

        function changeMapLayer() {
            if (!vm.wasChecked) {
                L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                    maxZoom : 20,
                    subdomains : ['mt0','mt1','mt2','mt3']
                })
                .addTo(mymap);
            } else {
                L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom : 20,
                    subdomains : ['mt0','mt1','mt2','mt3']
                })
                .addTo(mymap);
            };

            vm.wasChecked = !vm.wasChecked;
        };

        function placeMarker() {
            var marker = L.marker([lat, lng]).addTo(mymap);
        };
    };

    angular
        .module('myApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = [ '$scope' ];
})();

