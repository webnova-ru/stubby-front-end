'use strict';

/**
 * stylint-helper некоторые методы нужные для валидации stylus-а
 *
 * @module gulp/lib/stylintHelper
 * @type {Object}
 */

/**
 * Зависимости модуля
 */
var chalk = require('chalk'),
    logSymbols = require('log-symbols'),
    path = require('path'),
    fs = require('fs'),
    stylint = require('stylint'),
    Checker = require('./Checker');

var stylintHelper = {

    /**
     * Пытается загрузить json-файл, если это получается возвращает содержимое файла в виде объекта
     *
     * @param {String} filePath
     * @return {(Object|false)}
     */
    tryGetJson: function (filePath) {
        var fileContent;
        try {
            fileContent = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
        } catch (err) {
            return false;
        }
        try {
            return JSON.parse(fileContent);
        } catch (err) {
            return false;
        }
    },

    /**
     * Валидация кода stylus-а
     *
     * @param {Object} config
     * @return {Stream.Transform}
     */
    checker: function (config) {
        return Checker.transform(function (file, enc, cb) {
            stylint(file.path, config)
                .methods({
                    read: function () {
                        this.cache.filesLen = 1;
                        this.cache.fileNo = 1;
                        this.cache.file = file.path;
                        this.cache.files = [file.path];
                        this.state.quiet = true;
                        this.parse(null, [file.contents.toString(enc)]);
                    },
                    done: function () {
                        var data = this.cache;
                        file.stylint = {
                            file: data.file,
                            warnings: data.warnings,
                            warningCount: data.warnings ? data.warnings.length : 0,
                            errors: data.errs,
                            errorCount: data.errs ? data.errs.length : 0,
                            msg: data.msg
                        };
                        this.resetOnChange();
                        cb(null, file);
                    }
                })
                .create();
        });
    },

    /**
     * Из строки получает объект с нужными данными для вывода в консоль
     *
     * @param {String} cutTitle
     * @param {Array} sourceArr
     * @return {Object.<Array>}
     */
    getInfo: function (cutTitle, sourceArr) {
        return sourceArr.map(function (item) {
            var msgArr = item.split('\n').filter(Boolean),
                text = msgArr[0].replace(cutTitle, ''),
                code = msgArr[2].replace('Line: ', ''),
                codeLine = '',
                codeText = code.replace(/^\d+:/, function (digit) {
                    codeLine = digit;
                    return '';
                }).trim();
            return {
                text: text,
                codeLine: codeLine,
                codeText: codeText
            };
        }).reduce(function (prev, curr) {
            if (!prev[curr.text]) {
                prev[curr.text] = [];
            }
            prev[curr.text].push({
                codeLine: curr.codeLine,
                codeText: curr.codeText
            });
            return prev;
        }, {});
    },

    /**
     * Проходит через поток и ищет в файлах информацию об ошибках, если они есть выводит её в консоль
     */
    reporter: Checker.transform(function (file, enc, cb) {
        var warn,
            err,
            total,
            summary,
            fileName = file.path.replace(process.cwd() + '/', ''),
            output = '',
            logger = console.log.bind(console),
            lineLen,
            gray = chalk.gray,
            yellow = chalk.yellow,
            red = chalk.red,

            /**
             * Добавляет строку с кодом ошибки в переменную для вывода в консоль
             *
             * @param {Object} obj
             */
            codeLineOutput = function (obj) {
                output += '\t' + gray(obj.codeLine) + ' ' + obj.codeText + '\n';
            };

        if (file.stylint) {
            warn = stylintHelper.getInfo('Warning: ', file.stylint.warnings);
            err = stylintHelper.getInfo('Error: ', file.stylint.errors);
            total = file.stylint.errorCount + file.stylint.warningCount;
            summary = file.stylint.msg.split('\n').filter(Boolean).map(function (item) {
                return item.replace(/\D+/g, '');
            });
            if (total !== 0) {
                lineLen = 70 - (20 + summary[0].toString().length + summary[1].toString().length);
                output += gray('┌' + (new Array(lineLen > 0 ? lineLen : 1).join('─'))) +
                    gray('┤') +
                    red('errs: ') + summary[0] +
                    gray(' · ') +
                    yellow('warns: ') + summary[1] +
                    gray('│') + '\n' +
                    gray('└ ') + chalk.underline.cyan(fileName) + '\n';

                if (file.stylint.errorCount !== 0) {
                    Object.keys(err).forEach(function (key) {
                        output += '\n' + logSymbols.error + red(' errs: ') + chalk.bold(key) + '\n';
                        err[key].forEach(codeLineOutput);
                    });
                }
                if (file.stylint.warningCount !== 0) {
                    Object.keys(warn).forEach(function (key) {
                        output += '\n' + logSymbols.warning + yellow(' warn: ') + chalk.bold(key) + '\n';
                        warn[key].forEach(codeLineOutput);
                    });
                }
                logger(output);
            }
        }
        cb(null, file);
    })
};

module.exports = stylintHelper;
