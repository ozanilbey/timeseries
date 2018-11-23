const webpack = require('webpack')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const extractCSS = new MiniCssExtractPlugin({
  filename: 'app/build/bundle.css'
})

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'

module.exports = {
  devtool: isProduction ? false : 'eval-source-map',
  entry: {
    client: path.join(__dirname, './app/App.jsx')
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'app/build/[name].js',
    publicPath: '/'
  },
  mode: nodeEnv,
  resolve: {
    alias: {
      '~': path.join(__dirname, './app')
    },
    extensions: ['*', '.js', '.jsx']
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|woff|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /react|react-dom/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      ONSERVER: false,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    extractCSS,
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}