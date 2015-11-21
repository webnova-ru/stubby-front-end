'use strict';

/**
 * Unit-тестирование для модуля is
 *
 * @module test/specs/is
 */

/**
 * Зависимости модуля
 */
var is = require('../index');

describe('gulp/lib/is', function () {

    it('is должен быть объектом', function () {
        expect(is).to.be.a('object');
    });

    it('is.not должен быть объектом', function () {
        expect(is.not).to.be.a('object');
    });

    it('is.any должен быть объектом', function () {
        expect(is.any).to.be.a('object');
    });

    it('is.all должен быть объектом', function () {
        expect(is.all).to.be.a('object');
    });

    describe('is.args', function () {
        it('should return true if passed parameter type is arguments', function () {
            var getArguments = function () {
                return arguments;
            };
            var args = getArguments('test');
            expect(is.args(args)).to.be.true;
        });
        it('should return false if passed parameter type is not arguments', function () {
            var notArguments = ['test'];
            expect(is.args(notArguments)).to.be.false;
        });
    });
    describe('is.not.args', function () {
        it('should return false if passed parameter type is arguments', function () {
            var getArguments = function () {
                return arguments;
            };
            var args = getArguments('test');
            expect(is.not.args(args)).to.be.false;
        });
        it('should return true if passed parameter type is not arguments', function () {
            var notArguments = ['test'];
            expect(is.not.args(notArguments)).to.be.true;
        });
    });
    describe('is.all.args', function () {
        it('should return true if all passed parameter types are arguments', function () {
            var getArguments = function () {
                return arguments;
            };
            var args = getArguments('test');
            expect(is.all.args(args, args)).to.be.true;
            expect(is.all.args([args, args])).to.be.true;
        });
        it('should return false if any passed parameter type is not arguments', function () {
            var notArguments = ['test'];
            var getArguments = function () {
                return arguments;
            };
            var args = getArguments('test');
            expect(is.all.args(args, notArguments)).to.be.false;
            expect(is.all.args([args, notArguments])).to.be.false;
        });
    });
    describe('is.any.args', function () {
        it('should return true if any passed parameter type is arguments', function () {
            var getArguments = function () {
                return arguments;
            };
            var args = getArguments('test');
            expect(is.any.args('test', args)).to.be.true;
            expect(is.any.args(['test', args])).to.be.true;
        });
        it('should return false if all passed parameter types are not arguments', function () {
            expect(is.any.args('test', null)).to.be.false;
            expect(is.any.args(['test', null])).to.be.false;
        });
    });
    describe('is.array', function () {
        it('should return true if passed parameter type is array', function () {
            var array = ['test'];
            expect(is.array(array)).to.be.true;
        });
        it('should return false if passed parameter type is not array', function () {
            var notArray = 'test';
            expect(is.array(notArray)).to.be.false;
        });
    });
    describe('is.not.array', function () {
        it('should return false if passed parameter type is array', function () {
            var array = ['test'];
            expect(is.not.array(array)).to.be.false;
        });
        it('should return true if passed parameter type is not array', function () {
            var notArray = 'test';
            expect(is.not.array(notArray)).to.be.true;
        });
    });
    describe('is.all.array', function () {
        it('should return true if all passed parameters types are array', function () {
            var array = ['test'];
            var array2 = ['test2'];
            expect(is.all.array(array, array2)).to.be.true;
            expect(is.all.array([array, array2])).to.be.true;
        });
        it('should return false if any passed parameter type is not array', function () {
            var notArray = 'test';
            var array = ['test'];
            expect(is.all.array(notArray, array)).to.be.false;
            expect(is.all.array([notArray, array])).to.be.false;
        });
    });
    describe('is.any.array', function () {
        it('should return true if any passed parameter type is array', function () {
            var array = ['test'];
            var array2 = ['test2'];
            expect(is.any.array(array, array2, 'test')).to.be.true;
            expect(is.any.array([array, array2, 'test'])).to.be.true;
        });
        it('should return false if all passed parameter types are not array', function () {
            expect(is.any.array('test', 'test2')).to.be.false;
            expect(is.any.array(['test', 'test2'])).to.be.false;
        });
    });
    describe('is.boolean', function () {
        it('should return true if passed parameter type is boolean', function () {
            var bool = true;
            expect(is.boolean(bool)).to.be.true;
        });
        it('should return false if passed parameter type is not boolean', function () {
            var notBool = 'test';
            expect(is.boolean(notBool)).to.be.false;
        });
    });
    describe('is.not.boolean', function () {
        it('should return true if passed parameter type is not boolean', function () {
            var notBool = 'test';
            expect(is.not.boolean(notBool)).to.be.true;
        });
        it('should return false if passed parameter type is boolean', function () {
            var bool = true;
            expect(is.not.boolean(bool)).to.be.false;
        });
    });
    describe('is.all.boolean', function () {
        it('should return true if all passed parameter types are boolean', function () {
            var bool1 = true;
            var bool2 = false;
            expect(is.all.boolean(bool1, bool2)).to.be.true;
            expect(is.all.boolean([bool1, bool2])).to.be.true;
        });
        it('should return false if passed parameter type is boolean', function () {
            var bool = true;
            var notBool = 'test';
            expect(is.all.boolean(bool, notBool)).to.be.false;
            expect(is.all.boolean([bool, notBool])).to.be.false;
        });
    });
    describe('is.any.boolean', function () {
        it('should return true if any passed parameter type is boolean', function () {
            var bool1 = true;
            var bool2 = false;
            expect(is.any.boolean(bool1, bool2, ['test'])).to.be.true;
            expect(is.any.boolean([bool1, bool2, ['test']])).to.be.true;
        });
        it('should return false if all passed parameter types are not boolean', function () {
            expect(is.any.boolean('test', {}, null)).to.be.false;
            expect(is.any.boolean(['test', {}, null])).to.be.false;
        });
    });
    describe('is.date', function () {
        it('should return true if passed parameter type is date', function () {
            var date = new Date();
            expect(is.date(date)).to.be.true;
        });
        it('should return false if passed parameter type is not date', function () {
            var notDate = 'test';
            expect(is.date(notDate)).to.be.false;
        });
    });
    describe('is.not.date', function () {
        it('should return false if passed parameter type is date', function () {
            var date = new Date();
            expect(is.not.date(date)).to.be.false;
        });
        it('should return true if passed parameter type is not date', function () {
            var notDate = 'test';
            expect(is.not.date(notDate)).to.be.true;
        });
    });
    describe('is.all.date', function () {
        it('should return true if all passed parameter types are date', function () {
            var myBirthDay = new Date('06-28-1986');
            var date = new Date();
            expect(is.all.date(myBirthDay, date)).to.be.true;
            expect(is.all.date([myBirthDay, date])).to.be.true;
        });
        it('should return false if any passed parameter type is not date', function () {
            var date = new Date();
            var notDate = 'test';
            expect(is.all.date(date, notDate)).to.be.false;
            expect(is.all.date([date, notDate])).to.be.false;
        });
    });
    describe('is.any.date', function () {
        it('should return true if any passed parameter type is date', function () {
            var date = new Date();
            expect(is.any.date('test', date)).to.be.true;
            expect(is.any.date(['test', date])).to.be.true;
        });
        it('should return false if all passed parameter types are not date', function () {
            expect(is.any.date('test', 1, undefined)).to.be.false;
            expect(is.any.date(['test', 1, undefined])).to.be.false;
        });
    });
    describe('is.error', function () {
        it('should return true if passed parameter type is error', function () {
            var error = new Error();
            expect(is.error(error)).to.be.true;
        });
        it('should return false if passed parameter type is not error', function () {
            var notError = 'test';
            expect(is.error(notError)).to.be.false;
        });
    });
    describe('is.not.error', function () {
        it('should return false if passed parameter type is error', function () {
            var error = new Error();
            expect(is.not.error(error)).to.be.false;
        });
        it('should return true if passed parameter type is not error', function () {
            var notError = 'test';
            expect(is.not.error(notError)).to.be.true;
        });
    });
    describe('is.all.error', function () {
        it('should return true if all passed parameter types are error', function () {
            var error1 = new Error();
            var error2 = new Error();
            expect(is.all.error(error1, error2)).to.be.true;
            expect(is.all.error([error1, error2])).to.be.true;
        });
        it('should return false if any passed parameter type is not error', function () {
            var error = new Error();
            var notError = 'test';
            expect(is.all.error(error, notError)).to.be.false;
            expect(is.all.error([error, notError])).to.be.false;
        });
    });
    describe('is.any.error', function () {
        it('should return true if any passed parameter type is error', function () {
            var error1 = new Error();
            expect(is.any.error(error1, new Date())).to.be.true;
            expect(is.any.error([error1, new Date()])).to.be.true;
        });
        it('should return false if all passed parameter types are not error', function () {
            expect(is.any.error(1, 2, 3)).to.be.false;
            expect(is.any.error([1, 2, 3])).to.be.false;
        });
    });
    describe('is.function', function () {
        it('should return true if passed parameter type is function', function () {
            expect(is.function(is.function)).to.be.true;
        });
        it('should return false if passed parameter type is not function', function () {
            var notFunction = 'test';
            expect(is.function(notFunction)).to.be.false;
        });
    });
    describe('is.not.function', function () {
        it('should return false if passed parameter type is function', function () {
            var notFunction = 'test';
            expect(is.function(notFunction)).to.be.false;
        });
        it('should return true if passed parameter type is not function', function () {
            expect(is.not.function(is.function)).to.be.false;
        });
    });
    describe('is.all.function', function () {
        it('should return true if all passed parameter types are function', function () {
            expect(is.all.function(is.function, is.string)).to.be.true;
            expect(is.all.function([is.function, is.string])).to.be.true;
        });
        it('should return false if any passed parameter type is not function', function () {
            var notFunction = 'test';
            expect(is.all.function(is.function, notFunction)).to.be.false;
            expect(is.all.function([is.function, notFunction])).to.be.false;
        });
    });
    describe('is.any.function', function () {
        it('should return true if any passed parameter type is function', function () {
            expect(is.any.function(is.function, [])).to.be.true;
            expect(is.any.function([is.function, []])).to.be.true;
        });
        it('should return false if all passed parameter types are not function', function () {
            expect(is.any.function(2, 'test')).to.be.false;
            expect(is.any.function([2, 'test'])).to.be.false;
        });
    });
    describe('is.nan', function () {
        it('should return true if passed parameter type is NaN', function () {
            expect(is.nan(NaN)).to.be.true;
        });
        it('should return false if passed parameter type is not NaN', function () {
            var notNaN = 'test';
            expect(is.nan(notNaN)).to.be.false;
        });
    });
    describe('is.not.nan', function () {
        it('should return false if passed parameter type is NaN', function () {
            var notNaN = 'test';
            expect(is.not.nan(notNaN)).to.be.true;
        });
        it('should return false if passed parameter type is not NaN', function () {
            expect(is.not.nan(NaN)).to.be.false;
        });
    });
    describe('is.all.nan', function () {
        it('should return true if all passed parameter types are NaN', function () {
            expect(is.all.nan(NaN, NaN)).to.be.true;
            expect(is.all.nan([NaN, NaN])).to.be.true;
        });
        it('should return false if any passed parameter type is not NaN', function () {
            var notNaN = 'test';
            expect(is.all.nan(NaN, notNaN)).to.be.false;
            expect(is.all.nan([NaN, notNaN])).to.be.false;
        });
    });
    describe('is.any.nan', function () {
        it('should return true if any passed parameter type is NaN', function () {
            expect(is.any.nan(NaN, NaN, 'test')).to.be.true;
            expect(is.any.nan([NaN, NaN, 'test'])).to.be.true;
        });
        it('should return false if all passed parameter types are not NaN', function () {
            expect(is.any.nan('test', new RegExp())).to.be.false;
            expect(is.any.nan(['test', new RegExp()])).to.be.false;
        });
    });
    describe('is.null', function () {
        it('should return true if passed parameter type is null', function () {
            expect(is.null(null)).to.be.true;
        });
        it('should return false if passed parameter type is not null', function () {
            var notNull = 'test';
            expect(is.null(notNull)).to.be.false;
        });
    });
    describe('is.not.null', function () {
        it('should return false if passed parameter type is null', function () {
            expect(is.not.null(null)).to.be.false;
        });
        it('should return true if passed parameter type is not null', function () {
            var notNull = 'test';
            expect(is.not.null(notNull)).to.be.true;
        });
    });
    describe('is.all.null', function () {
        it('should return true if all passed parameter types are null', function () {
            expect(is.all.null(null, null)).to.be.true;
            expect(is.all.null([null, null])).to.be.true;
        });
        it('should return false if any passed parameter type is not null', function () {
            var notNull = 'test';
            expect(is.all.null(null, notNull)).to.be.false;
            expect(is.all.null([null, notNull])).to.be.false;
        });
    });
    describe('is.any.null', function () {
        it('should return true if any passed parameter type is null', function () {
            expect(is.any.null(null, null, undefined)).to.be.true;
            expect(is.any.null([null, null, undefined])).to.be.true;
        });
        it('should return false if all passed parameter types are not null', function () {
            expect(is.any.null(1, 2)).to.be.false;
            expect(is.any.null([1, 2])).to.be.false;
        });
    });
    describe('is.number', function () {
        it('should return true if passed parameter type is number', function () {
            expect(is.number(1)).to.be.true;
        });
        it('should return false if passed parameter type is not number', function () {
            var notNumber = 'test';
            expect(is.number(notNumber)).to.be.false;
        });
        it('should return false if passed parameter is NaN', function () {
            expect(is.number(NaN)).to.be.false;
        });
    });
    describe('is.not.number', function () {
        it('should return false if passed parameter type is number', function () {
            expect(is.not.number(1)).to.be.false;
        });
        it('should return true if passed parameter type is not number', function () {
            var notNumber = 'test';
            expect(is.not.number(notNumber)).to.be.true;
        });
        it('should return true if passed parameter is NaN', function () {
            expect(is.not.number(NaN)).to.be.true;
        });
    });
    describe('is.all.number', function () {
        it('should return true if all passed parameter types are number', function () {
            expect(is.all.number(1, 2)).to.be.true;
            expect(is.all.number([1, 2])).to.be.true;
        });
        it('should return false if any passed parameter type is not number', function () {
            var notNumber = 'test';
            expect(is.all.number(1, notNumber)).to.be.false;
            expect(is.all.number([1, notNumber])).to.be.false;
        });
    });
    describe('is.any.number', function () {
        it('should return true if any passed parameter type is number', function () {
            expect(is.any.number(1, 2, NaN)).to.be.true;
            expect(is.any.number([1, 2, NaN])).to.be.true;
        });
        it('should return false if all passed parameter types are not number', function () {
            expect(is.any.number(null, 'test')).to.be.false;
            expect(is.any.number([null, 'test'])).to.be.false;
        });
    });
    describe('is.object', function () {
        it('should return true if passed parameter type is object', function () {
            expect(is.object({})).to.be.true;
        });
        it('should return false if passed parameter type is not object', function () {
            var notObject = 'test';
            expect(is.object(notObject)).to.be.false;
        });
    });
    describe('is.not.object', function () {
        it('should return false if passed parameter type is object', function () {
            expect(is.not.object({})).to.be.false;
        });
        it('should return true if passed parameter type is not object', function () {
            var notObject = 'test';
            expect(is.not.object(notObject)).to.be.true;
        });
    });
    describe('is.all.object', function () {
        it('should return true if all passed parameter types are object', function () {
            expect(is.all.object({}, {})).to.be.true;
            expect(is.all.object([{}, {}])).to.be.true;
        });
        it('should return false if any passed parameter type is not object', function () {
            var notObject = 'test';
            expect(is.all.object({}, notObject)).to.be.false;
            expect(is.all.object([{}, notObject])).to.be.false;
        });
    });
    describe('is.any.object', function () {
        it('should return true if any passed parameter type is object', function () {
            expect(is.any.object({}, {}, 'test')).to.be.true;
            expect(is.any.object([{}, {}, 'test'])).to.be.true;
        });
        it('should return false if all passed parameter types are not object', function () {
            expect(is.any.object(1, 2, 3)).to.be.false;
            expect(is.any.object([1, 2, 3])).to.be.false;
        });
    });

    describe('is.plainObject', function () {
        it('should return true if passed parameter type is a plain Object', function () {
            expect(is.plainObject({})).to.be.true;
        });
        it('should return false if passed parameter type is not a plain Object', function () {
            var notObject = 'test';
            expect(is.plainObject(notObject)).to.be.false;
        });
    });
    describe('is.not.plainObject', function () {
        it('should return false if passed parameter type is plain Object', function () {
            expect(is.not.plainObject({})).to.be.false;
        });
        it('should return true if passed parameter type is not plain Object', function () {
            var notObject = 'test';
            expect(is.not.plainObject(notObject)).to.be.true;
        });
    });
    describe('is.all.plainObject', function () {
        it('should return true if all passed parameter types are object', function () {
            expect(is.all.plainObject({}, {})).to.be.true;
            expect(is.all.plainObject([{}, {}])).to.be.true;
        });
        it('should return false if any passed parameter type is not object', function () {
            var notObject = 'test';
            expect(is.all.plainObject({}, notObject, [])).to.be.false;
            expect(is.all.plainObject([{}, notObject, ''])).to.be.false;
        });
    });
    describe('is.any.plainObject', function () {
        it('should return true if any passed parameter type is plainObject object', function () {
            expect(is.any.plainObject({}, {}, 'test')).to.be.true;
            expect(is.any.plainObject([{}, {}, 'test'])).to.be.true;
        });
        it('should return false if all passed parameter types are not plainObject object', function () {
            expect(is.any.plainObject(1, 2, 3)).to.be.false;
            expect(is.any.plainObject([1, 2, 3])).to.be.false;
        });
    });
    describe('is.regexp', function () {
        it('should return true if passed parameter type is regexp', function () {
            var regexp = new RegExp();
            expect(is.regexp(regexp)).to.be.true;
        });
        it('should return false if passed parameter type is not regexp', function () {
            var notRegexp = 'test';
            expect(is.regexp(notRegexp)).to.be.false;
        });
    });
    describe('is.not.regexp', function () {
        it('should return false if passed parameter type is regexp', function () {
            var regexp = new RegExp();
            expect(is.not.regexp(regexp)).to.be.false;
        });
        it('should return true if passed parameter type is not regexp', function () {
            var notRegexp = 'test';
            expect(is.not.regexp(notRegexp)).to.be.true;
        });
    });
    describe('is.all.regexp', function () {
        it('should return true if all passed parameter types are regexp', function () {
            var regexp = new RegExp();
            expect(is.all.regexp(regexp, /test/)).to.be.true;
            expect(is.all.regexp([regexp, /test/])).to.be.true;
        });
        it('should return false if any passed parameter type is not regexp', function () {
            var notRegexp = 'test';
            var regexp = new RegExp();
            expect(is.all.regexp(regexp, notRegexp)).to.be.false;
            expect(is.all.regexp([regexp, notRegexp])).to.be.false;
        });
    });
    describe('is.any.regexp', function () {
        it('should return true if any passed parameter type is regexp', function () {
            var regexp = new RegExp();
            expect(is.any.regexp(regexp, /test/, 1)).to.be.true;
            expect(is.any.regexp([regexp, /test/, 1])).to.be.true;
        });
        it('should return false if any passed parameter type is not regexp', function () {
            expect(is.any.regexp(1, 2)).to.be.false;
            expect(is.any.regexp([1, 2])).to.be.false;
        });
    });
    describe('is.sameType', function () {
        it('should return true if passed parameter types are same', function () {
            expect(is.sameType(1, 2)).to.be.true;
            expect(is.sameType('test', 'test')).to.be.true;
        });
        it('should return false if passed parameter types are not same', function () {
            expect(is.sameType(1, 'test')).to.be.false;
        });
    });
    describe('is.not.sameType', function () {
        it('should return false if passed parameter types are same', function () {
            expect(is.not.sameType(1, 2)).to.be.false;
            expect(is.not.sameType('test', 'test')).to.be.false;
        });
        it('should return true if passed parameter types are not same', function () {
            expect(is.not.sameType(1, 'test')).to.be.true;
        });
    });
    describe('is.string', function () {
        it('should return true if passed parameter type is string', function () {
            expect(is.string('test')).to.be.true;
        });
        it('should return false if passed parameter type is not string', function () {
            expect(is.string(1)).to.be.false;
        });
    });
    describe('is.not.string', function () {
        it('should return false if passed parameter type is string', function () {
            expect(is.not.string('test')).to.be.false;
        });
        it('should return true if passed parameter type is not string', function () {
            expect(is.not.string(1)).to.be.true;
        });
    });
    describe('is.all.string', function () {
        it('should return true if all passed parameter types are string', function () {
            expect(is.all.string('test', 'test')).to.be.true;
            expect(is.all.string(['test', 'test'])).to.be.true;
        });
        it('should return false if any passed parameter type is not string', function () {
            expect(is.all.string('test', 1)).to.be.false;
            expect(is.all.string(['test', 1])).to.be.false;
        });
    });
    describe('is.any.string', function () {
        it('should return true if any passed parameter type is string', function () {
            expect(is.any.string('test', 1)).to.be.true;
            expect(is.any.string(['test', 1])).to.be.true;
        });
        it('should return false if all passed parameter types are not string', function () {
            expect(is.any.string(null, 1)).to.be.false;
            expect(is.any.string([null, 1])).to.be.false;
        });
    });
    describe('is.undefined', function () {
        it('should return true if passed parameter type is undefined', function () {
            expect(is.undefined(undefined)).to.be.true;
        });
        it('should return false if passed parameter type is not undefined', function () {
            expect(is.undefined(null)).to.be.false;
            expect(is.undefined('test')).to.be.false;
        });
    });
    describe('is.not.undefined', function () {
        it('should return false if passed parameter type is undefined', function () {
            expect(is.not.undefined(undefined)).to.be.false;
        });
        it('should return false if passed parameter type is not undefined', function () {
            expect(is.not.undefined('test')).to.be.true;
        });
    });
    describe('is.all.undefined', function () {
        it('should return true if all passed parameter types are undefined', function () {
            expect(is.all.undefined(undefined, undefined)).to.be.true;
            expect(is.all.undefined([undefined, undefined])).to.be.true;
        });
        it('should return false if any passed parameter type is not undefined', function () {
            expect(is.all.undefined(undefined, null)).to.be.false;
            expect(is.all.undefined([undefined, null])).to.be.false;
        });
    });
    describe('is.any.undefined', function () {
        it('should return true if any passed parameter type is undefined', function () {
            expect(is.any.undefined('test', undefined)).to.be.true;
            expect(is.any.undefined(['test', undefined])).to.be.true;
        });
        it('should return false if any passed parameter type is not undefined', function () {
            expect(is.any.undefined(2, null)).to.be.false;
            expect(is.any.undefined([2, null])).to.be.false;
        });
    });

    describe('is.decimal', function () {
        it('should return true if given number is decimal', function () {
            expect(is.decimal(4.2)).to.be.true;
        });
        it('should return false if given number is not decimal', function () {
            expect(is.decimal(2)).to.be.false;
        });
        it('Ошибка если получает не число первым параметром', function () {
            assert.throw(function () {
                is.decimal('2.1');
            });
        });
    });
    describe('is.not.decimal', function () {
        it('should return false if given number is decimal', function () {
            expect(is.not.decimal(4.2)).to.be.false;
        });
        it('should return true if given number is not decimal', function () {
            expect(is.not.decimal(2)).to.be.true;
        });
    });
    describe('is.all.decimal', function () {
        it('should return true if all given numbers are decimal', function () {
            expect(is.all.decimal(1.2, 3.4, 5.6)).to.be.true;
            expect(is.all.decimal([1.2, 3.4, 5.6])).to.be.true;
        });
        it('should return false if any given number is not decimal', function () {
            expect(is.all.decimal(1.2, 3.4, 5)).to.be.false;
            expect(is.all.decimal([1.2, 3.4, 5])).to.be.false;
        });
    });
    describe('is.any.decimal', function () {
        it('should return true if any given number is decimal', function () {
            expect(is.any.decimal(1.2, 3, 5)).to.be.true;
            expect(is.any.decimal([1.2, 3, 5])).to.be.true;
        });
        it('should return false if all given numbers are not decimal', function () {
            expect(is.any.decimal(1, 3, 5)).to.be.false;
            expect(is.any.decimal([1, 3, 5])).to.be.false;
        });
    });
    describe('is.integer', function () {
        it('should return true if given number is integer', function () {
            expect(is.integer(4)).to.be.true;
        });
        it('should return false if given number is not integer', function () {
            expect(is.integer(2.2)).to.be.false;
        });
        it('Ошибка если получает не число первым параметром', function () {
            assert.throw(function () {
                is.integer('2');
            });
        });
    });
    describe('is.not.integer', function () {
        it('should return false if given number is integer', function () {
            expect(is.not.integer(4)).to.be.false;
        });
        it('should return true if given number is not integer', function () {
            expect(is.not.integer(2.2)).to.be.true;
        });
    });
    describe('is.all.integer', function () {
        it('should return true if all given numbers are integer', function () {
            expect(is.all.integer(1, 3, 5)).to.be.true;
            expect(is.all.integer([1, 3, 5])).to.be.true;
        });
        it('should return false if any given number is not integer', function () {
            expect(is.all.integer(1, 3.4, 5)).to.be.false;
            expect(is.all.integer([1, 3.4, 5])).to.be.false;
        });
    });
    describe('is.any.integer', function () {
        it('should return true if any given number is integer', function () {
            expect(is.any.integer(1.2, 3, 5)).to.be.true;
            expect(is.any.integer([1.2, 3, 5])).to.be.true;
        });
        it('should return false if all given numbers are not integer', function () {
            expect(is.any.integer(1.2, 3.4, 5.6)).to.be.false;
            expect(is.any.integer([1.2, 3.4, 5.6])).to.be.false;
        });
    });

    describe('is.nameDefined', function () {
        it('Возвращает true, если воторой параметр в своих свойствах содержит имя первого параметра', function () {
            expect(is.nameDefined('toString', {})).to.be.true;
        });
        it('Возвращает false, если воторой параметр в своих свойствах не содержит имя первого параметра', function () {
            expect(is.nameDefined('someParamNotInObject', {})).to.be.false;
        });
        it('Ошибка если получает первым параметром не строку', function () {
            assert.throw(function () {
                is.nameDefined(['toString'], {});
            });
        });
        it('Ошибка если получает вторым параметром не объект', function () {
            assert.throw(function () {
                is.nameDefined('toString', 'not object');
            });
        });
    });

    describe('is.ownName', function () {
        it('Возвращает true, если воторой параметр в своих свойствах содержит имя первого параметра', function () {
            expect(is.ownName('name', { name: 'test' })).to.be.true;
        });
        it('Возвращает false, если воторой параметр в своих свойствах не содержит имя первого параметра', function () {
            expect(is.ownName('someParamNotInObject', { name: 'test' })).to.be.false;
        });
        it('Ошибка если получает первым параметром не строку', function () {
            assert.throw(function () {
                is.ownName(['toString'], {});
            });
        });
        it('Ошибка если получает вторым параметром не объект', function () {
            assert.throw(function () {
                is.ownName('toString', 'not object');
            });
        });
    });

    describe('is.required', function () {
        it('Возвращает функцию', function () {
            expect(is.required('name')).to.be.a('function');
        });
        it('Ошибка если получает первым параметром не строку', function () {
            assert.throw(function () {
                is.required(['notString']);
            });
        });
        it('Имеет специальное поле is.required.token', function () {
            expect(is.required.token).to.be.a('string');
        });
        it('is.required(\'name\')({ name: \'test\' }) === is.ownName(\'name\', { name: \'test\' })', function () {
            expect(is.required('name')({ name: 'test' }) === is.ownName('name', { name: 'test' })).to.be.true;
        });
        it('Возвращает true, если результат вызывается как функция с параметром объекта имеющий свойство ' +
            'идентичное первому параметру вызова is.required', function () {
            expect(is.required('name')({ name: 'test' })).to.be.true;
        });
        it('Возвращает false, если результат вызывается как функция с параметром объекта не имеющий свойство ' +
            'идентичное первому параметру вызова is.required', function () {
            expect(is.required('test')({ name: 'test' })).to.be.false;
        });
        it('Возвращаемая функция имеет специальное поле ._isRequired === true', function () {
            expect(is.required('name')[is.required.token]).to.be.true;
        });
    });

    describe('is.anyOf', function () {
        it('Возвращает функцию', function () {
            expect(is.anyOf(['name1', 'name2'])).to.be.a('function');
        });
        it('Имеет поле .msg', function () {
            expect(is.anyOf).to.have.ownProperty('msg');
        });
        it('Ошибка если получает первым параметром не массив', function () {
            assert.throw(function () {
                is.anyOf('name2');
            });
        });
        it('is.anyOf([\'name1\', \'name2\'])(\'name1\') ' +
            '=== is.include(\'name1\', [\'name1\', \'name2\'])', function () {
            expect(is.anyOf(['name1', 'name2'])('name1') === is.include('name1', ['name1', 'name2'])).to.be.true;
        });
        it('Возвращает false, если результат вызывается как функция с параметром не содержащимся ' +
            'в массиве первого параметра вызова is.anyOf', function () {
            expect(is.anyOf(['name1', 'name2'])('name3')).to.be.false;
        });
    });

    describe('is.empty', function () {
        it('should return true if given array is empty', function () {
            expect(is.empty([])).to.be.true;
        });
        it('should return false if given object is not empty', function () {
            expect(is.empty({test: 'test'})).to.be.false;
        });
    });
    describe('is.not.empty', function () {
        it('should return false if given strinf is empty', function () {
            expect(is.not.empty('')).to.be.false;
        });
        it('should return true if given array is not empty', function () {
            expect(is.not.empty(['test'])).to.be.true;
        });
    });
    describe('is.all.empty', function () {
        it('should return true if given array, object and srting are empty', function () {
            expect(is.all.empty([], '', {})).to.be.true;
            expect(is.all.empty([[], '', {}])).to.be.true;
        });
        it('should return false if any given element is not empty', function () {
            expect(is.all.empty(['test'], {}, '')).to.be.false;
            expect(is.all.empty([['test'], {}, ''])).to.be.false;
        });
    });

    describe('is.validObject', function () {
        it('Является функцией', function () {
            expect(is.validObject).to.be.a('function');
        });
        it('Рузультат является объектом', function () {
            expect(is.validObject({}, {})).to.be.a('object');
        });
        it('Результат имеет свойства .msg и .condition', function () {
            var res = is.validObject({}, {});
            expect(res).to.contain.all.keys(['msg', 'condition', 'args']);
        });
        it('Возвращает true, если объект из первого параметра, ' +
            'проходит валидацию по объекту функций из второго объекта', function () {
            var res = is.validObject({
                name1: 'string',
                name2: {},
                name3: './path1/path2/fileName.js'
            }, {
                name1: [is.string, is.required('name1'), is.anyOf(['string', 'string2', 'string3'])],
                name2: is.plainObject,
                name3: [is.string, is.relativePath]
            });
            expect(res.condition).to.be.true;
        });
    });
});
