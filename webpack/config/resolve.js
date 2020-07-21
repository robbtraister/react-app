const path = require('path')

const resolve = ({ isPreact }) => ({
  alias: {
    '~': path.join(__dirname, '..', '..', 'src'),
    'react-dom/server': require.resolve('react-dom/server'),
    'react-dom': require.resolve(isPreact ? 'preact/compat' : 'react-dom'),
    react: require.resolve(isPreact ? 'preact/compat' : 'react')
  },
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.sass', '.css']
})

module.exports = resolve
