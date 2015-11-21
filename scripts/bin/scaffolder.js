#!/usr/bin/env node

'use strict';

/**
 * Описывает управление скафолдера из командоной строки
 *
 * @module bin/scaffolder
 */

/**
 * Зависимости модуля
 */
var gutil = require('gulp-util'),
    prettyTime = require('pretty-hrtime'),
    chalk = require('chalk'),
    tildify = require('tildify'),
    minimist = require('minimist'),
    interpret = require('interpret'),
    v8flags = require('v8flags'),
    Liftoff = require('liftoff');

/**
 * Запомним директорию откуда запускаем утилиту перед выполнением liftoff
 */
process.env.INIT_CWD = process.cwd();

var argv = minimist(process.argv.slice(2)),
    cliCommand = argv._[0],
    runTaskName = 'scaffolder',
    utilName = 'scaffolder',
    version = '0.1.0',
    failed = false,
    cli = new Liftoff({
        processTitle: utilName,
        moduleName: 'gulp',
        configName: 'gulpfile',
        extensions: interpret.jsVariants,
        v8flags: v8flags
    }),

    /**
     * Формат ошибок orchestrator-а
     *
     * @param {Object} e
     * @return {(String|Error)}
     */
    formatError = function (e) {
        if (!e.err) {
            return e.message;
        }
        if (typeof e.err.showStack === 'boolean') {
            return e.err.toString();
        }
        if (e.err.stack) {
            return e.err.stack;
        }
        return new Error(String(e.err)).stack;
    },

    /**
     * Пачка обработчиков на события gulp-а
     *
     * @param {Object} gulpInst
     */
    logEvents = function (gulpInst) {
        gulpInst.on('err', function () {
            failed = true;
        });

        gulpInst.on('task_err', function (e) {
            var msg = formatError(e);
            var time = prettyTime(e.hrDuration);
            gutil.log(
                '\'' + chalk.cyan(e.task) + '\'',
                chalk.red('errored after'),
                chalk.magenta(time)
            );
            gutil.log(msg);
        });

        gulpInst.on('task_not_found', function (err) {
            gutil.log(
                chalk.red('Task \'' + err.task + '\' is not in your gulpfile')
            );
            process.exit(1);
        });
    },

    /**
     * Обработчик по завершению liftoff
     *
     * @param {Object} env
     * @callback
     */
    liftoffHandler = function (env) {
        var gulpInst;
        if (!env.modulePath) {
            gutil.log(
                chalk.red('Local gulp not found in'),
                chalk.magenta(tildify(env.cwd))
            );
            gutil.log(chalk.red('Try running: npm install gulp'));
            process.exit(1);
        }

        if (!env.configPath) {
            gutil.log(chalk.red('No gulpfile found'));
            process.exit(1);
        }

        /**
         * Устанавливаем в качестве рабочей директории процесса
         * директорию до которой поднялся liftoff, то есть директорию где находится gulpfile.js
         */
        if (process.cwd() !== env.cwd) {
            process.chdir(env.cwd);
        }

        /**
         * Запускаем все что написано в нашем gulpfile.js
         */
        require(env.configPath);
        gulpInst = require(env.modulePath);
        logEvents(gulpInst);

        process.nextTick(function () {
            if (global.SCAFFOLDER && global.SCAFFOLDER.name) {
                runTaskName = global.SCAFFOLDER.name;
            }
            gulpInst.start.apply(gulpInst, [cliCommand ? runTaskName + ':' + cliCommand : runTaskName]);
        });
    };

if (argv.v || argv.version) {
    console.log(utilName + ': ' + version);
    process.exit(0);
}

if (argv.help || argv.h) {
    console.log([
        'Запустите утилиту без аргументов, либо так:',
        utilName + ' [-h | --help] [-v | --version] [<имя команды>] [<имя файла>] [<дополнительные параметры>]',
        '',
        '-h, --help                      Справка по работе утилиты',
        '-v, --version                   Узнать версию утилиты',
        '<имя команды>                   Имя команды из конфигурационного файла скафолдера',
        '<имя файла>                     Имя файла, в который будет записан результат команды',
        '<дополнительные параметры>      Дополнительные параметры через пробел, которые будут переданы в шаблон'
    ].join('\n'));
    process.exit(0);
}

/**
 * Выход с 0 или 1
 */
process.once('exit', function (code) {
    if (code === 0 && failed) {
        process.exit(1);
    }
});

cli.on('respawn', function (flags, child) {
    var nodeFlags = chalk.magenta(flags.join(', ')),
        pid = chalk.magenta(child.pid);
    gutil.log('Node flags detected:', nodeFlags);
    gutil.log('Respawned to PID:', pid);
});

/**
 * Запускаем liftoff
 */
cli.launch({
    cwd: argv.cwd
}, liftoffHandler);
