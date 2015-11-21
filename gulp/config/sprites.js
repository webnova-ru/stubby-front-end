'use strict';

/**
 * Конфиг для работы со спрайтами
 *
 * @module gulp/config/sprites
 * @type {Object}
 */

/**
 * Зависимости модуля
 */
var dir = require('../lib/dir');

var config;
module.exports = config = {
    /**
     * идентификатор пути спрайта:
     * если картинка имеет в своем пути эту строку, то она будет добавлена в спрайт
     */
    pathStringId: 'media/sprites/',

    /**
     * директория куда падают собранные спрайты
     */
    destDir: dir.dest.to('assets/img/'),

    sprites: {
        /**
         * Имя спрайта
         */
        spriteSheetName: 'sprite.png',

        /**
         * путь, который вставляется в css для спрайта
         */
        spriteSheetPath: '../img',

        /**
         * Путь, который конкатинируется с путём в url для каритнки, если в url путь абсолютный
         * в нашем случае нужно оставить пустым
         */
        baseUrl: '',

        /**
         * Движок для сборки спрайтов: "canvas" (canvassmith - самый быстрый, но работает только под UNIX)
         * Установка:
         * $ sudo apt-get update
         * $ sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ -y
         * $ sudo npm install -g node-gyp
         *
         * По-умолчанию и без лишних установок может работать на движке 'pngsmith', однако он не очень быстрый
         */
        engine: 'canvas',

        /**
         * алгоритм: top-down | left-right | diagonal (\ format) | alt-diagonal (/ format) | binary-tree
         */
        algorithm: 'binary-tree',

        /**
         * поля в пикселях от каждой картинки в спрайте
         */
        padding: 10,

        /**
         * Накапливает изображения из разных css-файлов и создает единый для них спрайт
         */
        accumulate: true,

        /**
         * Массив функций фильтрации картинок, которые нужно добавлять в спрайты
         * Если в пути картинки есть имя папки со спрайтами,
         * следовательно такую картинку нужно добавить в спрайт
         */
        filter: [function (image) {
            return (image.url.indexOf(config.pathStringId) !== -1);
        }],

        /**
         * Массив функций группировки картинок по спрайтам
         * Если путь картинки имеет вид 'spriteFolder/myCustomName/*.png',
         * то 'myCustomName' имя спрайта, который будет состоять из объектов(*.png) в этой папке
         */
        groupBy: [function (image) {
            var urlArray = image.url.split('/'),
                spriteGroupName = urlArray[urlArray.length - 2];
            if (spriteGroupName && /^[^.\s]+$/.test(spriteGroupName)) {
                return spriteGroupName;
            }
            return false;
        }]
    }
};
