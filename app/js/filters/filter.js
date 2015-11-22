"use strict";

angular.module("memorand.me.filtersModule", [])
	.filter('flagSN', function() {
		return function(input) {
			var yes  = "Si";
			var no = "No";
			if(input !== undefined)
			{
				switch(input)
				{
					case "S" : return yes;
					case "N" : return no;
					case true : return yes;
					case "true" : return yes;
					case false : return no;
					case "false" : return no;
					default : return input;
				}
			}
			else
				return input;
		};
	})
	.filter('objToArray', function() {
		return function(input) {
            var resArray = [];
            for(var key in input)
                resArray.push(input[key]);
			return resArray;
		};
	});

