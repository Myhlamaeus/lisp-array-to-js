var gulp = require('gulp')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
var replace = require('gulp-replace')
var path = require('path')
var main = path.basename(require('./package.json').main)
require('babel/register')

gulp.task('build', function () {
  return gulp.src('{' + main + ',cli.js,lib/**/*.js}')
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(replace(/#!\/usr\/bin\/env babel-node/, '#!/usr/bin/env node'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', function () {
  var mocha = require('gulp-mocha')

  return gulp.src('test/*.js', {read: false})
    .pipe(mocha())
})
