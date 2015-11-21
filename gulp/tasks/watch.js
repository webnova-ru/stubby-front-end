'use strict';

/**
 * Отслеживание изменений файла
 *
 * @example
 * $ gulp watch
 *
 * @module gulp/tasks/watch
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
module.exports = new Task({
    name: 'watch',

    define: function () {
        gulp.task(this.name, function (cb) {
            Task.watchTasksList.forEach(function (name) {
                var watchedTask = require('./' + name);
                var watchField = watchedTask.watch;
                if (watchField) {
                    if (typeof watchField === 'function') {
                        watchField.apply(watchedTask, []);
                    } else {
                        gulp.watch(dir.src.to(watchField), [watchedTask.name]);
                    }
                }
            });
            cb();
        });
    }
});
