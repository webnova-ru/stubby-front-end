'use strict';

/**
 * Сборка проекта, поднятие сервера статики, отслеживание изменений файлов
 *
 * @example
 * $ gulp dev
 *
 * @module gulp/tasks/dev
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
    name: 'dev',

    plugins: {
        runSequence: 'run-sequence'
    },

    define: function () {
        gulp.task(this.name, function (cb) {
            this.plugins.runSequence('build', ['watch', 'server-livereload'], cb);
        }.bind(this));
    }
});
