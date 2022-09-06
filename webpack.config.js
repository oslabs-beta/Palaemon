const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './electron/main.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /client/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'main.js'
    }
  },
  {
    mode: 'development',
    entry: './client/index.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /client/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.ts(x?)$/,
        include: /server/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
    },
    resolve: {
      modules: [__dirname, "client", "node_modules"],
      extensions: ["*", ".ts", ".tsx", ".js", ".jsx"]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html'
      })
    ]
  }
];