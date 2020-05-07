const unminifiedWebpackPlugin = require('unminified-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

const HMRPlugin = isDevServer ? new webpack.HotModuleReplacementPlugin() : function(){};

const libraryName = 'doz-ui';

module.exports = {
    mode: isDevServer ? 'development' : 'production',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    entry: {
        button: './src/components/button/index.js',
        tab: './src/components/tab/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        umdNamedDefine: true,
        libraryTarget: 'umd',
        globalObject: 'this',
        pathinfo: false
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js']
    },
    externals: {
        doz: {
            commonjs: 'doz',
            commonjs2: 'doz',
            amd: 'doz',
            root: 'Doz'
        }/**/
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader?cacheDirectory=true',
                //loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true
                }, include: /\.min\.js$/
            }
        }),
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            SHORT: libraryName,
            components: {
                InjectAsComment: true,
                InjectByTag: true
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: 'Build version: {version}'
                }
            }
        }),
        //new EsmWebpackPlugin(),
        new unminifiedWebpackPlugin(),
        HMRPlugin,
        new HardSourceWebpackPlugin()
    ]
};