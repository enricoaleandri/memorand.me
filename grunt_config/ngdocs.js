/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    this grunt task runs ngdocs and stroes the result in the doc folder
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks('grunt-ngdocs');

    return {

        options: {
            title: "Memorand.me Docs",
            scripts: [
                "node_modules/angular/angular.js",
            ],
            html5Mode: false,
            dest: "" + options.paths.dist + "/docs"
        },
        all: ["" + options.paths.app + "/js/**/*.js"]
    };
};
