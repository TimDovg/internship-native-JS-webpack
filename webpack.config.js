const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    /*mode: 'development',*/
    /*entry: './src/js/script.js',*/
    entry: {
        fontawesome: './js/fontawesome-all.min.js',
        main: './js/script.js'
    },
    output: {
        /*filename: '[name].bundle.js',*/
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            /*title: 'Native JS',*/
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
