/**
 * Created by Enrico on 13/12/2015.
 */



'use strict';

angular.module('memorand.me.controllersModule.contactModalInstanceCtrlModule',[])
    .controller("contactModalInstanceCtrl",["$scope", "$uibModalInstance", function($scope, $uibModalInstance){


        $scope.ok = function () {
            $uibModalInstance.close({result : true});
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);