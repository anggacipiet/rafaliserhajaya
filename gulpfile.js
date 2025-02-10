import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sharp from 'sharp';
import through2 from 'through2';
import fontmin from 'gulp-fontmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';

// Optimize Images
function optimizeImages() {
  return gulp.src(['static/images/**/*.{jpg,jpeg,png,gif,svg}', '!static/images/**/*.webp'])
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.gifsicle({ interlaced: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('static/images'));
}

// Convert to WebP
function convertToWebP() {
  return gulp.src(['static/images/**/*.{jpg,jpeg,png}', '!static/images/**/*.webp'])
    .pipe(through2.obj(async (file, enc, cb) => {
      if (file.isBuffer()) {
        try {
          const webpBuffer = await sharp(file.contents)
            .webp({ quality: 80 })
            .toBuffer();
          
          file.contents = webpBuffer;
          file.path = file.path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          cb(null, file);
        } catch (err) {
          cb(err);
        }
      } else {
        cb(null, file);
      }
    }))
    .pipe(gulp.dest('static/images'));
}

// Optimize Fonts
function optimizeFonts() {
  return gulp.src('static/fonts/**/*')
    .pipe(fontmin())
    .pipe(gulp.dest('static/fonts'));
}

// Minify CSS
function minifyCSS() {
  return gulp.src(['static/css/**/*.css', '!static/css/**/*.min.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('static/css'));
}

// Minify JS
function minifyJS() {
  return gulp.src(['static/js/**/*.js', '!static/js/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('static/js'));
}

// Watch task
function watch() {
  gulp.watch('static/images/**/*', gulp.series(optimizeImages, convertToWebP));
  gulp.watch('static/fonts/**/*', optimizeFonts);
  gulp.watch('static/css/**/*.css', minifyCSS);
  gulp.watch('static/js/**/*.js', minifyJS);
}

// Combined tasks
const images = gulp.series(optimizeImages, convertToWebP);
const assets = gulp.parallel(images, optimizeFonts, minifyCSS, minifyJS);

// Default task
export default gulp.series(assets, watch);

// Individual tasks
export { 
  images,
  optimizeImages,
  convertToWebP,
  optimizeFonts,
  minifyCSS,
  minifyJS,
  watch
}; 