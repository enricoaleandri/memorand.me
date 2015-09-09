/**
 * @ngdoc controller
 * @name emptyNgApp.controller:quoteCtrl
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @description Creates the controller for the quote view
 * @requires $scope
 * @requires $location
 * @param {Number} quote The quote which is returned form the quoteService
 * @param {Object} $scope The scope of the controller, used to access the view
 * @param {Object} $location Gives you access to the location object (used to manipulate the current path)
 */

'use strict';

angular.module('memorand.me.controllersModule.homeCtrlModule',[])
    .controller('homeCtrl',['$scope', '$location', 'objectModel',
		function ($scope, $location, objectModel) {

			var self = {};
			self.Function = function(driverFormula)
			{
				if(driverFormula == "N")
					return false;
				else
					return true;
			};

			self.Init = function($scope, _objectModel)
			{
				$scope.objectModel = _objectModel;

				$scope.driverFormulaCheck = this.Function;
				$scope.moment = window.moment;
			};
			self.Init($scope, objectModel);
    }]);
