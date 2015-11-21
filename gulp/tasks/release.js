'use strict';

/**
 * Полная сборка проекта готовая для использования в продакшене
 *
 * @example
 * $ gulp release
 *
 * @module gulp/tasks/release
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'release',

    serialTaskArray: [
        'del:release',
        'build',
        'minify-revision'
    ],

    plugins: {
        runSequence: 'run-sequence'
    },

    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function (cb) {
            plg.runSequence.apply(null, [].concat(this.serialTaskArray, cb));
        }.bind(this));
    }
});
