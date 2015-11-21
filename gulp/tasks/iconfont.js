'use strict';

/**
 * Сборка TTF, EOT, WOFF шрифтов из различных SVG-иконок
 *
 * @example
 * $ gulp iconfont
 *
 * @module gulp/tasks/iconfont
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    dir = require('../lib/dir'),
    handleErrors = require('../lib/handleErrors'),
    config = require('../config/index'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'iconfont',

    src: [
        'media/iconfont/appIcons/*.svg',
        'components/**/media/iconfont/appIcons/*.svg'
    ],
    dest: 'assets/fonts/icons/',
    watch: [
        'media/iconfont/appIcons/*.svg',
        'components/**/media/iconfont/appIcons/*.svg'
    ],

    // путь к шаблону из которого получается css с нужными данными для иконок
    tplPath: dir.src.to('templates/iconfont.lodash.styl'),

    options: {
        // имя шрифта, кототорое подставляется в css
        fontName: 'appIcons',
        // css класс для шрифтов
        className: 'icon',
        // url который подставляется в css для шрифта
        cssFontPath: '../fonts/icons/'
    },

    plugins: {
        iconfont: 'gulp-iconfont',
        consolidate: 'gulp-consolidate',
        rename: 'gulp-rename'
    },

    define: function () {
        gulp.task(this.name, function (cb) {
            var plg = this.plugins;
            gulp.src(this.src)
                .pipe(plg.iconfont({
                    fontName: this.options.fontName,
                    appendUnicode: false,
                    svg: true,
                    normalize: true
                }))
                .on('error', handleErrors)
                .on('glyphs', function (glyphs) {
                    var tplData = {
                        glyphs: glyphs.map(function (glyph) {
                            return {
                                name: glyph.name,
                                codepoint: glyph.unicode[0].charCodeAt(0)
                            };
                        }),
                        className: this.options.className,
                        fontName: this.options.fontName,
                        fontPath: this.options.cssFontPath
                    };
                    return gulp.src(this.tplPath)
                        .pipe(plg.consolidate('lodash', tplData))
                        .pipe(plg.rename(config.tempFileNames.iconfont))
                        .pipe(gulp.dest(dir.temp()))
                        .on('end', function () {
                            cb();
                        });
                }.bind(this))
                .pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
