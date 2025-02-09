import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sharp from 'sharp';
import through2 from 'through2';

// Konversi ke WebP
function convertToWebp() {
  return gulp.src(['static/images/**/*.{jpg,jpeg,png}', '!static/images/**/*.webp'])
    .pipe(through2.obj(async (file, enc, cb) => {
      if (file.isBuffer()) {
        try {
          const webpBuffer = await sharp(file.contents)
            .webp({ quality: 100 })
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

// Optimize existing images
function optimizeImages() {
  return gulp.src('static/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 100, progressive: true }),
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

// Combined task
export const images = gulp.series(optimizeImages, convertToWebp);

// Default task
export default images; 