const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
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

// gulp.task('imagemin', () => {
//   return gulp
//   .src('./src/images/*')
//   .pipe(imagemin(imageminOption))
//   .pipe(gulp.dest('./dist/images'))
// })

gulp.task('watch', () => {
  return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.series(gulp.parallel('watch')))