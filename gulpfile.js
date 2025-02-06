const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const sass = require('gulp-sass')(require('sass'));

// PurgeCSS config
const purgeCSSConfig = {
  content: [
    'layouts/**/*.html',
    'content/**/*.md'
  ],
  safelist: {
    standard: [/^slick-/, /^venobox/, /^ti-/, /^animate/],
    deep: [/^modal/, /^show/, /^active/, /^nav/, /^dropdown/],
    greedy: [/^slick/, /^venobox/, /^animate/]
  }
};

// CSS optimization options
const cssOptions = {
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
      removeUnusedAtRules: true
    }
  }
};

// Development Images Task
gulp.task('dev:images', () => {
  return gulp.src([
    'static/images/**/*',
    'static/plugins/slick/ajax-loader.gif'
  ])
  .pipe(gulp.dest('static/images'));
});

// Production Images Task
gulp.task('prod:images', () => {
  return gulp.src([
    'static/images/**/*',
    'static/plugins/slick/ajax-loader.gif'
  ])
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

// Development SCSS Task
gulp.task('dev:scss', () => {
  return gulp.src('static/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('static/css'));
});

// Production SCSS Task
gulp.task('prod:scss', () => {
  return gulp.src('static/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      purgecss(purgeCSSConfig)
    ]))
    .pipe(cleanCSS(cssOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/css'));
});

// Development CSS Task
gulp.task('dev:css', () => {
  return gulp.src([
    'static/plugins/animate/animate.css',
    'static/plugins/bootstrap/bootstrap.min.css',
    'static/plugins/slick/slick.css',
    'static/plugins/themify-icons/themify-icons.css',
    'static/plugins/venobox/venobox.css'
  ])
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest('static/plugins'));
});

// Production CSS Task
gulp.task('prod:css', () => {
  return gulp.src([
    'static/plugins/animate/animate.css',
    'static/plugins/bootstrap/bootstrap.min.css',
    'static/plugins/slick/slick.css',
    'static/plugins/themify-icons/themify-icons.css',
    'static/plugins/venobox/venobox.css'
  ])
  .pipe(postcss([
    autoprefixer(),
    purgecss(purgeCSSConfig)
  ]))
  .pipe(cleanCSS(cssOptions))
  .pipe(rename(function(path) {
    if (!path.basename.endsWith('.min')) {
      path.basename += '.min';
    }
  }))
  .pipe(gulp.dest('static/plugins'));
});

// Copy Fonts Task
gulp.task('copy:fonts', () => {
  return gulp.src([
    'static/plugins/slick/fonts/*',
    'static/plugins/themify-icons/fonts/*',
    'static/fonts/*'
  ])
  .pipe(gulp.dest('static/fonts'));
});

// Development build
gulp.task('dev', gulp.series('dev:images', 'dev:scss', 'dev:css', 'copy:fonts'));

// Production build
gulp.task('prod', gulp.series('prod:images', 'prod:scss', 'prod:css', 'copy:fonts'));

// Default task (development)
gulp.task('default', gulp.series('dev')); 