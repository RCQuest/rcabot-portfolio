var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var runSeq = require('run-sequence');
var angularFilesort = require('gulp-angular-filesort')

gulp.task('bower update', function() {
  	return bower();
});

gulp.task('bower',['bower update'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('bower font', function(){
	return gulp.src('./bower_components/fira/{eot,otf,ttf,woff}/*.*')
			   .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('assets',function(){
	return gulp.src('./src/assets/*.*')
			   .pipe(gulp.dest('./dist/assets'));
});

gulp.task('scripts',function(){
	return gulp.src('./src/scripts/*.*')
			   .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function(){
	return del('./dist');
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('index move', function() {
	var target = gulp.src('./src/index.html');
  	return target.pipe(gulp.dest('./dist'));
})

gulp.task('index css', function () {
  var csssources = gulp.src([
  	'./dist/**/*.css'
  ],{read:false});

  return gulp.src('./dist/index.html')
		 .pipe(inject(csssources,
		 	{relative:true}))
		 .pipe(gulp.dest('./dist'));
});

gulp.task('index js', function () {
  var jssources = gulp.src([
  	'./dist/**/*.js'
  ]);

  return gulp.src('./dist/index.html')
		 .pipe(inject(jssources
		 	.pipe(angularFilesort()),
		 	{relative:true}))
		 .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
  return connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('default',['connect','clean'], function(callback){
	return runSeq('bower',
				  'bower font',
				  'assets',
				  'sass',
				  'scripts',
				  'index move',
				  'index js',
				  'index css',
				  callback);
});