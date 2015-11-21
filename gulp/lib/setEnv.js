'use strict';

/**
 * Установка режимов окружения
 *
 * @module gulp/lib/setEnv
 * @type {Function}
 */

/**
 * Кешируем текущий режим окружения в глобальной области видимости. Это нужно для работы некоторых модулей, которые
 * могут работать как на back-end-е так и на front-end-е
 *
 * @param {String} env
 * @param {Object=} targetObj
 */
var setEnv = function (env, targetObj) {
    var g = targetObj || global || window || null;
    if (!g) {
        throw new Error('setEnv(): не удалось получить глобальный объект');
    }
    g.__DEV__ = (env === 'development' || typeof env === 'undefined');
    g.__PRODUCTION__ = (env === 'production');
    g.__STAGING__ = (env === 'staging');
    g.__CURRENT_ENV__ = env;
    return g;
};

module.exports = setEnv;
