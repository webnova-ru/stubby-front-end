'use strict';

/**
 * Конфиг для scaffolder-а
 *
 * @module gulp/config/scaffolding
 * @type {Object}
 */

/**
 * Зависимости модуля
 */
var dir = require('../lib/dir');

/**
 * По-умолчанию, если не указано свойство "srcDir", все пути для шаблонов берутся из конфига gulp-a
 *
 * @example
 * {
 *     name: 'temp.styl',
 *     dest: dir.src.to('stylus/')
 * }
 *  Будет взято из: require('gulp/config/index').dir.scaffolding + '/temp.styl'
 *
 * {
 *     name: 'info.styl',
 *     srcDir: './scaffolding/templates',
 *     createOwnFolder: true,
 *     dest: dir.dest.to('./assets')
 * }
 *  Будет взято из: './scaffolding/templates/info.styl'
 *
 *  Можно создавать несколько файлов:
 * 'test-info': {
 *      info: 'простая задача для тестирования работы скафолдера',
 *      templates: [
 *          {
 *              name: 'test-info.txt',
 *              ext: 'js',
 *              capitalizeFirstLetter: true,
 *              dest: dir.dest.to('./')
 *          },
 *          {
 *              name: 'info.styl',
 *              ext: '.css',
 *              unCapitalizeFirstLetter: true,
 *              dest: dir.dest.to('./assets')
 *          }
 *      ]
 *  }
 */
module.exports = {
    'js-node': {
        info: 'создать простой js-файл для nodejs',
        templates: {
            name: 'js-node.js.template',
            ext: 'js',
            dest: dir('gulp/lib')
        }
    },

    'gulp-task': {
        info: 'создать простой таск для gulp-а',
        templates: {
            name: 'gulp-task.js.template',
            ext: 'js',
            dest: dir.gulpTasks.to('./')
        }
    }
};
