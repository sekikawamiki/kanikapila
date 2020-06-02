const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const pug = require('gulp-pug');

const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const autoprefixerOption = {
  grid: true
}

const postcssOption = [autoprefixer(autoprefixerOption)]

// const imageminOption = [
//   imageminPngquant({ quality: '65-80' }),
//   imageminMozjpeg({ quality: '80' }),
// ]

gulp.task('sass', () => {
  return gulp.src('./src/scss/common.scss')
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'expanded'
  })
  .on('error', sass.logError)
  )
  .pipe(postcss(postcssOption))
  .pipe(gulp.dest('./dist'))
})


gulp.task('pug', () => {
  return gulp.src('./src/*.pug', '!./src/_*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('./src/scss/*.scss', gulp.series('sass'))
  gulp.watch('./src/*.pug', gulp.series('pug'))
})

// gulp.task('imagemin', () => {
//   return gulp
//   .src('./src/images/*')
//   .pipe(imagemin(imageminOption))
//   .pipe(gulp.dest('./dist/images'))
// })



gulp.task('default', gulp.series(gulp.parallel('watch')))