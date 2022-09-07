const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './electron/main.ts',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /client/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'main.js',
    },
  },
  {
    mode: 'development',
    entry: './client/index.tsx',
    target: 'electron-renderer',
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.ts(x?)$/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.s?[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      // modules: [__dirname, 'client', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'index.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
      }),
    ],
  },
];

// const path = require('path');
// const fs = require('fs');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// // const ANTDCSSFILEPATH = path.resolve(__dirname, './node_modules/antd/dist/antd.less');
// module.exports = {
//   entry: './client/index.tsx',
//   output: {
//     path: __dirname + '/dist',
//     filename: 'main.js',
//   },
//   devtool: 'eval-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: ['ts-loader'],
//       },
//       {
//         test: /\.s?css$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
//       // {
//       //   test: /\.(jpg|jpeg|png|ttf|svg|gif)$/,
//       //   use: [
//       //     'file-loader',
//       //     {
//       //       loader: 'image-webpack-loader',
//       //       options: {
//       //         mozjpeg: {
//       //           quality: 10,
//       //         },
//       //       },
//       //     },
//       //   ],
//       //   exclude: /node_modules/,
//       // },
//     ],
//   },
//   mode: 'development',
//   devServer: {
//     hot: true,
//     historyApiFallback: true,
//     // contentBase: path.resolve(process.cwd(), 'app'), //__dirname
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'client/index.html',
//     }),
//   ],
//   resolve: {
//     extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif', '.png', '.svg'],
//   },
// };
