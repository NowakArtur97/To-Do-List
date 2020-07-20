const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    require("postcss-import"),
    autoprefixer({
      flexbox: true,
      grid: true,
    }),
  ],
};
