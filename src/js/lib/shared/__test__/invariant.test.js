'use strict';

/**
 * Unit-тестирование для модуля invariant
 *
 * @module test/specs/invariant
 */

/**
 * Зависимости модуля
 */
var invariant = require('../../shared/invariant');

describe('shared/invariant', function () {
    describe('invariant()', function () {
        it('должена быть функцией', function () {
            expect(invariant).to.be.a('function');
        });

        it('Ошибка если получает false первым параметром', function () {
            assert.throw(function () {
                invariant(false, 'Текст ошибки');
            });
        });

        it('Ошибка если нет второго параметра в development-режиме', function () {
            var devEnv = global.__DEV__;

            assert.throw(function () {
                global.__DEV__ = true;
                invariant(true);
            });

            global.__DEV__ = devEnv;
        });
    });

    describe('invariant.obj()', function () {
        it('должена быть функцией', function () {
            expect(invariant.obj).to.be.a('function');
        });
        it('Ошибка если не получает объект со свойством .condition первым параметром', function () {
            assert.throw(function () {
                invariant.obj({
                    msg: 'Текст ошибки'
                });
            });
        });
        it('Ошибка если не получает объект со свойством .msg первым параметром', function () {
            assert.throw(function () {
                invariant.obj({
                    condition: true
                });
            });
        });

        it('Ошибка если получает первым параметром объект c .condition = false', function () {
            assert.throw(function () {
                invariant.obj({
                    condition: false,
                    msg: 'Текст ошибки'
                });
            });
        });
    });
});
