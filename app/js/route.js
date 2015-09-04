/**
 * @ngdoc overview
 * @name az-direct-IT-QUOTE-all.config:routes
 * @author  Alessandro Aeberli  <alessandro.aeberli@avanade.com>
 * @description Configures which controller and view should be loaded on a specific path
 * @requires $routeProvider
 * @requires $locationProvider
 */

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
					objectModel: ['$q','azLog',
						function ($q, azLog)
						{
                            var deferred = $q.defer();
                            //azLog.profilingStart("sessionService", (new Date()).getTime());
							//deferred.resolve(policyData);

							return deferred.promise;
						}],
					dialogName : function(){ return "quote"}
				},
				templateUrl: "app/partials/home.html",
				controller: "homeCtrl"

			})
			.when("/", {
                resolve: {
                    init : [ function () {

                    }],
                    objectModel: ['$q','azLog',
                        function ($q, azLog)
                        {
                            var deferred = $q.defer();
                            //azLog.profilingStart("sessionService", (new Date()).getTime());
                            //deferred.resolve(policyData);

                            return deferred.promise;
                        }]
                },
				controller: "homeCtrl",
				templateUrl: "app/partials/home.html"
			})
    });
