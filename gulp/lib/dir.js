'use strict';

/**
 * Функция (с методами), помогающая строить пути к файлам проекта
 *
 * @example
 * dir('path1/', 'path2/', '/path3');   // 'path1/path2/path3'
 * dir.src.to('path1/', 'path2/path3'); // 'src/path1/path2/path3'
 * dir.src.to('!path1');                // '!src/path1'
 *
 * @module gulp/lib/dir
 * @type {Function}
 */

/**
 * Зависимости модуля
 */
var config = require('../config'),
    path = require('path');

/**
 * Функция-суррогат к методам модуля path, помогающая строить пути с негативными значениями
 *
 * @param {Function} method - метод объекта path
 * @param {Object} context - контекст вызова method-а, то есть сам path
 * @return {Function}
 */
var buildPathProxy = function (method, context) {
        /**
         * Строит путь при помощи функции method из замыкания,
         * определяет есть ли в пути негативный символ, делает весь путь негативным.
         * Если получает в качестве параметра массив, возвращает так же массив построенных путей
         *
         * @return {(string|Array.<string>)}
         */
        return function () {
            var negativeSymbol = '!',
                regExpNegativeSymbol = new RegExp(negativeSymbol + '+', 'g'),
                args = [].slice.apply(arguments).filter(Boolean),
                indexInArgsWithArr,
                arrInArgs = [],
                // определяет встречается ли в аргументах массив
                haveArrayInArgs = args.some(function (arg, index) {
                    if (Array.isArray(arg)) {
                        indexInArgsWithArr = index;
                        arrInArgs = arg;
                        return true;
                    }
                    return false;
                }),
                resArr,
                sourceArr = (haveArrayInArgs === false) ?
                    [args] :
                    arrInArgs.filter(Boolean).map(function (item) {
                        var copyArgs = args.slice();
                        copyArgs.splice(indexInArgsWithArr, 1, item);
                        return copyArgs;
                    });

            // проверяем если в кусочках нашего пути есть негативный символ,
            // то делаем весь путь негативным
            resArr = sourceArr.map(function (item) {
                var resPath = method.apply(context, item);
                if (resPath.indexOf(negativeSymbol) !== -1) {
                    resPath = negativeSymbol + resPath.replace(regExpNegativeSymbol, '');
                }
                return resPath;
            });
            return resArr.length === 1 ? resArr[0] : resArr;
        };
    },

    /**
     * Добавляет новый метод к объект{у,ам} targets
     *
     * @param {String} name
     * @param {(Array.<Function>|Function)} targets
     * @param {String} pathToDir
     */
    addPath = function (name, targets, pathToDir) {
        [].concat(targets).forEach(function (targetFn) {
            var method = targetFn[name];
            if (method === void 0) {
                method = targetFn.bind(targetFn, pathToDir);
                method.toString = method;
                method.valueOf = method;
                method.to = method;
                targetFn[name] = method;
            }
        });
    },
    dir = buildPathProxy(path.join, path);

dir.resolve = buildPathProxy(path.resolve, path);

addPath('cwd', dir, process.cwd());

Object.keys(config.dir).forEach(function (item) {
    var val = config.dir[item];
    if (typeof val === 'string' && val !== '') {
        addPath(item, [dir, dir.cwd], val);
    }
});

dir._addPath = addPath;
dir._buildPathProxy = buildPathProxy;

module.exports = dir;
