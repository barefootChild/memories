const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const pump = require('pump')

gulp.task('default', function(cb) {
  pump([
    gulp.src('src/index.js'),
    babel({
      presets: ['@babel/env']
    }),
    uglify(),
    gulp.dest('dist')
  ], cb)
})