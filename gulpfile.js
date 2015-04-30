var gulp = require('gulp'),
	jade = require('gulp-jade'),
	watch = require('gulp-watch'),
	rimraf = require('gulp-rimraf'),
	fs = require('fs'),
	less = require('gulp-less'),
	merge = require('merge-stream'),
	minimist = require('minimist'),
	gulpif = require('gulp-if'),
	zip = require('gulp-zip'),
	json = require('jsonsave');

var config = new json.File(__dirname+"/config.json");


gulp.task('clean', function(cb){
	return gulp.src(['./debug/*'], {read: false})
		.pipe(rimraf());
});


gulp.task('manifest', function(){
	var manifest = new json.File('source/chrome-manifest.json');
	manifest.$.name += " build";
	manifest.$.version = '0.0.0.' + ++config.$.build;
	manifest.saveAs('debug/manifest.json');
	config.save();
	return true;
});


gulp.task('js', function(){
	return gulp.src(['source/js/*.js'])
		.pipe(gulp.dest('debug/js'));
});


gulp.task('styles', function(){
	var css = gulp.src(['source/css/*.css'])
		.pipe(gulp.dest('debug/css'));

	var _less = gulp.src(['source/css/*.less'])
		.pipe(less())
		.pipe(gulp.dest('debug/css'));
	return merge(css, _less);
});


gulp.task('images', function(){
	return gulp.src(['source/img/*'])
		.pipe(gulp.dest('debug/img'));
});


gulp.task('locales', function(){
	return gulp.src(['source/_locales/**/*.json'])
		.pipe(gulp.dest('debug/_locales'));
});


gulp.task('templates', function(){
	return gulp.src(['source/*.jade'])
		.pipe(jade())
		.pipe(gulp.dest('debug'));
});


gulp.task('build', ['manifest', 'js', 'styles', 'locales', 'images', 'templates']);

var opts = minimist(process.argv.slice(2));

gulp.task('release', function(){
	if (!opts.ver) throw new Error('Where is --ver 0.0.0 of release?');

	// Set new build
	var vv = opts.ver.split('.');
	vv[3] = config.$.build;
	opts.ver = vv.join('.');

	// Update manifest
	var manifest = new json.File('debug/manifest.json');
	manifest.$.name = "OK Changer";
	manifest.$.version = opts.ver;
	if (opts.beta) {
		manifest.$.name += " beta";
	}

	var pkg = new json.File(__dirname+'/package.json');
	vv.splice(3,1);
	pkg.$.version = vv.join('.');
	pkg.save();

	// Save
	manifest.save();
	return gulp.src(['debug/*', 'debug/**/*', 'debug/**/**/*', 'debug/**/**/**/*'])
		.pipe(zip('okchanger_'+opts.ver+(opts.beta ? '-beta' : '')+'-chrome.zip'))
		.pipe(gulp.dest('release'));
});




//gulp.task('default', ['build']);