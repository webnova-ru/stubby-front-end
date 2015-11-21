'use strict';

/**
 * Unit-тестирование модуля dir
 *
 * @module test/specs/dir
 */

/**
 * Зависимости модуля
 */
var path = require('path'),
    dir = require('../dir'),
    config = require('../../config/index');

describe('lib/dir', function () {
    it('dir должна быть функцией', function () {
        expect(dir).to.be.a('function');
    });

    describe('Общая работа функции', function () {
        it('dir("f/", "f1/f2", "/f3") === "f/f1/f2/f3"', function () {
            assert.equal(dir('f/', 'f1/f2', '/f3'), 'f/f1/f2/f3');
        });

        it('dir("f/", "/f1/f2", "./f3/") === "/f/f1/f2/f3/"', function () {
            assert.equal(dir('/f/', 'f1/f2', './f3/'), '/f/f1/f2/f3/');
        });

        it('dir("/f", "f1/f2") === "/f/f1/f2"', function () {
            assert.equal(dir('/f/', 'f1/f2'), '/f/f1/f2');
        });

        it('dir("f", "./f1/f2") === "f/f1/f2"', function () {
            assert.equal(dir('f/', './f1/f2'), 'f/f1/f2');
        });

        it('dir("f", "f1/f2", "../f3") === "f/f1/f3"', function () {
            assert.equal(dir('f', 'f1/f2', '../f3'), 'f/f1/f3');
        });

        it('dir("../f", "f1/f2") === "../f/f1/f2"', function () {
            assert.equal(dir('../f', 'f1/f2'), '../f/f1/f2');
        });

        it('dir("f1/", ["./f2", "f3/f5"], "f4") === ["f1/f2/f4", "f1/f3/f5/f4"]', function () {
            expect(dir('f1/', ['./f2', 'f3/f5'], 'f4')).to.deep.equal(['f1/f2/f4', 'f1/f3/f5/f4']);
        });
    });

    describe('Работа функции с негативными значениями', function () {
        it('dir("!f/", "f1/f2", "/f3") === "!f/f1/f2/f3"', function () {
            assert.equal(dir('!f/', 'f1/f2', '/f3'), '!f/f1/f2/f3');
        });

        it('dir("f/", "!f1/f2") === "!f/f1/f2"', function () {
            assert.equal(dir('f/', '!f1/f2'), '!f/f1/f2');
        });

        it('dir("f/", "f1/!f2", "/f3") === "!f/f1/f2/f3"', function () {
            assert.equal(dir('f/', 'f1/!f2', '/f3'), '!f/f1/f2/f3');
        });

        it('dir("../f/", "!f1/f2") === "!../f/f1/f2"', function () {
            assert.equal(dir('../f/', '!f1/f2'), '!../f/f1/f2');
        });

    });

    describe('#_addPath', function () {
        var field = 'testField';

        sinon.spy(dir, '_addPath');
        dir._addPath(field, dir, 'testPath');

        after(function () {
            dir._addPath.restore();
            dir[field] = void 0;
        });

        it('добавляет новое свойство типа function в dir', function () {
            assert.typeOf(dir[field], 'function');
        });

        it('Добавленное свойство должно иметь поле с именем "to" типа функция', function () {
            assert.typeOf(dir[field].to, 'function');
        });

        it('dir.someName.to(\'path\') === dir.someName(\'path\')', function () {
            assert.equal(dir[field].to('path'), dir[field]('path'));
        });

        it('dir.testField.to(\'next1\', \'next2\') === dir(\'testField\', \'next1\', \'next2\')', function () {
            assert.equal(dir[field].to('next1', 'next2'), dir(dir._addPath.firstCall.args[2], 'next1', 'next2'));
        });

        it('Если добавленное свойство, вызывается с массивом в первом параметре, ' +
            'то возвращает массив путей', function () {
            assert.deepEqual(dir[field].to(['nextPath1', '!nextPath2']), [
                dir._addPath.firstCall.args[2] + '/nextPath1',
                '!' + dir._addPath.firstCall.args[2] + '/nextPath2'
            ]);
        });

    });

    describe('#resolve', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.resolve, 'function');
        });

        it('dir.resolve(\'path\') === path.resolve(\'path\')', function () {
            assert.equal(dir.resolve('path'), path.resolve('path'));
        });

        it('dir.resolve(\'!path/!to/path2\') === \'!\' + path.resolve(\'path/to/path2\')', function () {
            assert.equal(dir.resolve('!path/!to/path2'), '!' + path.resolve('path/to/path2'));
        });
    });

    describe('#src', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.src.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.src', function () {
            assert.equal(dir.src.to('path'), dir(config.dir.src, 'path'));
        });
    });

    describe('#temp', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.temp.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.temp', function () {
            assert.equal(dir.temp.to('path'), dir(config.dir.temp, 'path'));
        });
    });

    describe('#dest', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.dest.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.dest', function () {
            assert.equal(dir.dest.to('path'), dir(config.dir.dest, 'path'));
        });
    });

    describe('#release', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.release.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.release', function () {
            assert.equal(dir.release.to('path'), dir(config.dir.release, 'path'));
        });
    });

    describe('#gulpTasks', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.gulpTasks.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.gulpTasks', function () {
            assert.equal(dir.gulpTasks.to('path'), dir(config.dir.gulpTasks, 'path'));
        });
    });

    describe('#scaffolding', function () {
        it('должен быть функцией', function () {
            assert.typeOf(dir.scaffolding.to, 'function');
        });

        it('Должен выдавать путь из конфига config.dir.scaffolding', function () {
            assert.equal(dir.scaffolding.to('path'), dir(config.dir.scaffolding, 'path'));
        });
    });
});
