

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
