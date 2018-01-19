/**
 * Created by fev-ekd on 3/1/18.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const assetsPluginInstance = new AssetsPlugin();
const WebpackStrip = require('strip-loader');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd ? 'cheap-module-source-map' : 'inline-source-map',
    entry: {
        app: './src/index.tsx'
    },
    output: {
        publicPath: '/js',
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: [ '.ts', '.tsx', ".js"]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'BASE WEB_MOBILE_APP ',
            filename: '../index.html',
            template: 'src/template.html'
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('../css/[name].css').replace('css/js', 'css')},
            disable: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        assetsPluginInstance,
        ...(isProd ? [new MinifyPlugin()] : [])
    ],
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd ? true : false,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ["./src/scss"]
                            }
                        }]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader?name=./../images/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader?name=./../fonts/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            "presets": "es2015"
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: 'tsconfig.json',
                            transpileOnly: false //true
                        }
                    }
                ]
            },
            {
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */}
            },
            isProd ? {
                test: /\.tsx$/,
                loader: WebpackStrip.loader('console.log', 'console.error')
            } : {},
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' }
            ]
        }
    }
};