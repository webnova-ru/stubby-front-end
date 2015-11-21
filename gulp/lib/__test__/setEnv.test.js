'use strict';

/**
 * Unit-тестирование для модуля setEnv
 *
 * @module test/specs/setEnv
 */

/**
 * Зависимости модуля
 */
var setEnv = require('../setEnv');

describe('gulp/lib/setEnv', function () {
    var env = process.env.NODE_ENV,
        keysName = [
            '__DEV__',
            '__PRODUCTION__',
            '__STAGING__',
            '__CURRENT_ENV__'
        ];

    it('должена быть функцией', function () {
        expect(setEnv).to.be.a('function');
    });

    it('возвращает объект', function () {
        expect(setEnv(env, {})).to.be.a('object');
    });

    it('возвращаемый объект должен иметь ключи: ' + keysName.join(' '), function () {
        expect(setEnv(env, {})).to.contain.all.keys(keysName);
    });

    it('Если второй параметр не указан устанавливает значения в глобальный объект', function () {
        var g = global;
        setEnv(env);
        expect(g).to.contain.all.keys(keysName);
    });
});
