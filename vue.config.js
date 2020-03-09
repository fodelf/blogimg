module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blogimg/'
    : '/'
}
