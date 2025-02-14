const autoprefixer = require('autoprefixer')();

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./layouts/**/*.html', './content/**/*.md'],
  safelist: {
    greedy: [
      /^nav-/,
      /^btn/,
      /^card-/,
      /^list-/,
      /^row-/,
      /^col-/,
      /^container-/,
      /^text-/,
      /^bg-/,
      /^slick-/,
      /^venobox/,
      /^ti-/
    ],
  },
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === 'development' 
      ? [null] 
      : [autoprefixer, purgecss]),
  ],
}; 