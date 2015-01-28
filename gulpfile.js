var gulp = require('gulp')
var less = require('gulp-less')
var autoprefix = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var browserSync = require('browser-sync')
var watchify = require('watchify')
var browserify = require('browserify')
var to5ify = require('6to5ify')

var browserifier = browserify(watchify.args, { debug: true })
    .transform(to5ify.configure({
      sourceMapRelative: __dirname
    }))
    .require('./clientapp', { entry: true })

var makeBundle = function (bundler) {
  return function () {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public'))
  }
}

gulp.task('js', function () {
  var bundle = makeBundle(browserifier)
  bundle()
})

gulp.task('css', function () {
  gulp.src('clientapp/styles/index.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
    .pipe(minifycss({ advanced: true }))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('bs-reload', function () {
  browserSync.reload()
})

gulp.task('run', ['js', 'css'], function() {
  var watchifier = watchify(browserifier)
  var bundle = makeBundle(watchifier)
  watchifier.on('update', bundle)

  gulp.watch('clientapp/**/*.less', ['styles'])
  gulp.watch('public/*.html', ['bs-reload'])
  gulp.watch('public/bundle.js', ['bs-reload'])

  browserSync({
    server: { baseDir: './public' },
    open: false
  })
})
