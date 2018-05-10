(function() {
    'use strict';

    angular
        .module('myApp', [ 'ui.router' ])
        .config(config);

    function config($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/map');

        var mapState = {
            name: 'map',
            url: '/map',
            templateUrl: '/modules/map/map.html',
            controller : 'MapCtrl',
            controllerAs: 'map'
        };

        $stateProvider.state(mapState);
    };
})();
