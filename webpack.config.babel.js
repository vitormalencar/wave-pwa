import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
const SWPrecache = require('sw-precache-webpack-plugin');
import autoprefixer from 'autoprefixer';
import Dashboard from 'webpack-dashboard/plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import {CriticalPlugin} from 'webpack-plugin-critical';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['preact', 'preact-router', 'redux']
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[hash:8].chunk.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /src/
      }, {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: /src/
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')]
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
      }
    ]
  },

  plugins: ([
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [autoprefixer]
      },
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({filename: '[name].[chunkhash:5].css', allChunks: true}),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(ENV)}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Wave PWA',
      removeRedundantAttributes: true,
      inject: false,
      manifest: `${ENV === 'production'
        ? 'manifest.json'
        : '/assets/manifest.json'}`,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      themeColor: '#404042'
    }),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: "async"}),
    new ManifestPlugin({fileName: 'asset-manifest.json'})
  ])
  // Only for development
    .concat(ENV === 'development'
    ? [new webpack.HotModuleReplacementPlugin(), new Dashboard()]
    : [])
  // Only for production
    .concat(ENV === 'production'
    ? [
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        {
          from: './src/assets/manifest.json',
          to: './'
        }, {
          from: './src/assets/img',
          to: './img'
        }
      ]),
      new CriticalPlugin({src: 'index.html', inline: true, minify: true, dest: 'index.html'}),
      new SWPrecache({
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api.soundcloud\.com\//,
            handler: 'cacheFirst'
          }, {
            urlPattern: /^https:\/\/cf-media.sndcdn\.com\//,
            handler: 'cacheFirst'
          }
        ],
        filename: 'service-worker.js',
        dontCacheBustUrlsMatching: /./,
        navigateFallback: 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.DS_Store/]
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: 0
        },
        compress: {
          unused: 1,
          warnings: 0
        }
      }),
      new CompressionPlugin({asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$|\.css$|\.html$/, threshold: 10240, minRatio: 0.8})
    ]
    : []),

  stats: {
    colors: true
  },

  devtool: ENV !== 'production' && 'eval',
  devServer: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    compress: true,
    contentBase: './src',
    historyApiFallback: true
  }
};
