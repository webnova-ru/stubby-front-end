'use strict';

/**
 * Создает сервер отдающий статику на порту из конфига и влючает авторелоад страницы
 * при изменении контента
 *
 * @example
 * $ gulp server-livereload
 *
 * @module gulp/tasks/server-livereload
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    config = require('../config'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'server-livereload',

    plugins: {
        webServer: 'gulp-webserver'
    },

    define: function () {
        var spaApp = config.appWithHTML5HistoryApi,
            plg = this.plugins;

        if (spaApp === true) {
            spaApp = 'index.html';
        } else if (typeof spaApp !== 'string') {
            spaApp = undefined;
        }

        gulp.task(this.name, function () {
            return gulp.src(config.dir.dest)
                .pipe(plg.webServer({
                    fallback: spaApp,
                    livereload: config.livereload,
                    port: config.staticServerPort
                }));
        });
    }
});
