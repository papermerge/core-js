const path = require('path');
let webpack = require('webpack');
let mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

const isDevelopment = process.env.NODE_ENV !== 'production'

let mod = {
    rules: [
        {
            test: /\.svg/,
            type: 'asset/source',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.html$/,
            loader: "underscore-template-loader"
        }
    ],

}

module.exports = {
    mode: mode,
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    entry: path.resolve(__dirname, 'core/index.js'),
    module: mod,
    resolve: {
        // I got this from here
        // https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
        alias: {
            'bootstrap-select-dropdown': "bootstrap-select-dropdown/src/js/bootstrap-select-dropdown"
        }
    }
}


