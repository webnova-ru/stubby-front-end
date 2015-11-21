'use strict';

/**
 * Просто копировать html-ку в нужную папку
 *
 * @example
 * $ gulp html
 *
 * @module gulp/tasks/html
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
    name: 'html',

    src: 'html/**/*.html',
    dest: './',
    watch: 'html/**/*.html',

    define: function () {
        gulp.task(this.name, function () {
            return gulp.src(this.src)
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
