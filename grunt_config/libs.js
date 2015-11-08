/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    this module defines and maps all libs that are needed in dev and dist,
 *          it is used in htmlbuild.js
 */

var _ = require("underscore");

module.exports = function (options) {
    var libs = options.paths.libs,
		cssmapping = [

		],
		mapping = [
            "jquery/dist/jquery.js : jquery/dist/jquery.min.js",
            "underscore/underscore.js : underscore/underscore-min.js",
            "angular/angular.js : angular/angular.min.js",
            "angular-route/angular-route.js : angular-route/angular-route.min.js",
            //"angular-animate/angular-animate.js : angular-animate/angular-animate.min.js",
            //"angular-resource/angular-resource.js : angular-resource/angular-resource.min.js",
            //"angular-cookies/angular-cookies.js : angular-cookies/angular-cookies.min.js",
            //"angular-translate/dist/angular-translate.js : angular-translate/dist/angular-translate.min.js",
            //"angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial.js : angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial.min.js",
            "angular-mocks/angular-mocks.js : ''",
            //"../toolkit/bootstrap.js : ../toolkit/bootstrap.js",
            "moment/moment.js : moment/min/moment.min.js",
            //"spin.js/spin.js : spin.js/spin.min.js",

            "../vendor/codfiscale.js : ../vendor/codfiscale.js",
            // Angular Bootstrap
            /*"angular-bootstrap/dist/ui-bootstrap.js : angular-bootstrap/dist/ui-bootstrap.min.js",
            "angular-bootstrap/dist/ui-bootstrap-tpls.js : angular-bootstrap/dist/ui-bootstrap-tpls.min.js",
            "angular-bootstrap/template/datepicker/datepicker.html.js : angular-bootstrap/template/datepicker/datepicker.html.js",
            "angular-bootstrap/template/datepicker/popup.html.js : angular-bootstrap/template/datepicker/popup.html.js",
            "angular-bootstrap/template/datepicker/day.html.js : angular-bootstrap/template/datepicker/day.html.js",
            "angular-bootstrap/template/datepicker/month.html.js : angular-bootstrap/template/datepicker/month.html.js",
            "angular-bootstrap/template/datepicker/year.html.js : angular-bootstrap/template/datepicker/year.html.js",*/

            //"'' : jquery/dist/jquery.min.map",
            //"'' : angular/angular.min.js.map",
            //"'' : angular-route/angular-route.min.js.map",
            //"'' : angular-animate/angular-animate.min.js.map",
            //"'' : angular-resource/angular-resource.min.js.map",
            //"'' : angular-cookies/angular-cookies.min.js.map"
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
