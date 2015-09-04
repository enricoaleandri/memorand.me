/**
 * @author  Alessandro Aeberli  <alessandro.aeberli@avanade.com>
 * @desc    this grunt task add AngularJS dependency injection annotations.
 * @example
 * angular.module('az-direct-IT-QUOTE-all')
 *  .controller('quoteCtrl', ['$scope', '$location', 'quote', function($scope, $location, quote) {
 *      $scope.quote = quote;
 *      $scope.modData = function () {
 *           $location.path("/");
 *      };
 *  }]);
 */

module.exports = function(options, grunt) {
    grunt.loadNpmTasks("grunt-ng-annotate");

    var paths = options.paths;

    return {
    'az-direct-IT-QUOTE-all': {
            files: [
                {
                    expand: true,
                    src: "js/**/*.js",
                    dest: "" + paths.dist + "/annotated",
                    cwd: paths.app
                }
            ]
        }
    };
};