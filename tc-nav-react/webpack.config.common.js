const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        oneOf: [
          {
            test: /\.module\.(css|sass|scss)$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(css|sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      react: path.resolve(__dirname, '../node_modules/react')
    }
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    }
  }
}
