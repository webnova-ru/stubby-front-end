'use strict';

/**
 * Копирует json
 *
 * @example
 * $ gulp json
 *
 * @module gulp/tasks/json
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
    name: 'json',

    src: 'fixtures/**/*.json',
    dest: './',
    watch: 'fixtures/**/*.json',

    define: function () {
        gulp.task(this.name, function () {
            return gulp.src(this.src)
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
