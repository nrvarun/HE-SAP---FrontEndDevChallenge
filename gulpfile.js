'use strict';

var gulp              = require('gulp');
var gutil             = require('gulp-util');
var browserSync       = require('browser-sync').create();
var sass              = require('gulp-sass');
var inject            = require('gulp-inject');
var useref            = require('gulp-useref');
var autoprefixer      = require('gulp-autoprefixer');
var cssbeautify       = require('gulp-cssbeautify');

var paths = {
     html           : ['./app/**/*.html'],
     sass           : ['./app/scss/*.scss'],
     javascript     : [
                         './app/**/*.js',
                         '!./app/js/app.js',
                         '!./app/lib/**'
                      ],
     css            : './app/css/*.css'
 };

gulp.task('default',['watch','useref','sass'], function(){
	gutil.log("Gulp is running");
});

gulp.task('index', function(){
     return gulp.src('./app/index.html')
         .pipe(inject(
             gulp.src(paths.javascript,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('./app'))
         .pipe(inject(
             gulp.src(paths.css,
             {read: false}), {relative: true}))
         .pipe(gulp.dest('./app'));
 });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('sass', function(){
    return gulp.src(paths.sass)
               .pipe(sass().on('error',sass.logError))
               .pipe(autoprefixer())
               .pipe(cssbeautify())
               .pipe(gulp.dest('./app/css/'))
               .pipe(browserSync.stream()); 
});


gulp.task('watch',['browserSync'],function(){
	gulp.watch(paths.sass,['sass']);
	gulp.watch(paths.html, browserSync.reload); 
  gulp.watch(paths.javascript,browserSync.reload); 
});

gulp.task('useref',function(){
  return gulp.src('./app/index.html')
             .pipe(useref())
             .pipe(gulp.dest('./dist'));
});