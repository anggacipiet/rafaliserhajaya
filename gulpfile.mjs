import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import ttf2woff from 'gulp-ttf2woff';
import fontmin from 'gulp-fontmin';

const sass = gulpSass(dartSass);

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

// Tasks
gulp.task('dev:images', () => {
  return gulp.src([
    'static/images/**/*',
    'static/plugins/slick/ajax-loader.gif'
  ])
  .pipe(gulp.dest('static/images'));
});

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

gulp.task('dev:scss', () => {
  return gulp.src('static/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('static/css'));
});

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

// Optimize fonts
gulp.task('fonts:optimize', () => {
  return gulp.src([
    'static/plugins/slick/fonts/*',
    'static/plugins/themify-icons/fonts/*',
    'static/fonts/*'
  ], { base: 'static' })
  .pipe(fontmin({
    text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
    fontPath: '/fonts/',
    css: {
      fontDisplay: 'swap'
    }
  }))
  .pipe(gulp.dest('static'));
});

// Convert TTF to WOFF
gulp.task('fonts:woff', () => {
  return gulp.src([
    'static/plugins/slick/fonts/*.ttf',
    'static/plugins/themify-icons/fonts/*.ttf',
    'static/fonts/*.ttf'
  ], { base: 'static' })
  .pipe(ttf2woff())
  .pipe(gulp.dest('static'));
});

// Combined fonts task
gulp.task('fonts', gulp.series('fonts:optimize', 'fonts:woff'));

gulp.task('dev:js', () => {
  return gulp.src([
    'static/plugins/jQuery/jquery.min.js',
    'static/plugins/bootstrap/bootstrap.min.js',
    'static/plugins/slick/slick.min.js',
    'static/plugins/venobox/venobox.min.js',
    'static/plugins/google-map/gmap.js',
    'static/js/script.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('static/js'));
});

gulp.task('prod:js', () => {
  const modernBundle = () => {
    return gulp.src([
      'static/plugins/jQuery/jquery.min.js',
      'static/plugins/bootstrap/bootstrap.min.js',
      'static/plugins/slick/slick.min.js',
      'static/plugins/venobox/venobox.min.js',
      'static/plugins/google-map/gmap.js',
      'static/js/script.js'
    ])
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
          targets: { esmodules: true }
        }]
      ]
    }))
    .pipe(concat('bundle.modern.js'))
    .pipe(terser())
    .pipe(gulp.dest('static/js'))
  };

  const legacyBundle = () => {
    return gulp.src([
      'static/plugins/jQuery/jquery.min.js',
      'static/plugins/bootstrap/bootstrap.min.js',
      'static/plugins/slick/slick.min.js',
      'static/plugins/venobox/venobox.min.js',
      'static/plugins/google-map/gmap.js',
      'static/js/script.js'
    ])
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
          targets: '> 0.25%, not dead'
        }]
      ]
    }))
    .pipe(concat('bundle.legacy.js'))
    .pipe(terser())
    .pipe(gulp.dest('static/js'))
  };

  return new Promise((resolve, reject) => {
    gulp.parallel(modernBundle, legacyBundle)((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

// Development build
gulp.task('dev', gulp.series('dev:images', 'dev:scss', 'dev:css', 'dev:js', 'fonts:optimize'));

// Production build
gulp.task('prod', gulp.series('prod:images', 'prod:scss', 'prod:css', 'prod:js', 'fonts'));

// Default task (development)
gulp.task('default', gulp.series('dev')); 