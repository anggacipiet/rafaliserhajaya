const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Development Images Task (tanpa kompresi)
gulp.task('dev:images', () => {
  return gulp.src(['static/images/**/*'])
    .pipe(gulp.dest('static/images'));
});

// Production Images Task (dengan kompresi)
gulp.task('prod:images', () => {
  return gulp.src(['static/images/**/*'])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('static/images'));
});

// Development CSS Task (tanpa minify)
gulp.task('dev:css', () => {
  return gulp.src(['static/plugins/**/*.css', '!static/plugins/**/*.min.css'])
    .pipe(gulp.dest('static/plugins'));
});

// Production CSS Task (dengan minify)
gulp.task('prod:css', () => {
  return gulp.src(['static/plugins/**/*.css', '!static/plugins/**/*.min.css'])
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: {
        1: {
          specialComments: 0,
          removeEmpty: true,
          removeWhitespace: true
        },
        2: {
          mergeMedia: true,
          removeEmpty: true,
          removeDuplicateFontRules: true,
          removeDuplicateMediaBlocks: true,
          removeDuplicateRules: true,
          removeUnusedAtRules: false
        }
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/plugins'));
});

// Development build
gulp.task('dev', gulp.series('dev:images'));

// Production build
gulp.task('prod', gulp.series('prod:images'));

// Default task (development)
gulp.task('default', gulp.series('dev')); 