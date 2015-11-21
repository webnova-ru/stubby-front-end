'use strict';

/**
 * Таск для скафолдинга файлов проекта
 *
 * @example
 * $ gulp scaffolder:test -n someName
 * $ gulp scaffolder:test --name='someName'
 *
 * или:
 * 1. Выполните "npm run ln-scaffolder",
 * 2. Убедитесь что в вашем $PATH есть строка './node_modules/.bin', если её нет добавьте её
 * и далее можно так:
 * $ scaffolder test someName
 * или даже просто так:
 * $ scaffolder
 *
 * @module gulp/tasks/scaffolder
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    dir = require('../lib/dir'),
    scaffolderSubTasks = require('../config/scaffolding'),
    Task = require('../lib/Task');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'scaffolder',

    subTasks: scaffolderSubTasks,

    plugins: {
        gutil: 'gulp-util',
        consolidate: 'gulp-consolidate',
        conflict: 'gulp-conflict',
        rename: 'gulp-rename',
        es: 'event-stream',
        dateFormat: 'dateformat',
        path: 'path',
        inquirer: 'inquirer'
    },

    define: function () {

        var plg = this.plugins,
            subTasks = this.subTasks,
            cwd = process.cwd(),
            self = this,

            /**
             * Возвращает строку с первой буквой в верхнем регистре
             *
             * @param {String} srt
             * @return {string}
             */
            capitalizeFirstLetter = function (srt) {
                return srt.charAt(0).toUpperCase() + srt.slice(1);
            },

            /**
             * Возвращает строку с первой буквой в нижнем регистре
             *
             * @param {String} srt
             * @return {string}
             */
            unCapitalizeFirstLetter = function (srt) {
                return srt.charAt(0).toLowerCase() + srt.slice(1);
            },

            /**
             * Замыкание для проброски результирующего пути в логгер gulp-conflict
             *
             * @param {String} resDir
             * @return {Function}
             */
            logger = function (resDir) {
                /**
                 * Выводит в консоль результаты scaffolder
                 */
                return function () {
                    var args = [].slice.call(arguments);
                    args[1] = plg.gutil.colors.magenta(dir(resDir, args[1]));
                    console.log.apply(console, ['[' + plg.gutil.colors.cyan(self.name) + ']'].concat(args));
                };
            },
            /**
             * Замыкание для правильной передачи параметов в функцию-обработчик таска
             *
             * @param {Object} key
             * @return {Function}
             */
            proxy = function (key) {
                /**
                 * Функция-обработчик самого таска
                 *
                 * @param {Object} cb
                 */
                return function (cb) {
                    var gOpts = global.SCAFFOLDER || {},
                        env = plg.gutil.env,
                        cliAction = gOpts.cliAction || env._[0],
                        cliName = gOpts.cliName || env._[1] || (env.n || env.name),
                        cliParams = gOpts.cliParams || env._.slice(2),
                        streams,
                        yellow = plg.gutil.colors.yellow,
                        fileDir = null,
                        ext = null;

                    if (!(cliAction === key || cliAction === self.name + ':' + key)) {
                        plg.gutil.log(yellow('Требуемая команда и таск gulp-а не совпадают'));
                        return cb();
                    }

                    if (!cliName) {
                        plg.gutil.log(yellow('Имя создаваемых файлов не указано!'));
                        return cb();
                    }

                    if (!subTasks[key].templates) {
                        plg.gutil.log(yellow('Объект конфига саб-таска не содержит поля "templates"!'));
                        return cb();
                    }

                    /**
                     * Если имя из командной строки является относительным путём,
                     * значит будем создавать новый файл по этому пути, вместо пути из конфига скафолдера
                     */
                    if (/^\.\.?\/.+$/.test(cliName)) {
                        fileDir = plg.path.dirname(cliName);
                        ext = plg.path.extname(cliName);
                        cliName = plg.path.basename(cliName, ext);
                    }

                    streams = [].concat(subTasks[key].templates)
                        .filter(Boolean)
                        .map(function (tpl) {
                            var fileName = cliName,
                                dest = tpl.createOwnFolder ? dir(tpl.dest, fileName) : tpl.dest,
                                extName,
                                srcFile,
                                dataTpl;

                            if (fileDir !== null) {
                                /**
                                 * INIT_CWD - директория из которой реально запущен gulp, до того как произойдет
                                 * лифтинг gulp-а
                                 */
                                dest = dir(process.env.INIT_CWD, fileDir);
                            } else {
                                if (tpl.capitalizeFirstLetter === true) {
                                    fileName = capitalizeFirstLetter(fileName);
                                }
                                if (tpl.unCapitalizeFirstLetter === true) {
                                    fileName = unCapitalizeFirstLetter(fileName);
                                }
                            }

                            if (!dest) {
                                plg.gutil.log(
                                    yellow('не указана директория сохранения для файла ' + fileName)
                                );
                                return null;
                            }

                            srcFile = tpl.srcDir ? dir(tpl.srcDir, tpl.name) : dir.scaffolding.to(tpl.name);
                            extName = tpl.ext || ext || plg.path.extname(srcFile);
                            extName = extName.indexOf('.') === 0 ? extName : '.' + extName;
                            dataTpl = {
                                author: process.env.USER,
                                created: plg.dateFormat(new Date(), 'dd.mm.yyyy'),
                                fileDir: dest,
                                fileName: fileName,
                                file: dir(dest, fileName + extName).replace(cwd + '/', ''),
                                fileWithoutExt: dir(dest, fileName).replace(cwd + '/', ''),
                                params: cliParams
                            };

                            return gulp.src(srcFile)
                                .pipe(plg.consolidate('lodash', dataTpl))
                                .pipe(plg.rename({
                                    basename: fileName,
                                    extname: extName
                                }))
                                .pipe(plg.conflict(dest, {
                                    defaultChoice: 'n',
                                    logger: logger(dest)
                                }))
                                .pipe(gulp.dest(dest));
                        })
                        .filter(Boolean);

                    plg.es.merge.apply(null, streams).on('end', cb);
                };
            };

        /**
         * Назначаем все саб-таски в одном цикле
         */
        Object.keys(subTasks).forEach(function (key) {
            gulp.task(self.name + ':' + key, proxy(key));
        });

        /**
         * Устанавливаем имя таска, которое будет запускать scaffolder
         *
         * @type {object}
         */
        global.SCAFFOLDER = {
            name: this.name,
            cliAction: null,
            cliName: null,
            cliParams: null
        };

        gulp.task(this.name, function (cb) {
            var subTask = Object.keys(gulp.tasks)
                    .filter(function (name) {
                        return (name.indexOf(self.name + ':') === 0);
                    })
                    .map(function (name) {
                        return name.split(':').pop();
                    })
                    .filter(Boolean)
                    .map(function (val) {
                        var info = subTasks[val].info || '';
                        return {
                            name: val + plg.gutil.colors.yellow(' · ') + plg.gutil.colors.grey(info),
                            value: val
                        };
                    }),
                exitName = 'exit',
                choices = subTask.concat([
                    new plg.inquirer.Separator(),
                    {
                        name: 'Выход',
                        value: exitName
                    }
                ]),

                /**
                 * Проброска в обработчик имя запускаемого таска через замыкание
                 *
                 * @param {String} runTaskName
                 * @return {Function}
                 */
                inputHandlerProxy = function (runTaskName) {

                    /**
                     * Обработчик после действия пользователя по вводу назнания файла для скафолдера
                     *
                     * @param {Object} inputs
                     */
                    return function (inputs) {
                        var gOpts = global.SCAFFOLDER;

                        gOpts.cliAction = runTaskName;
                        gOpts.cliName = inputs.name;

                        if (inputs.params !== '') {
                            gOpts.cliParams = [].concat(inputs.params.split(' ')).filter(Boolean);
                        }

                        gulp.start(runTaskName, cb);
                    };
                },

                /**
                 * Обработчик ответа от пользователя выбора комманды
                 *
                 * @param {Object} answers
                 * @return {*}
                 */
                actionHandler = function (answers) {
                    var prompts;
                    if (answers.action === exitName) {
                        console.log(
                            '[' + plg.gutil.colors.cyan(self.name) + ']',
                            plg.gutil.colors.yellow('Вы вышли')
                        );
                        return cb();
                    }

                    prompts = [
                        {
                            type: 'input',
                            name: 'name',
                            message: 'Напишите имя создаваемого файла:',
                            validate: function (val) {
                                return /^[\w.\-]+$/.test(val);
                            }
                        },
                        {
                            type: 'input',
                            name: 'params',
                            message: 'Добавьте ещё параметров в шаблон, если требуется:'
                        }
                    ];

                    plg.inquirer.prompt(prompts, inputHandlerProxy(self.name + ':' + answers.action));
                };

            plg.inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'Выберите команду?',
                choices: choices
            }, actionHandler);
        });
    }
});
