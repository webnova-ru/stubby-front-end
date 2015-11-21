'use strict';

/**
 * Сборка всего проект
 *
 * @example
 * $ gulp build
 *
 * @module gulp/tasks/build
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
    name: 'build',

    plugins: {
        runSequence: 'run-sequence'
    },

    serialTaskArray: [
        'del:dest',
        'del:temp',
        'images',
        'iconfont',
        'favicon',
        'webpack',
        'stylus',
        'html',
        'json'
    ],

    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function (cb) {
            plg.runSequence.apply(null, [].concat(this.serialTaskArray, cb));
        }.bind(this));
    }
});
