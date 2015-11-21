

'use strict';

angular.module("memorand.me")
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when("/home", {
                resolve: {
                    init : ['$rootScope', function( $rootScope)
                    {
                        //here initialaize the controller
                    }],
                    objectModel: ['$q','logger',
                        function ($q, logger)
                        {
                            var deferred = $q.defer();
                            //azLog.profilingStart("sessionService", (new Date()).getTime());
                            deferred.resolve({});

                            return deferred.promise;
                        }]
                },
                templateUrl: "app/partials/home.html",
                controller: "homeCtrl",
                controllerAs: 'ctrl'

            })
            .when("/angDrag", {
                templateUrl: "app/partials/ang-drag.html",
                controller: "angDragCtrl",
                controllerAs: 'ctrl'

            })
            .otherwise({
                redirectTo: '/home'
            });
    });
