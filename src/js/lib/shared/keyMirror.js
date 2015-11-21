'use strict';

/**
 * keyMirror
 *
 * @module shared/keyMirror
 * @type {Function}
 */

/**
 * Зависимости модуля
 */
var invariant = require('./invariant');

/**
 * Делает значения ключей объекта равных именам ключей
 *
 * @example
 * var map = keyMirror({
 *      name: null,
 *      someName: null
 * })
 * // в map вернёт { name: 'name', someName: 'someName' }
 *
 * @param {Object} obj
 * @return {Object}
 */
var keyMirror = function (obj) {
    var ret = {},
        key;

    invariant(obj instanceof Object && !Array.isArray(obj),
        __DEV__ && 'keyMirror(...): параметр функции должен быть объектом');

    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        ret[key] = key;
    }
    return ret;
};

module.exports = keyMirror;
