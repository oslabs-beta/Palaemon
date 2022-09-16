const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: {
      main: './electron/main.ts',
      preload: './electron/preload.ts'
    },
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node-modules/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, 'dist/electron'),
      clean: true
    },
    externals: [
      {
        'utf-8-validate': 'commonjs utf-8-validate',
        bufferutil: 'commonjs bufferutil',
        fsevents: "require('fsevents')",
      },
    ],
  },
  {
    mode: 'production',
    entry: './client/index.tsx',
    devtool: false,
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.s?[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.png/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      modules: [__dirname, 'client', 'node_modules'],
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: 'index.js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '/client/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'client/assets'),
            to: 'assets/',
          },
        ],
      }),
    ],
  },
];
