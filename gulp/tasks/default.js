'use strict';

/**
 * Таск с информацией о других тасках
 *
 * @example
 * $ gulp
 *
 * @module gulp/tasks/default
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
    name: 'default',

    define: function () {
        gulp.task(this.name, function () {
            require('fs').createReadStream('./gulp/info.txt').pipe(process.stdout);
        });
    }
});
