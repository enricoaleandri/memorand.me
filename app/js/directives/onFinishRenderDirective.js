/**
 * Created by Enrico on 21/11/2015.
 */
angular.module('memorand.me.directivesModule.onFinishRenderModule', [])
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });