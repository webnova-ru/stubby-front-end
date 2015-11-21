'use strict';

/**
 * webpack
 *
 * @example
 * $ gulp webpack
 *
 * @module gulp/tasks/webpack
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    dir = require('../lib/dir'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'webpack',

    src: './js',
    dest: 'assets/js',

    watch: function () {},

    plugins: {
        webpack: 'webpack',
        gutil: 'gulp-util'
    },

    define: function () {
        var start = null,
            plg = this.plugins,
            baseWebpackConfig = {
                context: dir.cwd(this.src),
                output: {
                    path: dir.cwd(this.dest)
                },
                watch: false
            },
            watchConfig,

            /**
             * Запускает обработку самого webpack-а
             *
             * @param {{}} opts
             * @param {Function=} cb
             */
            webpackBundle = function (opts, cb) {
                plg.webpack(require('../config/webpack')(opts), function (err, stats) {
                    var line,
                        hrDuration,
                        delta,
                        gray = plg.gutil.colors.gray;

                    if (err) {
                        throw new plg.gutil.PluginError('webpack', err);
                    }

                    // замеряем время между сборками и выводим в консоль
                    line = gray(new Array(30).join('─'));
                    if (start !== null) {
                        hrDuration = process.hrtime(start);
                        delta = hrDuration[0] + (hrDuration[1] / 1e9);
                        line = gray(new Array(18).join('─')) +
                            gray('┤') + 'прошло: ' +
                            plg.gutil.colors.magenta(delta > 60 ?
                            (delta / 60).toFixed(1) + 'm' :
                            delta.toFixed(1) + 's') + gray('│');
                    }
                    start = process.hrtime();
                    plg.gutil.log(gray('│') + plg.gutil.colors.green('webpack') + gray('├') + line);

                    plg.gutil.log(stats.toString({
                        colors: true,
                        hash: false,
                        version: false,
                        children: false,
                        chunks: false,
                        modules: false
                    }));

                    if (typeof cb === 'function') {
                        cb();
                    }
                });
            };

        watchConfig = Object.create(baseWebpackConfig);
        watchConfig.watch = true;

        this.watch = webpackBundle.bind(null, watchConfig);
        gulp.task(this.name, webpackBundle.bind(null, baseWebpackConfig));
    }
});
