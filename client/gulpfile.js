var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runSeq = require('run-sequence');

var buildLocation = '../public';
var appLocation = './app';
var npmLocation = './node_modules';

var tasks = {
  JS_VENDORS: 'js-vendors',
  JS_APP: 'js-app',
  WATCH: 'watch',
  CSS_APP: 'css-app',
  TEMPLATES: 'templates',
  IMAGES: 'images',
  DEFAULT: 'default',
  PRODUCTION: 'production'
};

gulp.task(tasks.JS_VENDORS, function() {
  return gulp.src([
      npmLocation + '/angular/angular.min.js',
      npmLocation + '/angular-route/angular-route.min.js',
      npmLocation + '/jquery/dist/jquery.min.js',
      npmLocation + '/masonry-layout/dist/masonry.pkgd.min.js',
      npmLocation + '/moment/min/moment.min.js',
      npmLocation + '/angular-filter/dist/angular-filter.min.js',
      appLocation + '/shared/modernizr/modernizr.js',
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildLocation));
});

gulp.task(tasks.JS_APP, function() {
  return gulp.src([
      '!' + appLocation + '/shared/modernizr/modernizr.js',
      appLocation + '/**/**.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildLocation));
});

gulp.task(tasks.WATCH, function() {
  gulp.watch(appLocation + '/**/**.js', [tasks.JS_APP]);
  gulp.watch(appLocation + '/**/**.scss', [tasks.CSS_APP]);
  gulp.watch(appLocation + '/**/**.html', [tasks.TEMPLATES]);
});

gulp.task(tasks.CSS_APP, function() {
  return gulp.src(appLocation + '/index.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(cssmin())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(buildLocation));
});

gulp.task(tasks.TEMPLATES, function() {
  return gulp.src(appLocation + '/**/**.html')
    .pipe(gulp.dest(buildLocation));
});

gulp.task(tasks.IMAGES, function() {
  return gulp.src(appLocation + '/**/**.{gif,png,jpeg,jpg,svg,ico}')
    .pipe(gulp.dest(buildLocation));
});

gulp.task(tasks.DEFAULT, function(next) {
  runSeq([
      tasks.JS_VENDORS,
      tasks.JS_APP,
      tasks.TEMPLATES,
      tasks.IMAGES,
      tasks.CSS_APP
    ],
    tasks.WATCH,
    next);
});

gulp.task(tasks.PRODUCTION, function(next) {
  runSeq([
      tasks.JS_VENDORS,
      tasks.JS_APP,
      tasks.TEMPLATES,
      tasks.IMAGES,
      tasks.CSS_APP
    ],
    next);
});
