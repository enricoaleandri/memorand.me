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
	.filter('flagFM', function() {
		return function(input) {
			return input[0] == 'F'? 'Femmina' : 'Maschio';
		};
	})
	.filter('flagNessuno', function() {
		return function(input) {
			if(input)
				return input == "0" ? 'Nessuno' : input;
			else
				return "";
		};
	});


