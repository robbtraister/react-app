const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const devServer = require('./webpack/config/dev-server')
const resolve = require('./webpack/config/resolve')
const rules = require('./webpack/config/rules')

const OnBuildPlugin = require('./webpack/plugins/on-build-plugin')

const prodPattern = /^prod/i

const rootDir = __dirname
const buildDir = path.join(rootDir, 'build')
const buildArtifact = path.join(buildDir, 'server')
let hotApp

module.exports = (_, argv) => {
  const isProd =
    prodPattern.test(process.env.NODE_ENV) || prodPattern.test(argv.mode)

  const mode = isProd ? 'production' : 'development'
  const devtool = isProd ? 'source-map' : 'eval-source-map'

  return [
    {
      name: 'server',
      devServer: {
        ...devServer({ isProd, liveReload: argv.liveReload }),
        before: app => {
          app.use(/^(?!\/dist\/)/, (req, res, next) => {
            // re-require if recompiled to get the latest code
            hotApp = hotApp || require(buildArtifact).app()
            hotApp(req, res, next)
          })
        }
      },
      devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
      entry: {
        server: [
          'source-map-support/register',
          `./${path.relative(rootDir, path.join(rootDir, 'src', 'server'))}`
        ],
        electron: [
          'source-map-support/register',
          `./${path.relative(rootDir, path.join(rootDir, 'src', 'electron'))}`
        ]
      },
      externals: isProd ? { electron: 'commonjs2 electron' } : /^(?!\.|~)/,
      mode,
      module: { rules: rules({ extractCss: true, isProd }) },
      output: {
        path: buildDir,
        publicPath: 'dist/',
        libraryTarget: 'commonjs2'
      },
      plugins: [
        new HtmlWebpackPlugin({
          chunks: [],
          filename: 'electron.html',
          template: path.join(rootDir, 'src', 'electron', 'index.ejs')
        }),
        new MiniCssExtractPlugin({ filename: 'dist/styles.css' }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }),
        new OnBuildPlugin(async stats => {
          const imports = Object.keys(require.cache).filter(mod =>
            mod.startsWith(buildDir)
          )
          // clear compilation cache
          imports.forEach(mod => {
            delete require.cache[mod]
          })
          hotApp = undefined
        })
      ],
      resolve: {
        ...resolve({ isPreact: false }),
        mainFiles: ['server', 'index']
      },
      target: 'node'
    },
    {
      name: 'html',
      devtool,
      entry: {
        html: path.join(rootDir, 'src', 'client')
      },
      mode,
      module: { rules: rules({ extractCss: false, isProd }) },
      output: {
        path: path.join(buildDir, 'dist'),
        publicPath: '/dist/'
      },
      resolve: {
        ...resolve({ isPreact: isProd }),
        mainFiles: ['html', 'client', 'index']
      },
      target: 'web'
    },
    {
      name: 'amp',
      devtool,
      entry: {
        amp: path.join(rootDir, 'src', 'client')
      },
      mode,
      module: { rules: rules({ extractCss: false, isProd }) },
      output: {
        path: path.join(buildDir, 'dist'),
        publicPath: '/dist/'
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ],
      resolve: {
        ...resolve({ isPreact: isProd }),
        mainFiles: ['amp', 'client', 'index']
      },
      target: 'web'
    },
    {
      name: 'electron',
      // electron does not play well will evals
      devtool: 'source-map',
      entry: {
        electron: path.join(rootDir, 'src', 'client')
      },
      mode,
      module: { rules: rules({ extractCss: false, isProd }) },
      output: {
        path: path.join(buildDir, 'dist'),
        publicPath: '/dist/'
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ],
      resolve: {
        ...resolve({ isPreact: isProd }),
        mainFiles: ['electron', 'client', 'index']
      },
      target: 'electron-main'
    }
  ]
}
