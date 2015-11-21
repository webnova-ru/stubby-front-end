'use strict';

/**
 * Checker - класс-помощник для проверки code-style
 *
 * @module gulp/lib/Checker
 * @type {Function}
 */

/**
 * Зависимости модуля
 */
var gutil = require('gulp-util'),
    through2 = require('through2'),
    logSymbols = require('log-symbols'),
    Table = require('cli-table'),
    invariant = require('./shared/invariant'),
    is = require('./shared/is');

/**
 * Конструктор объекта проверки code-style исходя из переданных парметов
 *
 * @param {Object} opts конфигурационные данные
 * @constructor
 */
var Checker = function (opts) {
    invariant(is.ownName('checker', opts) && is.object(opts.checker),
        'new Checker(..): opts.checker обязательное поле и должно быть объектом');

    /**
     * Обработчик файлов
     *
     * @type {Function}
     */
    this.checker = opts.checker;

    /**
     * Конфигурационный файл или объект
     *
     * @type {?(string|Object)}
     */
    this.config = opts.config || null;

    /**
     * Текстовый заголовок в консоль
     *
     * @type {string}
     */
    this.titleText = opts.titleText || '';

    /**
     * Расширение файлов, которые нужно обработать
     *
     * @type {Array.<string>}
     */
    this.ext = [].concat(opts.ext).filter(Boolean).map(function (str) {
        return str.replace(/\*?\./, '');
    });

    /**
     * Репортер для вывода ошибок в консоль
     *
     * @type {Object}
     */
    this.reporter = opts.reporter || null;

    /**
     * Обработчик отлова ошибок из потока
     *
     * @type {?Stream.Transform}
     */
    this.catchError = opts.catchError || null;

    /**
     * Флаг, устанавливается в true если есть ошибки валидации
     *
     * @type {?Boolean}
     */
    this.hasErrors = null;

    Checker.store.push(this);
};

/**
 * Массив со всеми инстансами Checker-а
 *
 * @type {Array}
 */
Checker.store = [];

/**
 * Массив со всеми путями файлов, которые надо валидировать
 *
 * @type {Array}
 */
Checker.filesArray = [];

/**
 * Итоговая таблица с результатами проверки
 *
 * @type {Table}
 */
Checker.summaryTable = new Table({
    chars: {
        'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
        'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
        'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
        'right': '', 'right-mid': '', 'middle': ' '
    },
    style: {
        compact: true,
        'padding-left': 0,
        'padding-right': 1,
        head: ['yellow']
    }
});

/**
 * Добавить файл, который нужно будет провалидировать
 *
 * @param {String} filePath
 */
Checker.addFile = function (filePath) {
    var ext,
        addFlag = false;
    invariant(is.string(filePath), 'Checker.addFile(): параметр filePath должен быть строкой');

    // если попадается пустая строка проскакиваем мимо
    if (filePath === '') {
        return;
    }

    ext = filePath.split('.').pop();
    this.store.forEach(function (checker) {
        if (checker.ext.indexOf(ext) !== -1) {
            checker.hasErrors = false;
            addFlag = true;
        }
    });

    if (addFlag === true) {
        this.filesArray.push(filePath);
    }
};

/**
 * Сбросить состаяния проверки всех Checker-ов
 */
Checker.resetAllCheckers = function () {
    this.store.forEach(function (checker) {
        checker.resetChecker();
    });
    this.filesArray = [];
};

/**
 * Добавить строку в итоговую таблицу результатов валидации
 *
 * @param {Boolean} condition
 * @param {String} headerText
 * @param {String} onTrueText
 * @param {String} onFalseText
 */
Checker.addRowSummaryTable = function (condition, headerText, onTrueText, onFalseText) {
    var tableObj = {},
        statusCliStr = {
            error: function (text) {
                return gutil.colors.gray('[ ') +
                    logSymbols.error + gutil.colors.red(' ' + text) +
                    gutil.colors.gray(' ]');
            },
            success: function (text) {
                return gutil.colors.gray('[ ') +
                    logSymbols.success + gutil.colors.green(' ' + text) +
                    gutil.colors.gray(' ]');
            }
        };
    tableObj[headerText] = condition ? statusCliStr.success(onTrueText) : statusCliStr.error(onFalseText);
    Checker.summaryTable.push(tableObj);
};

/**
 * Выводит в консоль таблицу результатов валидации
 */
Checker.showSummaryTable = function () {
    if (Checker.summaryTable.length !== 0) {
        console.log(Checker.summaryTable.toString());
    }
};

/**
 * Получить результат валидации, если валидация хоть одного
 * checker-а не прошла успешно вернуть false
 *
 * @return {Boolean}
 */
Checker.getResult = function () {
    var status = true;
    this.store.forEach(function (checker) {
        if (checker.hasErrors !== null) {
            Checker.addRowSummaryTable(!checker.hasErrors, checker.titleText, 'успешна', 'провалена');
            checker.hasErrors && (status = false);
        }
    });
    Checker.showSummaryTable();
    return status;
};

/**
 * Обрабатывает файлы из потока через переданную в параметре функцию
 * Данная функция должна вызываться в методе .pipe(), так как возвращает поток типа Transform
 *
 * @param {Function} transformFn
 * @return {Stream.Transform}
 */
Checker.transform = function (transformFn) {
    return through2.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isStream()) {
            return cb(gutil.PluginError('Checker.transform',
                'Потоки не поддерживаются, используйте только Buffer'), file);
        }
        transformFn.apply(this, [file, enc, cb]);
    });
};

/**
 * Запускаем проверку файлов
 *
 * @return {*}
 */
Checker.prototype.runChecker = function () {
    return this.checker.apply(null, arguments.length !== 0 ? [].slice.call(arguments) : [this.config]);
};

/**
 * Установить формат вывода результатов проверки
 *
 * @param {Object} reporter
 */
Checker.prototype.setReporter = function (reporter) {
    invariant(is.object(reporter), '.setReporter(..): reporter должен быть объектом');
    this.reporter = reporter;
};

/**
 * Установить текстовое заголовок-название checker-а
 *
 * @param {String} text
 */
Checker.prototype.setTitleText = function (text) {
    invariant(is.string(text), '.setTitleText(..): text должен быть строкой');
    this.titleText = text;
};

/**
 * Сбрасывает статусы проверки валидации
 */
Checker.prototype.resetChecker = function () {
    this.hasErrors = null;
};

/**
 * Установить статусы валидации в значения провалено и сообщить об этом в консоль
 */
Checker.prototype.setErrorState = function () {
    this.hasErrors = true;
};

module.exports = Checker;
