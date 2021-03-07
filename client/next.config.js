module.exports = {
  webpackDevMiddleare: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
