/**
 * @ngdoc overview
 * @name az-direct-IT-QUOTE-all
 * @author  Enrico Aleandri
 * @description Creates the az-direct-IT-QUOTE-all module and injects all dpendencies
 */

'use strict';

angular.module('memorand.me', [
    'ngRoute',
    'ngCookies',
	'memorand.me.controllersModule',
	'memorand.me.servicesModule',
	"memorand.me.filtersModule"
]);
