'use strict';

/**
 * Сборка картинок
 *
 * @example
 * $ gulp images
 *
 * @module gulp/tasks/images
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
    name: 'images',

    src: [
        'media/img/**/*.{png,gif,jpg}',
        'components/**/media/img/**/*.{png,gif,jpg}'
    ],
    dest: 'assets/img',
    watch: [
        'media/img/**/*.{png,gif,jpg}',
        'components/**/media/img/**/*.{png,gif,jpg}'
    ],

    plugins: {
        flatten: 'gulp-flatten',
        changed: 'gulp-changed'
    },

    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function () {
            return gulp.src(this.src)
                .pipe(plg.flatten()) // сплющим древовидную структуру файлов до одной директории
                .pipe(plg.changed(this.dest))
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
