'use strict';

/**
 * Файл конфигурации webpack
 *
 * @module gulp/webpack
 * @type {Object}
 */

/**
 * Зависимости модуля
 */
var webpack = require('webpack'),
    stylComponentLoader = require('../lib/loaders/stylComponent'),
    dir = require('../lib/dir'),
    config = require('./index'),
    setEnv = require('../lib/setEnv');

var env = process.env['NODE_ENV'];

/**
 * Возвращает полностью готовый конфиг для webpack-а
 *
 * @param {{}} baseOpts базовые данные для конфига из gulp-таска
 * @return {{}}
 */
module.exports = function (baseOpts) {
    return {
        target: 'web',

        watch: !!baseOpts.watch,
        context: baseOpts.context,

        entry: {
            index: './index.js',
            common: ['babel-core/polyfill', 'react']
        },

        output: {
            path: baseOpts.output.path,
            filename: '[name].js', // выходной файл
            pathInfo: true // добавляет комментарий к подключаемому модулю
        },

        resolve: {
            extensions: ['', '.jsx', '.js', '.json', '.styl']
        },

        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    /**
                     * stage=0 включает поддержку некоторых фишек ES7:
                     * статических свойств классов, async/await
                     */
                    loaders: ['babel-loader?stage=0']
                },
                {
                    test: /\.styl/,
                    loaders: [
                        stylComponentLoader.getLoaderString()
                    ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ],
            noParse: /\.min\.js/
        },

        plugins: [
            new stylComponentLoader.Plugin({
                resStylusPath: dir.cwd.temp.to(config.tempFileNames.componentStylus),
                engine: 'lodash',
                tplPath: dir.cwd.src.to('templates/component.lodash.styl')
            }),
            new webpack.DefinePlugin(setEnv(env, {
                // нужно чтобы собрать более оптимизированный react
                'process.env.NODE_ENV': env === 'production' ? '\'production\'' : '\'development\''
            })),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
        ]
    };
};
