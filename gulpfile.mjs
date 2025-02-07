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
import fontmin from 'gulp-fontmin';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { promisify } from 'util';
import glob from 'glob';

const sass = gulpSass(dartSass);
const globPromise = promisify(glob);

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
  const src = [
    'static/images/**/*',
    'static/plugins/slick/ajax-loader.gif'
  ];

  return new Promise(async (resolve, reject) => {
    try {
      const files = await globPromise(src);
      
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
          const outputWebP = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const outputAvif = file.replace(/\.(jpg|jpeg|png)$/i, '.avif');
          
          await sharp(file)
            .resize(1920, null, { 
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: 80 })
            .toFile(outputWebP);
          
          await sharp(file)
            .resize(1920, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .avif({ quality: 80 })
            .toFile(outputAvif);
          
          // Original format with optimization
          await sharp(file)
            .resize(1920, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .jpeg({ quality: 80, progressive: true })
            .toFile(file.replace(/\.(jpg|jpeg)$/i, '.jpg'));
          
          await sharp(file)
            .resize(1920, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .png({ quality: 80, progressive: true })
            .toFile(file.replace(/\.png$/i, '.png'));
        }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
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
  const plugins = gulp.src([
    'static/plugins/animate/animate.css',
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

  // Handle Bootstrap separately for critical CSS
  const bootstrap = gulp.src('static/plugins/bootstrap/bootstrap.min.css')
    .pipe(postcss([
      autoprefixer(),
      purgecss({
        ...purgeCSSConfig,
        safelist: {
          ...purgeCSSConfig.safelist,
          deep: [/^container/, /^row/, /^col/, ...purgeCSSConfig.safelist.deep]
        }
      })
    ]))
    .pipe(cleanCSS(cssOptions))
    .pipe(rename({ suffix: '.critical' }))
    .pipe(gulp.dest('static/plugins/bootstrap'));

  return gulp.parallel(plugins, bootstrap)();
});

// Font task
gulp.task('fonts', () => {
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
gulp.task('dev', gulp.series('dev:images', 'dev:scss', 'dev:css', 'dev:js', 'fonts'));

// Production build
gulp.task('prod', gulp.series('prod:images', 'prod:scss', 'prod:css', 'prod:js', 'fonts'));

// Default task (development)
gulp.task('default', gulp.series('dev')); 