
'use strict';

angular.module('memorand.me.controllersModule.angDragCtrlModule',[])
    .controller('angDragCtrl',['$scope',
		function ($scope) {

			var self = {};
			self.Init = function($scope)
			{

                $scope.list1 = {title: 'AngularJS - Drag Me'};
                $scope.list2 = {};
			};
			self.Init($scope);
    }]);
