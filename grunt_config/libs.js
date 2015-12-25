/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    this module defines and maps all libs that are needed in dev and dist,
 *          it is used in htmlbuild.js
 */

var _ = require("underscore");

module.exports = function (options) {
    var libs = options.paths.libs,
		cssmapping = [
            "bootstrap/dist/css/bootstrap.css : bootstrap/dist/css/bootstrap.css"
		],
		mapping = [
            "jquery/dist/jquery.js : jquery/dist/jquery.min.js",
            "underscore/underscore.js : underscore/underscore-min.js",
            "angular/angular.js : angular/angular.min.js",
            "angular-animate/angular-animate.js : angular-animate/angular-animate.js",
            "angular-route/angular-route.js : angular-route/angular-route.min.js",
            "firebase/lib/firebase-web.js : firebase/lib/firebase-web.js",
            "angularfire/dist/angularfire.js : angularfire/dist/angularfire.js",
            "angular-mocks/angular-mocks.js : ''",
            "angular-ui-bootstrap/ui-bootstrap.min.js : angular-ui-bootstrap/ui-bootstrap.min.js",
            "moment/moment.js : moment/min/moment.min.js",
            //"spin.js/spin.js : spin.js/spin.min.js",

            "../app/libs/log4javascript.1.4.11.js : ../app/libs/log4javascript.1.4.11.js",
            "../app/libs/angular-dragdrop/angular-dragdrop.js : ../app/libs/angular-dragdrop/angular-dragdrop.js",
            "../app/libs/jquery-ui/jquery-ui.js : ../app/libs/jquery-ui/jquery-ui.js",
		],
		staticLibs = [
			{
			    cwd: "" + libs + "/bootstrap",
			    src: "fonts/*"
			}
		];

    options.cssLibs = cssmapping.map(function (lib) {
        return lib.replace(/\s*:.*/, "");
    });

    options.cssLibsMin = cssmapping.map(function (lib) {
        return lib.replace(/.*:\s*/, "");
    });

    options.jsLibs = mapping.map(function (lib) {
        return lib.replace(/\s*:.*/, "");
    });

    options.jsLibsMin = mapping.map(function (lib) {
        return lib.replace(/.*:\s*/, "");
    });

    return options.staticLibs = staticLibs.map(function (lib) {
        return _.extend(lib, {
            expand: true
        });
    });
};
