const path = require('path')

const buildDir = path.join(__dirname, '..', '..', 'build')

const devServer = ({ index = 'index.html', liveReload = true, port }) => ({
  compress: true,
  contentBase: path.join(buildDir, 'dist'),
  historyApiFallback: {
    index
  },
  host: '0.0.0.0',
  https: true,
  index,
  injectClient: liveReload ? undefined : false,
  liveReload,
  port: Number(port || process.env.PORT) || 8080,
  publicPath: '/dist/',
  writeToDisk: true
})

module.exports = devServer
