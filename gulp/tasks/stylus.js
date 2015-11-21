'use strict';

/**
 * Сборка Stylus
 *
 * @example
 * $ gulp stylus
 *
 * @module gulp/tasks/stylus
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    fs = require('fs'),
    imagesBase64Task = require('./images-base64'),
    spritesConfig = require('../config/sprites'),
    config = require('../config/index'),
    dir = require('../lib/dir'),
    handleErrors = require('../lib/handleErrors'),
    stylusPlugins = require('../lib/stylusPlugins'),
    Task = require('../lib/Task');

/**
 * Проверить существование файла
 *
 * @param {String} filePath
 * @return {Boolean}
 */
var isFileExist = function (filePath) {
    var stat = false;
    try {
        stat = fs.statSync(filePath);
    } catch (e) {
        return false;
    }
    return !!stat;
};

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'stylus',

    src: 'stylus/index.styl',
    dest: 'assets/css/',
    watch: function () {
        gulp.watch([
            dir.src.to('stylus/**/*.styl'),
            dir.src.to('components/**/*.styl'),
            dir.temp.to(config.tempFileNames.componentStylus),
            dir.temp.to(config.tempFileNames.iconfont)
        ], [this.name]);
    },

    plugins: {
        stylus: 'gulp-stylus',
        nib: 'nib',
        base64: 'gulp-base64',
        sprite: 'gulp-sprite-generator'
    },

    define: function () {
        var plg = this.plugins,
            iconfontPath = dir.cwd.temp.to(config.tempFileNames.iconfont),
            compStylPath = dir.cwd.temp.to(config.tempFileNames.componentStylus);
        gulp.task(this.name, [imagesBase64Task.name], function () {
            // собираем stylus, base64, sprites
            var output = gulp.src(this.src)
                .pipe(plg.stylus({
                    import: 'nib',
                    define: {
                        '$_COMPONENTS_PATH': isFileExist(compStylPath) ? compStylPath : null,
                        '$_ICONFONT_PATH': isFileExist(iconfontPath) ? iconfontPath : null,
                        'getSpriteDir': stylusPlugins.getSpriteDir
                    },
                    use: [plg.nib()]
                }))
                .on('error', handleErrors)
                .pipe(plg.base64(imagesBase64Task.options.base64))
                .pipe(plg.sprite(spritesConfig.sprites));

            // сохранить собранные спрайты в директорию из конфига спрайтов
            output.img.pipe(gulp.dest(spritesConfig.destDir));

            return output.css.pipe(gulp.dest(this.dest));
        }.bind(this));
    }
});
