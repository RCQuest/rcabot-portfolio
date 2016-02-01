var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');

gulp.task('bower update', function() {
  	return bower();
});

gulp.task('bower',['bower update','clean'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('clean', function(){
	return del('./dist');
});

gulp.task('index',['bower'],function(){
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: true
	}));
});

gulp.task('default',['webserver','index'], function(){
	return;
});