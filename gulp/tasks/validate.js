'use strict';

/**
 * Валидация кода
 *
 * @example
 * $ git diff --cached --name-only | gulp validate
 *
 * @module gulp/tasks/validate
 * @type {Task}
 */

/**
 * Зависимости модуля
 */
var gulp = require('gulp'),
    Task = require('../lib/Task'),
    Checker = require('../lib/Checker');

/**
 * Создаем таск с нужным именем и конфигурационными данными
 *
 * @type {Task}
 */
module.exports = new Task({
    name: 'validate',

    plugins: {
        jscs: 'gulp-jscs',
        eslint: 'gulp-eslint',
        filter: 'gulp-filter',
        split: 'split'
    },

    /**
     * Логика и определение задачи для gulp-a
     */
    define: function () {
        var plg = this.plugins;
        gulp.task(this.name, function (cb) {
            var stylintHelper = require('../lib/stylintHelper');
            var jscs = new Checker({
                    checker: plg.jscs,
                    config: './.jscsrc',
                    ext: '.js',
                    titleText: 'Проверка JSCS:'
                }),
                esLint = new Checker({
                    checker: plg.eslint,
                    config: {
                        useEslintrc: true
                    },
                    ext: '.js',
                    titleText: 'Проверка ESLINT:',
                    reporter: plg.eslint.format('stylish', console.log.bind(console)),
                    catchError: Checker.transform(function (file, enc, next) {
                        if (file.eslint && file.eslint.errorCount !== 0) {
                            esLint.setErrorState();
                        }
                        next(null, file);
                    })
                }),
                stylint = new Checker({
                    checker: stylintHelper.checker,
                    config: stylintHelper.tryGetJson('.stylintrc') || null,
                    ext: '.styl',
                    titleText: 'Проверка STYLINT:',
                    catchError: Checker.transform(function (file, enc, next) {
                        if (file.stylint && (file.stylint.errorCount !== 0 || file.stylint.warningCount !== 0)) {
                            stylint.setErrorState();
                        }
                        next(null, file);
                    }),
                    reporter: stylintHelper.reporter
                }),
                onlyJs = plg.filter('*.js', { restore: true }),
                onlyStyl = plg.filter('*.styl', { restore: true });

            Checker.resetAllCheckers();

            process.stdin
                .pipe(plg.split())
                .on('data', function (data) {
                    data.split(' ').forEach(function (line) {
                        if (line) {
                            Checker.addFile(line);
                        }
                    });
                })
                .on('end', function () {
                    gulp.src(Checker.filesArray)
                        .pipe(onlyJs)
                        // jscs validate
                        .pipe(jscs.runChecker())
                        .on('error', function (error) {
                            jscs.setErrorState();
                            console.log(error.message);
                        })
                        // eslint validate
                        .pipe(esLint.runChecker())
                        .pipe(esLint.catchError)
                        .pipe(esLint.reporter)
                        // возвращаем все данные в поток
                        .pipe(onlyJs.restore)
                        // stylint validate
                        .pipe(onlyStyl)
                        .pipe(stylint.runChecker())
                        .pipe(stylint.catchError)
                        .pipe(stylint.reporter)
                        // возвращаем все данные в поток
                        .pipe(onlyStyl.restore)
                        // сливаем все данные из потока, чтобы сэмитить событие 'end'
                        .resume()
                        .on('end', function () {
                            if (Checker.getResult() === false) {
                                process.exit(1);
                            }
                            cb();
                        });
                });
        });
    }
});
