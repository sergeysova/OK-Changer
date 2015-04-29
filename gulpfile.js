var gulp = require('gulp'),
	jade = require('gulp-jade'),
	watch = require('gulp-watch'),
	del = require('del'),
	fs = require('fs'),
	less = require('gulp-less'),
	merge = require('merge-stream'),
	minimist = require('minimist'),
	gulpif = require('gulp-if'),
	zip = require('gulp-zip');


gulp.task('clean', function(cb){
	del(['debug/*'], cb);
});


gulp.task('manifest', function(cb){
	var manifest = fs.readFileSync('source/chrome-manifest.json');
	manifest = JSON.parse(manifest);
	manifest.name = manifest.name + " build";
	fs.writeFileSync('debug/manifest.json', JSON.stringify(manifest, 0, 2), {encoding: 'utf8'});
	cb();
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


gulp.task('build', ['clean', 'manifest', 'js', 'styles', 'locales', 'images', 'templates']);


var knoptions = {
	string: 'ver',
	default: {ver: false}
};

var opts = minimist(process.argv.slice(2), knoptions);

gulp.task('release', ['build'], function(){
	if (opts.ver == false) return false;
	var manifest = fs.readFileSync('debug/manifest.json');
	manifest = JSON.parse(manifest);
	manifest.version = opts.ver;
	fs.writeFileSync('debug/manifest.json', JSON.stringify(manifest, 0, 2), {encoding: 'utf8'});
	return gulp.src(['debug/*', 'debug/**/*', 'debug/**/**/*', 'debug/**/**/**/*'])
		.pipe(zip('okchanger-v'+opts.ver+'-chrome.zip'))
		.pipe(gulp.dest('release'));

});




//gulp.task('default', ['build']);