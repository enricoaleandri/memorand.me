/**
 * @author  Alessandro Aeberli  <alessandro.aeberli@avanade.com>
 * @desc    this grunt task clone the core repository expressed in your package.json (paths/core) into the
 * ./az-direct-IT-JS-core directory, and replace the app/js/core with the files dowloaded from the core repository
 *
 */
module.exports = function (options, grunt) {
	grunt.loadNpmTasks('grunt-shell');
	var rimraf = require('rimraf');
	var ncp = require('ncp');

	function callb(err, stdout, stderr, cb) {
		if (err)
			throw err;

		console.log('git cloned succesfully!');
		cb();
	}

	var branch = options.paths.branchCore;
	if (grunt.option('branch') !== undefined) {
		branch = grunt.option('branch');
	}
	return {
		gitcore: {
			command: 'git clone -b ' + branch + ' ' + options.paths.coreRepository
		},
		gitcommon: {
			command: 'git clone -b ' + branch + ' ' + options.paths.commonRepository
		},
		options: {
			callback: callb
		}
	}
}


