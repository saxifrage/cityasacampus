var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  ngAnnotate = require('gulp-ng-annotate'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  runSeq = require('run-sequence');

gulp.task('js-vendors', function() {
  return gulp.src([
      './node_modules/angular/angular.min.js',
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/moment/min/moment.min.js',
      './node_modules/angular-filter/dist/angular-filter.min.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('js-app', function() {
  return gulp.src([
      './app/**/**.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/**.js', ['js-app']);
  gulp.watch('./app/**/**.scss', ['css-app']);
  gulp.watch('./app/**/**.html', ['templates']);
});

gulp.task('css-app', function() {
  return gulp.src('./app/index.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(cssmin())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
  return gulp.src('./app/**/**.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('images', function() {
  return gulp.src('./app/**/**.{gif,png,jpeg,jpg,svg,ico}')
    .pipe(gulp.dest('./build'));
});

gulp.task('buildToPublic', function() {
  return gulp.src('./build/**/**')
    .pipe(gulp.dest('../public')); //will eventually be @ `../public/client`
});

gulp.task('default', function(next) {
  runSeq([
      'js-vendors',
      'js-app',
      'templates',
      'images',
      'css-app'
    ], 'buildToPublic',
    'watch',
    next);
});

gulp.task('production', function(next) {
  runSeq([
      'js-vendors',
      'js-app',
      'templates',
      'images',
      'css-app'
    ], 'buildToPublic',
    next);
});
