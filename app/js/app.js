/**
 * @ngdoc overview
 * @name memorand.me
 * @author  Enrico Aleandri
 * @description Creates the az-direct-IT-QUOTE-all module and injects all dependencies
 */

'use strict';

angular.module('memorand.me', [
    'ngRoute',
    'ngDragDrop',
    'firebase',
	'memorand.me.controllersModule',
	'memorand.me.servicesModule',
	"memorand.me.filtersModule",
    "memorand.me.directivesModule",
    "memorand.me.loggerModule"
]);
