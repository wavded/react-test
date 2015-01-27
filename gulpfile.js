var gulp = require('gulp')
var less = require('gulp-less')
var autoprefix = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var nodemon = require('nodemon')

gulp.task('styles', function () {
  gulp.src('clientapp/styles/index.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
    .pipe(minifycss({ advanced: true }))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('scripts', function () {
  browserify({
    entries: ['./clientapp'],
    debug: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public'))
})

gulp.task('run', ['scripts', 'styles'], function() {
  gulp.watch('clientapp/**/*.js', ['scripts'])
  gulp.watch('clientapp/**/*.less', ['styles'])

  nodemon({
    script: './',
    ext: 'noop'
  }).on('restart', function() {
    console.log('restarted!')
  })
})