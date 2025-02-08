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
import { glob } from 'glob';

const sass = gulpSass(dartSass);

// Favicon sizes
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 150, name: 'mstile-150x150.png' }
];

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
  const src = [
    'static/images/**/*',
    'static/product/**/*',
    'static/about/**/*',
    'static/blog/**/*',
    'static/events/**/*',
    'static/plugins/**/*.{jpg,jpeg,png,gif}',
    'static/plugins/slick/ajax-loader.gif'
  ];

  return new Promise(async (resolve, reject) => {
    try {
      const files = await glob(src, { nodir: true });
      
      for (const file of files) {
        if (!fs.existsSync(file)) continue;

        const stats = fs.statSync(file);
        if (!stats.isFile()) continue;

        if (file.match(/\.(jpg|jpeg|png)$/i)) {
          const outputWebP = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const outputAvif = file.replace(/\.(jpg|jpeg|png)$/i, '.avif');
          const outputDir = path.join('static', path.relative('static', path.dirname(file)));
          
          // Ensure output directory exists
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          try {
            await sharp(file)
              .resize(1920, null, { 
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 80 })
              .toFile(path.join(outputDir, path.basename(outputWebP)));
            
            await sharp(file)
              .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .avif({ 
                quality: 80,
                effort: 4,
                chromaSubsampling: '4:2:0'
              })
              .toFile(path.join(outputDir, path.basename(outputAvif)));
            
            // Optimize original format
            if (file.match(/\.(jpg|jpeg)$/i)) {
              const tempFile = path.join(outputDir, `${path.basename(file)}.tmp`);
              const outputFile = path.join(outputDir, path.basename(file));
              await sharp(file)
                .resize(1920, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                })
                .jpeg({ 
                  quality: 80, 
                  progressive: true,
                  optimizeCoding: true
                })
                .toFile(tempFile);
              fs.renameSync(tempFile, outputFile);
            } else if (file.match(/\.png$/i)) {
              const tempFile = path.join(outputDir, `${path.basename(file)}.tmp`);
              const outputFile = path.join(outputDir, path.basename(file));
              await sharp(file)
                .resize(1920, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                })
                .png({ 
                  quality: 80,
                  progressive: true,
                  compressionLevel: 9,
                  adaptiveFiltering: true
                })
                .toFile(tempFile);
              fs.renameSync(tempFile, outputFile);
            }
          } catch (err) {
            console.error(`Error processing image ${file}:`, err);
          }
        }
      }
      resolve();
    } catch (err) {
      console.error('Error processing images:', err);
      reject(err);
    }
  });
});

gulp.task('prod:images', () => {
  const src = [
    'static/images/**/*',
    'static/product/**/*',
    'static/about/**/*',
    'static/blog/**/*',
    'static/events/**/*',
    'static/plugins/**/*.{jpg,jpeg,png,gif}',
    'static/plugins/slick/ajax-loader.gif'
  ];

  return new Promise(async (resolve, reject) => {
    try {
      const files = await glob(src, { nodir: true });
      
      for (const file of files) {
        // Skip if file doesn't exist
        if (!fs.existsSync(file)) continue;

        // Get file stats
        const stats = fs.statSync(file);
        if (!stats.isFile()) continue;

        // Process only images
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
          const outputWebP = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const outputAvif = file.replace(/\.(jpg|jpeg|png)$/i, '.avif');
          const outputDir = path.join('public', path.relative('static', path.dirname(file)));
          
          // Ensure output directory exists
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          // Copy original file
          const outputOriginal = path.join(outputDir, path.basename(file));
          fs.copyFileSync(file, outputOriginal);
          
          try {
            await sharp(file)
              .resize(1920, null, { 
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 80 })
              .toFile(path.join(outputDir, path.basename(outputWebP)));
            
            await sharp(file)
              .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .avif({ 
                quality: 80,
                effort: 4,
                chromaSubsampling: '4:2:0'
              })
              .toFile(path.join(outputDir, path.basename(outputAvif)));
            
            // Optimize original format
            if (file.match(/\.(jpg|jpeg)$/i)) {
              const tempFile = path.join(outputDir, `${path.basename(file)}.tmp`);
              const outputFile = path.join(outputDir, path.basename(file));
              await sharp(file)
                .resize(1920, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                })
                .jpeg({ 
                  quality: 80, 
                  progressive: true,
                  optimizeCoding: true
                })
                .toFile(tempFile);
              fs.renameSync(tempFile, outputFile);
            } else if (file.match(/\.png$/i)) {
              const tempFile = path.join(outputDir, `${path.basename(file)}.tmp`);
              const outputFile = path.join(outputDir, path.basename(file));
              await sharp(file)
                .resize(1920, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                })
                .png({ 
                  quality: 80,
                  progressive: true,
                  compressionLevel: 9,
                  adaptiveFiltering: true
                })
                .toFile(tempFile);
              fs.renameSync(tempFile, outputFile);
            }
          } catch (err) {
            console.error(`Error processing image ${file}:`, err);
            continue;
          }
        } else {
          // Copy non-image files
          const destPath = path.join('public', path.relative('static', file));
          const destDir = path.dirname(destPath);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.copyFileSync(file, destPath);
        }
      }
      resolve();
    } catch (err) {
      console.error('Error processing images:', err);
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
  return new Promise((resolve, reject) => {
    // Process plugins CSS
    const processPlugins = () => {
      return gulp.src([
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
    };

    // Process Bootstrap CSS
    const processBootstrap = () => {
      return gulp.src('static/plugins/bootstrap/bootstrap.min.css')
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
    };

    // Run tasks in parallel
    Promise.all([
      new Promise((res, rej) => {
        processPlugins()
          .on('end', res)
          .on('error', rej);
      }),
      new Promise((res, rej) => {
        processBootstrap()
          .on('end', res)
          .on('error', rej);
      })
    ])
    .then(() => resolve())
    .catch(err => reject(err));
  });
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

// Favicon task
gulp.task('favicons', () => {
  return new Promise(async (resolve, reject) => {
    try {
      const favicon = 'static/images/favicon.png';
      
      // Generate PNG favicons
      for (const { size, name } of faviconSizes) {
        await sharp(favicon)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(`static/images/${name}`);
      }
      
      // Generate monochrome SVG for Safari pinned tab
      await sharp(favicon)
        .resize(512, 512)
        .threshold(128)
        .toColourspace('b-w')
        .toFile('static/images/safari-pinned-tab.svg');
        
      resolve();
    } catch (err) {
      console.error('Error generating favicons:', err);
      reject(err);
    }
  });
});

// Development build
gulp.task('dev', gulp.series('dev:images', 'dev:scss', 'dev:css', 'dev:js', 'fonts', 'favicons'));

// Production build
gulp.task('prod', gulp.series('prod:images', 'prod:scss', 'prod:css', 'prod:js', 'fonts', 'favicons'));

// Default task (development)
gulp.task('default', gulp.series('dev')); 