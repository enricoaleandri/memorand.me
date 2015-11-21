
'use strict';

angular.module('memorand.me.controllersModule.angDragCtrlModule',[])
    .controller('angDragCtrl',['$scope',
		function ($scope) {

			var selfPrivate = {};
            var selfPublic = this
            selfPublic.onStopDragging = function(event, param)
            {
                console.log("antani");
            };
            selfPublic.onDropping = function(event, param)
            {
                selfPublic.postList[selfPublic.postList.length-1].position = {
                    top : param.position.top,
                    left : param.position.left
                };
            };
            selfPrivate.Init = function($scope)
			{

                selfPublic.newPost = {text: 'Add New Post-IT'};
                selfPublic.postList = new Array();
                selfPublic.empty = {text : "test"};

                selfPublic.dragConfig = {
                    animate:true,
                    placeholder : "keep",
                    onStop : 'ctrl.onStopDragging()'
                };

                selfPublic.dropConfig = {
                    onDrop : 'ctrl.onDropping'
                }
			};
            selfPrivate.Init($scope);
    }]);
