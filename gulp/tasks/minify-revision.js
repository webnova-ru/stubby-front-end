'use strict';

/**
 * Минификация всех файлов: изображений, js, css, html.
 * Ревизия файлов и сохранение манифеста с нужными путями
 *
 * @example
 * $ gulp minify-revision
 *
 * @module gulp/tasks/minify-revision
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    imagesTask = require('./images'),
    stylusTask = require('./stylus'),
    webpackTask = require('./webpack'),
    htmlTask = require('./html'),
    dir = require('../lib/dir'),
    handleErrors = require('../lib/handleErrors'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'minify-revision',

    options: {
        revManifestPath: dir.release.to('./'),
        revVersionPath: dir.release.to('./')
    },

    revConfig: {
        hashLength: 8,
        fileNameVersion: 'rev-version.json',
        fileNameManifest: 'rev-manifest.json',
        dontRenameFile: [/^\/favicon.ico$/g, '.html'],
        prefix: ''
    },

    plugins: {
        csso: 'gulp-csso',
        imagemin: 'gulp-imagemin',
        pngquant: 'imagemin-pngquant',
        minifyHTML: 'gulp-minify-html',
        uglify: 'gulp-uglify',
        gulpFilter: 'gulp-filter',
        RevAll: 'gulp-rev-all',
        size: 'gulp-size'
    },

    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function () {
            var onlyImage = plg.gulpFilter(dir(imagesTask.destOrig, '**/*'), { restore: true }),
                onlyCss = plg.gulpFilter(dir(stylusTask.destOrig, '**/*'), { restore: true }),
                onlyHtml = plg.gulpFilter(dir(htmlTask.destOrig, '*.html'), { restore: true }),
                onlyJs = plg.gulpFilter(dir(webpackTask.destOrig, '**/*'), { restore: true }),
                revAll = new plg.RevAll(this.revConfig);

            return gulp.src(dir.dest.to('**/*'))
                .pipe(revAll.revision())
                .on('error', handleErrors)

                .pipe(plg.size({
                    title: 'Первоначальный размер'
                }))

                .pipe(onlyImage)
                .pipe(plg.imagemin({
                    progressive: true,
                    use: [plg.pngquant({
                        quality: '65-80',
                        speed: 4
                    })]
                }))
                .pipe(onlyImage.restore)

                .pipe(onlyCss)
                .pipe(plg.csso())
                .pipe(onlyCss.restore)

                .pipe(onlyJs)
                .pipe(plg.uglify())
                .pipe(onlyJs.restore)

                .pipe(onlyHtml)
                .pipe(plg.minifyHTML())
                .pipe(onlyHtml.restore)

                .pipe(plg.size({
                    title: 'Итоговый размер'
                }))

                .pipe(gulp.dest(dir.release.to('./')))

                .pipe(revAll.manifestFile())
                .pipe(gulp.dest(this.options.revManifestPath))
                .pipe(revAll.versionFile())
                .pipe(gulp.dest(this.options.revVersionPath));
        }.bind(this));
    }
});
