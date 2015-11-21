'use strict';

/**
 * Построение сторики с именами css-классов
 *
 * @module src/js/lib/makeCssClass
 * @type {Function}
 */

/**
 * Создает строку с именами css-классов из входящего массива
 *
 * @param {Array} arr
 * @param {String} str
 * @return {String}
 */
var makeCssClass = function (arr, str) {
    arr.filter(Boolean)
        .forEach(function (item) {
            if (typeof item === 'string' && item !== '') {
                str += item + ' ';
            } else if (Array.isArray(item)) {
                str += makeCssClass(item, '');
            }
        });
    return str;
};

export default makeCssClass;
