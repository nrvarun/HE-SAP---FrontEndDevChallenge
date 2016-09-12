'use strict';

var gulp              = require('gulp');
var gutil             = require('gulp-util');
var browserSync       = require('browser-sync').create();
var sass              = require('gulp-sass');
var inject            = require('gulp-inject');
var useref            = require('gulp-useref');
var autoprefixer      = require('gulp-autoprefixer');
var cssbeautify       = require('gulp-cssbeautify');
var uncss             = require('gulp-uncss');
var gulpif            = require('gulp-if');
var jsmin             = require('gulp-jsmin');
var cssmin            = require('gulp-cssmin');
var rename            = require('gulp-rename');
var uglify            = require('gulp-uglify');
var concat            = require('gulp-concat');

var paths             = {
                             html           : ['./app/**/*.html'],
                             sass           : ['./app/scss/*.scss'],
                             javascript     : [
                                                 './app/js/*.js',
                                                 './app/js/app.*.js',
                                                 '!./app/js/app.js',
                                                 '!./app/lib/**'
                                              ],
                             css            : './app/css/*.css'
                         };

gulp.task('default',['watch','sass'], function(){
	gutil.log("Gulp is running");
});

/*gulp.task('index', function () {
  var target = gulp.src('./app/index.html');

  var sources = gulp.src(['./app/js/*.js','./css/*.css'], {read: false});

  return target.pipe(inject(sources))
               .pipe(gulp.dest('./app'));
  });*/

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  })
});

gulp.task('sass', function(){
    return gulp.src(paths.sass)
               .pipe(sass().on('error',sass.logError))
               .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
               .pipe(cssbeautify())
               .pipe(gulp.dest('./app/css/'))
               .pipe(browserSync.stream()); 
});


gulp.task('watch',['browserSync'],function(){
	gulp.watch(paths.sass,['sass']);
	gulp.watch(paths.html, browserSync.reload); 
  gulp.watch(paths.javascript,browserSync.reload); 
});

gulp.task('copy', function(){
  gulp.src(['app/**/*.*',
            '!app/scss/*.*',
            '!app/css/*.*',
            '!app/js/**/*.*'
          ])
        .pipe(gulp.dest('dist'));
})

gulp.task('uncss', function(){
  gulp.src([
            'app/css/style.css',
            'app/css/font-awesome.min.css',
            'app/css/material.brown-red.min.css',
            ])
      .pipe(uncss({
              html: ['app/index.html','app/views/home.html']
          }))
      .pipe(gulp.dest('./dist/css'));
});

/*gulp.task('useref', function(){
  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulpif('*.*.js',uglify())
    .pipe(gulp.dest('dist'));
});*/

gulp.task('jsmin',function(){
  gulp.src(['app/**/*.js','app/**/*.*.js'])
      .pipe(jsmin())
      .pipe(concat('app.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function(){
     gulp.src('app/css/*.css')
          .pipe(cssmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('dist/css'));
});

gulp.task('prod',['copy','uncss','cssmin','jsmin'], function(){
  console.log('Production work is almost done :)');
});
