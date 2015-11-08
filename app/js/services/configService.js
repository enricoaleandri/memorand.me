angular.module("memorand.me.configServiceModule", [])

    .provider("configService", function () {
        var baseUrl = "";
        return {

            $get: function ($http, $q, $log, $window) {
                return {
                    getConfiguration: function (fileName, restEndpoint) {
                        var deferObj = $q.defer();

                        if (restEndpoint === undefined) {
                            restEndpoint = "/";
                        }
                        $http.get(restEndpoint + fileName)
                            .success(function (data) {
                                deferObj.resolve(data);
                            })
                            .error(function (data, status) {
                                $log.error(" config error: " + fileName + "(" + status + ")");
                                deferObj.reject("config error on getting " + fileName);
                            });
                        return deferObj.promise;

                    }/*,
                    replace: function (args, pattern) {
                        //var args = ["Andrea", "domani"];
                        //var stringa = "Ciao [0], ci ved[1]iamo test[2]test [1]?"
                        replacedPattern = pattern.replace(/\[\d+]/g, function (found) {
                            var n = found.replace("[", "").replace("]", "");
                            return args[n] || "";
                        });
                        return replacedPattern;
                    }*/
                };
            }
        };
    });
