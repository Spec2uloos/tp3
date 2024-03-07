const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    scriptA: ['./src/scriptA.js'], 
    scriptB: ['./src/scriptB.js'], 
    stylesA: ['./src/styles.css'],
    stylesB: ['./src/stylesB.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].js' 
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader' 
        }
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/interfaceA.html',
      filename: 'interfaceA.html',
      chunks: ['scriptA', 'stylesA']
    }),
    new HtmlWebpackPlugin({
      template: './src/interfaceB.html',
      filename: 'interfaceB.html',
      chunks: ['scriptB', 'stylesB']
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 8081
  }
};
