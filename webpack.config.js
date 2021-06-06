const path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
          use:  [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: { url: false }
            },
            {
                loader: 'postcss-loader', // Run post css actions
                options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            },
            'sass-loader'
          ]
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

let plug = function (mode) {
    return [
      new MiniCssExtractPlugin({
        filename: mode === 'development' ? '../css/[name].debug.css' : '../css/[name].css'
      }),
      // https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ]
}

module.exports = {
    mode: mode,
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    entry: path.resolve(__dirname, 'core/index.js'),
    module: mod,
    plugins: plug(mode),
    resolve: {
        // I got this from here
        // https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
        alias: {
            'bootstrap-select-dropdown': "bootstrap-select-dropdown/src/js/bootstrap-select-dropdown"
        }
    }
}


