var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del')
gulp.task('bower', function() {
  	return bower();
});

gulp.task('clean', function(){
	return del('./dist');
});

gulp.task('index',['clean'],function(){
	return gulp.src('./src/index.html')
		   	   .dest('./dist');
});

gulp.task('default',['index'], function(){
	return;
});