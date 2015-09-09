

'use strict';

angular.module("memorand.me")
    .config(["$httpProvider", function ($httpProvider) {

		//disable IE ajax request caching
		//$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

		// extra
		//$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
		//$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }]);
