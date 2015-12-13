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
    .controller('homeCtrl',['$scope', '$location','$compile','$firebaseObject','$timeout','$routeParams','config',
		function ($scope, $location, $compile, $firebaseObject, $timeout ,$routeParams, config) {

            var selfPrivate = {};
            var selfPublic = this;

            selfPublic.submitLogin = function(username, password)
            {
                selfPublic.loginForm.error = "";
                selfPrivate.fireBaseObject.authWithPassword({
                    email    : username,
                    password : password
                }, function(error, authData) {

                    selfPublic.authData = selfPrivate.fireBaseObject.getAuth();
                    if(error)
                        selfPublic.loginForm.error = error;
                    $scope.$apply();
                }, {
                    remember: "sessionOnly"
                });
            };
            selfPublic.submitLogout = function()
            {
                selfPrivate.fireBaseObject.unauth();
                selfPublic.authData = selfPrivate.fireBaseObject.getAuth();
            }
            selfPrivate.Init = function($scope )
            {
                 selfPrivate.fireBaseObject = new Firebase("https://"+config.firebaseId+".firebaseio.com/post");
                 selfPublic.authData = selfPrivate.fireBaseObject.getAuth();

                // download the data into a local object
                 var syncObject= $firebaseObject(selfPrivate.fireBaseObject);
                // synchronize the object with a three-way data binding
                // click on `index.html` above to see it used in the DOM!
                syncObject.$bindTo($scope, "ctrl.listPost")
                selfPublic.listPostFromFire = {};
                selfPublic.searchBar = "";
                selfPublic.currentPost = $routeParams.ui_id;
                $scope.window = window;

                syncObject.$loaded(
                    function(data) {
                        //console.log(data === obj); // true
                        selfPublic.listPostFromFire = Object.filter(data,"draggable");
                    },
                    function(error) {
                        console.error("Error:", error);
                    }
                );
                //selfPublic.listPost = {};

                var editPostIt = function(event){
                    var post = $(event.currentTarget);
                    var text = post.find("[name=_text]");
                    var label = post.find(".text");
                    text.show();
                    text.focus();
                    label.hide();
                    var getCaret = function (el) {
                        if (el.selectionStart) {
                            return el.selectionStart;
                        } else if (document.selection) {
                            el.focus();
                            var r = document.selection.createRange();
                            if (r == null) {
                                return 0;
                            }
                            var re = el.createTextRange(), rc = re.duplicate();
                            re.moveToBookmark(r.getBookmark());
                            rc.setEndPoint('EndToStart', re);
                            return rc.text.length;
                        }
                        return 0;
                    };
                    var closeAndSubmit = function(event)
                    {
                        var id = $(event.currentTarget).parent().attr("id");
                        //selfPublic.listPost[id].text = text.val();
                        label.html(text.val());
                        text.hide();
                        label.show();
                    };
                    text.focusout(closeAndSubmit);
                    text.keypress(function (e) {
                        if (e.which == 13) {
                            var content = this.value;
                            var caret = getCaret(this);
                            if(e.shiftKey){
                                e.stopPropagation();
                                this.value = content.substring(0, caret) + "<br/>";
                            } else {
                                //this.value = content.substring(0, caret ) + content.substring(caret, content.length);
                                closeAndSubmit(e);
                            }
                        }
                    });
                };


                var configDraggablePostedIt = {
                    start : function(event,ui){
                        console.log("start");
                    },
                    stop : function(event, ui){
                        console.log("end");

                    },
                    drag : function(event, ui){
                        $scope.ctrl.listPost[ui.helper.attr("id")].position = ui.position;
                        $scope.$apply();

                    }
                };
                var configDraggableNewPost = {
                    start: function( event, ui ) {
                    },
                    stop: function( event, ui ) {

                        var replaced = $(ui.helper[0].outerHTML);
                        var i;
                        for(i = 0; angular.isDefined(selfPublic.listPost["draggable"+i]); i++ );
                        var newId = "draggable"+i;
                        selfPublic.listPost[newId] = {
                            text: "Drag me",
                            position : ui.position,
                            "ui_id" :"draggable"+i
                        };

                        replaced.insertBefore($("#ancor-post-it"));
                        replaced.removeAttr("style");
                        ui.helper.attr("id", newId)
                        ui.helper.attr("ng-hide", "ctrl.searchBar != '' &&  ctrl.listPost['"+newId+"'].text.indexOf(ctrl.searchBar) ==-1");

                        ui.helper.find("[name=_text]").attr("ng-model", "ctrl.listPost['"+newId+"'].text");
                        ui.helper.css("left",ui.helper.css("left").substring(0,ui.helper.css("left").length-2)-300);


                        ui.helper.detach().appendTo($(".working-desk"));
                        ui.helper.replaceWith($compile(ui.helper[0].outerHTML)($scope));

                        $("#"+newId).draggable(configDraggablePostedIt);
                        $("#"+newId).dblclick(editPostIt);

                        replaced.draggable(configDraggableNewPost);

                        $("#"+newId).dblclick();
                    }
                }
                $( "#draggable" ).draggable(configDraggableNewPost);

                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

                    var filtred = Object.keys(selfPublic.listPostFromFire).filterDraggable("draggable");

                    for (var i=0; i<filtred.length; i++) {
                        $("#" + filtred[i]).draggable(configDraggablePostedIt);
                        $("#" + filtred[i]).dblclick(editPostIt);
                    }


                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.5&appId=1640255559579852";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'))

                    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs')

                });

                /*$scope.$watch('ctrl.listPostFromFire', function(newVal,oldVal) {
                    $timeout(function() {

                        if(newVal !== undefined && oldVal !== undefined) {
                            for (var post in Object.keys(oldVal).diff(Object.keys(newVal))) {
                                $("#" + post).draggable(configDraggablePostedIt);
                            }
                        }
                        if(newVal !== undefined && oldVal === undefined) {
                            var filtred = Object.keys(newVal).filterDraggable();

                            for (var i=0; i<filtred.length; i++) {
                                $("#" + filtred[i]).draggable(configDraggablePostedIt);
                                $("#" + filtred[i]).dblclick(editPostIt);
                            }
                        }

                    }, 1000, true);
                }, true);
*/
            };
            selfPrivate.Init($scope);
    }]);
