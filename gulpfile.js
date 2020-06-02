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

const imageminOption = [
  imageminPngquant({
    quality: [.65, .8]
  }),
  imageminMozjpeg({
    quality: [80]
  })
]

//画像圧縮
gulp.task('imagemin', () => {
  return gulp
  .src('./src/images/*')
  .pipe(imagemin(imageminOption))
  .pipe(gulp.dest('./dist/images'))
})

//sass
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

//pug
gulp.task('pug', () => {
  return gulp.src('./src/*.pug', '!./src/_*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
})

//watchで監視
gulp.task('watch', () => {
  gulp.watch('./src/scss/*.scss', gulp.series('sass'))
  gulp.watch('./src/*.pug', gulp.series('pug'))
})


gulp.task('default', gulp.series(gulp.parallel('watch')))