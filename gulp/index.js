'use strict';

/**
 * Подключение всех gulp-тасков
 *
 * @example
 * Список всех тасков можно посмотреть так:
 * $ gulp --tasks
 *
 * @module gulp/index
 */

/**
 * Зависимости модуля
 */
var chalk = require('chalk'),
    Task = require('./lib/Task');

process.on('uncaughtException', function (err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

if (process.platform !== 'win32') {
    process.on('SIGINT', function () {
        console.log(chalk.yellow.bgBlack('\nОтмена и выход'));
        process.exit(1);
    });
}

Task.defineAllTasks();
