'use strict';

/**
 * Unit-тестирование модуля Task
 *
 * @module test/specs/Task
 */

/**
 * Зависимости модуля
 */
var Task = require('../Task'),
    gulpConfig = require('../../config');

describe('gulp/lib/Task', function () {
    describe('Task.tasks', function () {
        it('Должно быть объектом', function () {
            expect(Task.tasks).to.be.a('object');
        });
        it('Должно содержать ссылку на созданный таск', function () {
            expect(new Task({ name: 'test1' })).to.be.equal(Task.tasks['test1']);
        });
    });
    describe('Task.watchTasksList', function () {
        it('Должно быть массивом', function () {
            expect(Task.watchTasksList).to.be.a('array');
        });
        it('Должно содержать имя созданного таска у которого есть поле .watch', function () {
            new Task({
                name: 'test2',
                watch: './file.js'
            });
            expect(Task.watchTasksList).to.include('test2');
        });
    });
    describe('Task.gulpConfig', function () {
        it('Должно быть объектом', function () {
            expect(Task.gulpConfig).to.be.a('object');
        });
        it('Должен содержать конфиг для gulp-а', function () {
            expect(Task.gulpConfig).to.deep.equal(gulpConfig);
        });
    });
    describe('Task.isLazyLoadPlugins', function () {
        it('Должно быть булевым значением', function () {
            expect(Task.isLazyLoadPlugins).to.be.a('boolean');
        });
    });
    describe('Task.defineAllTasks', function () {
        it('Должно быть функцией', function () {
            expect(Task.defineAllTasks).to.be.a('function');
        });
    });
    describe('Task.lazyRequire', function () {
        it('Должно быть функцией', function () {
            expect(Task.lazyRequire).to.be.a('function');
        });
        it('Должно возвращать объект', function () {
            expect(Task.lazyRequire('path')).to.be.a('object');
        });
        it('Ошибка если получает первым параметром не строку или объект', function () {
            assert.throw(function () {
                Task.lazyRequire(['path']);
            });
        });
    });
    describe('constructor', function () {
        it('Ошибка если не указано поле name в параметре инициализации', function () {
            assert.throw(function () {
                new Task({});
            });
        });
        it('Инстанс должен содержать метод .define', function () {
            var task = new Task({
                name: 'test3',
                define: function () {}
            });
            expect(task).to.have.ownProperty('define');
        });
        it('Ошибка если вызвать .define() без передачи метода define в параметре инициализации', function () {
            assert.throw(function () {
                var t = new Task({ name: 'test4' });
                t.define();
            });
        });
        it('Ошибка если вызвать у инстенса два раза метода .define()', function () {
            assert.throw(function () {
                var t = new Task({
                    name: 'test5',
                    define: function () {}
                });
                t.define();
                t.define();
            });
        });
        it('Инстанс должен имеет все поля, что ему передали при инициализации из параметра', function () {
            var param = {
                    name: 'test6',
                    define: function () {},
                    someMethod: function () {},
                    src: './',
                    dest: './',
                    someField: {}
                },
                t = new Task(param);
            expect(t).to.contain.all.keys(Object(param));
        });
    });
});
