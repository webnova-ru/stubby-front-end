'use strict';

/**
 * Unit-тестирование для модуля keyMirror
 *
 * @module test/specs/keyMirror
 */

/**
 * Зависимости модуля
 */
var keyMirror = require('../keyMirror');

describe('shared/keyMirror', function () {
    it('должена быть функцией', function () {
        expect(keyMirror).to.be.a('function');
    });

    it('Возвращает объект', function () {
        var obj = {
                red: null,
                green: null,
                white: null
            };
        expect(keyMirror(obj)).to.a('object');
    });

    it('Кидает ошибку если передали в функцию не объект', function () {
        assert.throw(function () {
            keyMirror(['not object', 'not object']);
        });
    });

    it('Возвращает объект с значениями равным именам ключей переданного объекта', function () {
        var obj = {
                red: null,
                green: null,
                white: null
            },
            expectObj = {
                red: 'red',
                green: 'green',
                white: 'white'
            };
        expect(keyMirror(obj)).to.deep.equal(expectObj);
    });
});
