const gulp = require('gulp')
const clean = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const pump = require('pump')
const sass = require('gulp-sass')

gulp.task('sass', function() {
  gulp.src('./src/scss/main/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./product/css'))
})

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass'])
})

//转译es6业务代码
gulp.task('babel', ['del'], function() {
  gulp.src('src/main/**/*.js', { base: 'src' })
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('product/js'))
})

gulp.task('del', function() {
  clean.sync(['./dist/*', './product/js/main/*'])
})

//先babel 再执行default
gulp.task('default', function() {
  gulp.src('src/**/*.html', { base: 'src' })
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'))

  gulp.src('product/css/**/*.css', { base: 'product' })
      .pipe(cleanCss({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist'))

  gulp.src('src/assets/*', { base: 'src' })
      .pipe(gulp.dest('dist'))

  pump([
    gulp.src('product/js/**/*.js', { base: 'product' }),
    uglify(),
    gulp.dest('dist')
  ])
})