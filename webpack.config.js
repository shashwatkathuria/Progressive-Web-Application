const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/assets/index.js'),
  output: {
     globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader'
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|pdf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets',
        }
      }
    ]
  },
  plugins: [
    // Progressive Web Application Manifest, i.e., <link rel='manifest' href='manifest.json'>
    // Manifest config
    // GitHub: https://github.com/arthurbergmz/webpack-pwa-manifest
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'PWA',
      short_name: 'PWA',
      description: 'PWA',
      icons: [
        {
          // Icon name and its multiple sizes
          src: path.resolve('src/assets/images/app-icon.png'),
          sizes: [96, 144, 192, 256]
        }, {
          src: path.resolve('src/assets/images/app-icon.png'),
          sizes: [96, 144, 192, 256],
          ios: true
        }, {
          src: path.resolve('src/assets/images/app-icon.png'),
          sizes: 256,
          ios: 'startup'
        }
      ],
      orientation: 'portrait',
      display: 'standalone',
      start_url: '/',
      fingerprints: false,
      crossorigin: null,
      background_color: '#000000',
      theme_color: '#000000',
      ios: {
        'apple-mobile-web-app-title': 'PWA',
        'apple-mobile-web-app-status-bar-style': 'black'
      }
    }),
    // Entry point for service worker
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/assets/sw.js'),
    }),
    // Entry point for all assets except service worker
    new HtmlWebPackPlugin({
      favicon: './src/assets/favicon.png',
      template: './src/assets/index.html',
      filename: './index.html'
    })
  ]
};
