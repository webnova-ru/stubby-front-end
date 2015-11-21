'use strict';

/**
 * invariant
 *
 * @module shared/invariant
 * @type {Function}
 */

/**
 * Сообщение об ошибке, которое будет выводиться в продакшен режиме
 *
 * @type {string}
 */
var commonErrMsg = 'Произошла ошибка! Запустите код в development-режиме, чтобы узнать об ошибке подробную информацию';

/**
 * Проверить выражение, при котором ваша программная логика ожидает верное(true) значение
 * Если первым параметром приходит false, бросает ошибку с текстовым описанием из второго параметра.
 * Текстовое описание может быть в sprintf-стиле (поддерживается только %s)
 *
 * @example
 * invariant(typeof someName === 'string', 'someName должна быть строкой');
 *
 * @param {Boolean} condition
 * @param {String} msg
 */
var invariant = function (condition, msg) {
    var error,
        args,
        argIndex;

    if (__DEV__) {
        if (!msg) {
            throw new Error('Функция invariant должна имееть текстовое описание ошибки');
        }
    }

    if (!condition) {
        if (!msg) {
            error = new Error(commonErrMsg);
        } else {
            args = [].slice.call(arguments, 2);
            argIndex = 0;
            error = new Error(
                'Invariant: ' +
                msg.replace(/%s/g, function () {
                    var str = args[argIndex];
                    argIndex += 1;
                    return str;
                })
            );
        }
        error.framesToPop = 1;
        throw error;
    }
};

/**
 * Интерфейс для вызова функции invariant с параметром в виде объекта
 *
 * @param {Object} obj
 */
invariant.obj = function (obj) {
    if (!Object.hasOwnProperty.call(obj, 'condition')) {
        throw new Error(
            __DEV__ ? 'Метод invariant.obj должен принимать объект с полем .condition' : commonErrMsg
        );
    }
    invariant.apply(this, [obj.condition, obj.msg].concat(obj.args));
};

module.exports = invariant;
