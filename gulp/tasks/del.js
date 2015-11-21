'use strict';

/**
 * Удаление директорий
 *
 * @example
 * $ gulp delete:build
 * $ gulp delete:temp
 *
 * @module gulp/tasks/delete
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    config = require('../config/index'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'del',

    taskPostfix: {
        dest: config.dir.dest,
        temp: config.dir.temp,
        release: config.dir.release
    },

    plugins: {
        del: 'del',
        gutil: 'gulp-util'
    },

    define: function () {
        var taskPostfix = this.taskPostfix,
            taskPostfixName = Object.keys(taskPostfix),
            self = this,
            plg = this.plugins,

            /**
             * Замыкание для прокидывания постфикса имени таска в обработчик таска
             *
             * @param {String} name
             * @return {Function}
             */
            closure = function (name) {
                return function (cb) {
                    plg.del([taskPostfix[name]], cb);
                };
            };

        taskPostfixName.forEach(function (name) {
            gulp.task(self.name + ':' + name, closure(name));
        });

        gulp.task(this.name, function (cb) {
            plg.gutil.log(plg.gutil.colors.yellow('Таск следует запускать с постфиксом "имя_таска:имя_постфикса"'));
            plg.gutil.log('Доступные команды запуска таска:');

            taskPostfixName.forEach(function (name) {
                plg.gutil.log(plg.gutil.colors.green('$ gulp ' + self.name + ':' + name));
            });

            cb();
        });
    }
});
