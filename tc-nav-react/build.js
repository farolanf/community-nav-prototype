const fs = require('fs')
const path = require('path')
const rf = require('rimraf')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.lib')

const srcDir = path.resolve(__dirname, 'src')

const files = fs.readdirSync(srcDir)

files.forEach(file => {
  const name = file.replace(path.extname(file), '')
  if (['assets', 'dist', 'index'].includes(name)) return
  const config = Object.assign({}, baseConfig)
  config.entry = path.join(srcDir, file)
  config.output.path = path.join(__dirname, name)
  config.output.filename = 'index.js'
  process.env.NODE_ENV === 'production' && rf.sync(config.output.path)
  webpack(config, handleError)
})

const config = Object.assign({}, baseConfig)
config.entry = path.join(srcDir, 'index.js')
config.output.path = __dirname
config.output.filename = 'index.js'
config.externals['./TopNav'] = './TopNav'
config.externals['./SubNav'] = './SubNav'
webpack(config, handleError)

function handleError (err, stats) {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
  }
  const info = stats.toJson()
  if (stats.hasErrors()) {
    console.error(JSON.stringify(info.errors, null, 2))
  }
  if (stats.hasWarnings()) {
    // info.warnings.forEach(console.error)
  }
}
