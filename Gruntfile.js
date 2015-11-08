/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    Grunt configuration file
 */

module.exports = function (grunt) {

    var options = require("./package.json"),
		/**
		 * @desc loads modules with configuration from the grunt_config folder
		 * @param {String} module name of the module which should be load
		 * @returns {function} object with the grunt module and all necessary configuration information
		 */
		loadConfig = function (module) {
		    return require("./grunt_config/" + module)(options, grunt);
		};

    var rimraf = require('rimraf');
    loadConfig("npm"); // loads all node modules
    loadConfig("libs");

    // loads grunt modules which are needed
    grunt.initConfig({
        pkg: options,
        htmlbuild: loadConfig("htmlbuild"),
        watch: loadConfig("watch"),
        sync: loadConfig("sync"),
        clean: loadConfig("clean"),
        connect: loadConfig("connect"),
        template: loadConfig("index_properties"),
        ngdocs: loadConfig("ngdocs"),
        copy: loadConfig("copy")
    });

    // available tasks for grunt
    grunt.registerTask("dependencies", ["npm-install"]);
    grunt.registerTask("sync_dev", ["sync:dev_js", "sync:dev_static", "sync:dev_libs", "sync:fonts_dev", "htmlbuild:dev"]);
    grunt.registerTask("sync_dist", [/*"sync:dist_js",*/ "sync:dist_static", "sync:dist_libs", "sync:fonts_dev"]);
    grunt.registerTask("compile_dev", ["sync_dev", "htmlbuild:dev"]);
    grunt.registerTask("compile_dist", ["sync_dist", /* "ngAnnotate", "uglify", "clean:annotated"*/]);
    grunt.registerTask("dev", ["clean:dev", "compile_dev", "template:dev", /*"jshint", "karma:dev",*/ "configureProxies:server", "connect:server", "watch"]);
    grunt.registerTask("dist", ["dependencies", "clean:dist",  /*"jshint", "karma:dist",*/ "compile_dist", "template:dist", "ngdocs"]);
    //grunt.registerTask("unittest", ["karma:dev"]);
    //grunt.registerTask("e2etest", ["protractor:dev"]);
    grunt.registerTask("ngDocs", ["ngdocs"]);
    //grunt.registerTask("cloneCore", ["clean:coreApp", "shell:gitcore", "copy:core", "clean:core"]);
    //grunt.registerTask("cloneCommon", ["clean:commonJs", "clean:commonLess", "clean:commonPartials", "shell:gitcommon", "copy:commonJs", "copy:commonLess", "copy:commonPartials", "clean:common"]);
    //grunt.registerTask('update', ["cloneCore", "cloneCommon"]);
};
