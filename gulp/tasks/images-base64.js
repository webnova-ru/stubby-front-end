'use strict';

/**
 * Пожать изображения и пихнуть их в папку назначения для дальнейшего
 * преобразования в base64-кодировку и записи результата в css-ку
 *
 * @module gulp/tasks/images-base64
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
var task = new Task({
    name: 'images-base64',

    src: [
        'media/base64/**/*.{svg,png,jpg,gif}',
        'components/**/media/base64/**/*.{svg,png,jpg,gif}'
    ],
    dest: 'assets/img/base64',
    watch: [
        'media/base64/**/*.{svg,png,jpg,gif}',
        'components/**/media/base64/**/*.{svg,png,jpg,gif}'
    ],

    options: {
        base64: {
            /**
             * по этому пути модуль ищет картинку конкатинируя его с тем что написано в url('...') в css,
             * например: url('../img/base64/img.png'),
             * модуль будет искать картинку по пути: '/assets/img/../img/base64/img.png'
             */
            baseDir: dir.dest.to('assets/img/'),

            /**
             * если матчится путь с папкой /base64/ выполняется base64-преобразование
             */
            extensions: [
                new RegExp('base64' + '\/.+\\.(svg|png|jpg|gif)')
            ],

            /**
             * картинки больше этого размера не конвертируются в base64
             */
            maxImageSize: 2/*Kb*/ * 1024
        }
    },

    plugins: {
        changed: 'gulp-changed',
        flatten: 'gulp-flatten',
        imagemin: 'gulp-imagemin'
    },

    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function () {
            return gulp.src(this.src)
                .pipe(plg.flatten()) // сплющим древовидную структуру файлов до одной директории
                .pipe(plg.changed(this.dest))
                .pipe(plg.imagemin())
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});

module.exports = task;
