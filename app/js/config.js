

'use strict';

angular.module("memorand.me")
    .config(["$httpProvider", function ($httpProvider) {
        //Initial Array and object custo function

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return  a.indexOf(i) < 0;});
        };
        Array.prototype.filterDraggable = function(word) {
            return this.filter(function(i) {return  i.indexOf(word) != -1;});
        };


        Object.filter = function( obj, filterKey) {
            var result = {}, key;
            // ---------------^---- as noted by @CMS,
            //      always declare variables with the "var" keyword

            for (key in obj) {
                if (obj.hasOwnProperty(key) && key.indexOf(filterKey)!=-1) {
                    result[key] = obj[key];
                }
            }

            return result;
        };
    }]);
