const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = ({ extractCss, isProd }) => [
  {
    test: /\.s?[ac]ss$/,
    use: [
      ...(extractCss ? [{ loader: MiniCssExtractPlugin.loader }] : []),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: {
            localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]',
            mode: 'local'
          },
          onlyLocals: !extractCss,
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.s[ac]ss$/,
    use: {
      loader: require.resolve('sass-loader'),
      options: {
        implementation: require('sass')
      }
    }
  },
  {
    test: /\.m?[jt]sx?$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: {
      loader: require.resolve('babel-loader'),
      options: require('../../babel.config.json')
    }
  }
]

module.exports = rules
