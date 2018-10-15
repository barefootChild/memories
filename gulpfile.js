const gulp = require('gulp')
const clean = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const pump = require('pump')

//转译es6业务代码
gulp.task('babel', ['del'], function() {
  gulp.src('src/main/**/*.js', { base: 'src' })
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('src/js'))
})

gulp.task('del', function() {
  clean.sync(['./dist/*', './src/js/main/*'])
})

//先babel 再执行default
gulp.task('default', function() {
  gulp.src('src/**/*.html', { base: 'src' })
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'))

  gulp.src('src/css/**/*.css', { base: 'src' })
      .pipe(cleanCss({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist'))

  pump([
    gulp.src('src/js/**/*.js', { base: 'src' }),
    uglify(),
    gulp.dest('dist')
  ])
})