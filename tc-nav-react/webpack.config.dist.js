const path = require('path')
const common = require('./webpack.config.common')

module.exports = Object.assign({}, common, {
  entry: './src/dist.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tc-nav-react.js',
    library: 'TcNavReact',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})
