/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    this grunt task copy the changed files from the source to the destination folder
 */

var _= require("underscore");

module.exports = function(options, grunt) {

	grunt.loadNpmTasks("grunt-sync");

	var paths = options.paths;

	return {
		dev_js: {
			files: [
				{
					expand: true,
					src: "js/**/*.js",
					cwd: paths.app,
					dest: paths.dev + "/app"
				}
			]
		},
		dev_libs:{
			files: [
				{
					expand: true,
					cwd: paths.libs_src,
					src: options.jsLibs,
					dest: "" + paths.dev + "/lib"
				}
			]
		},
		dev_static: {
			files: [
				{
					expand: true,
					src: ["**/*.{ico,png,jpg,jpeg,bmp,gif}", "fonts/**/*", "css/**/*", "mocks/**/*", "partials/**/*", "toolkit/**/*"],
					cwd: paths.app,
					dest: paths.dev + "/app"
				}
			].concat(options.staticLibs.map(function(lib) {
					return _.extend({
						dest: paths.dev
					}, lib);
				}))
		},
		fonts_dev: {
			files: [
				{
					expand: true,
					cwd: "" + paths.libs_src + "/bootstrap/dist",
					src: "fonts/**/*",
					dest: "" + paths.dev + "/lib/bootstrap/dist"
				}
			]
		},
		dist_js: {
			files: [
				{
					expand: true,
					src: "js/**/*.js",
					cwd: paths.app,
					dest: "" + paths.dist + "/app"
				}
			]
		},
		dist_libs:{
			files: [
				{
					expand: true,
					cwd: paths.libs_src,
					src: options.jsLibsMin,
					dest: "" + paths.dist + "/lib"
				}
			]
		},
		dist_static: {
			files: [
				{
				    expand: true,
                    // substitute this row to add mocks
					src: ["**/*.{ico,png,jpg,jpeg,bmp,gif}", "fonts/**/*","css/**/*", "partials/**/*"],
					cwd: paths.app,
					dest: "" + paths.dist + "/app"
				}
			].concat(options.staticLibs.map(function(lib) {
					return _.extend({
						dest: paths.dist
					}, lib);
				}))
		},
		fonts_dist: {
			files: [
				{
					expand: true,
					cwd: "" + paths.libs_src + "/bootstrap/dist",
					src: "fonts/**/*",
					dest: "" + paths.dist + "/lib/bootstrap/dist"
				}
			]
		}
	};
};
