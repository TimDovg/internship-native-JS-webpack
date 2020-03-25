const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    /*mode: 'development',*/
    /*entry: './src/js/script.js',*/
    entry: {
        fontawesome: './js/fontawesome-all.min.js',
        infoAboutCountry: './js/infoAboutCountry.js',
        main: './js/script.js'
    },
    output: {
        /*filename: '[name].bundle.js',*/
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@folder': path.resolve(__dirname, 'src/folder'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: false
        }),
        new HTMLWebpackPlugin({
            filename: 'info-about-country.html',
            template: './html/info-about-country.html',
            inject: false
        }),
        new CleanWebpackPlugin(),
        new LodashModuleReplacementPlugin({
            'collections': true,
            'paths': true
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                ie8: false,
                output: {
                    comments: false
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
};
