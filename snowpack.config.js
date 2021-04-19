module.exports = {
  plugins: [
    "@snowpack/plugin-typescript",
    "@marlonmarcello/snowpack-plugin-pug",
    "@snowpack/plugin-sass",
  ],
  mount: {
    src: "/",
  },
};
