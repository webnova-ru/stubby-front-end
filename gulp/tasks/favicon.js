'use strict';

/**
 * Сохраняет favicon-ку в папку проекта
 *
 * @example
 * $ gulp favicon
 *
 * @module gulp/tasks/favicon
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
    name: 'favicon',

    src: 'media/favicons/*',
    dest: './',
    watch: 'media/favicons/*',

    define: function () {
        gulp.task(this.name, function () {
            return gulp.src(this.src)
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
