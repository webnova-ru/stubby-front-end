'use strict';

/**
 * is - проверка различных типов данных
 *
 * @module gulp/lib/shared/is/index
 * @type {Object}
 */

/**
 * Зависимости модуля
 */
var invariant = require('./../invariant');

/**
 * Сообщения об ошибках для валидатора
 */
var errMsg = __DEV__ && require('./error-msg');

var is = {},

    // кешируем эти методы для большей минификации файла
    _toString = Object.prototype.toString,
    _slice = Array.prototype.slice,
    _hasOwnProperty = Object.prototype.hasOwnProperty,

    /**
     * Вызывает функцию, которая передана первым параметром и возвращает инвертированный результат
     * этой функции
     *
     * @param {Function} func
     * @return {Function}
     */
    not = function (func) {
        return function () {
            return !func.apply(null, _slice.call(arguments));
        };
    },

    /**
     * @param {Function} func
     * @return {Function}
     */
    all = function (func) {
        return function () {
            var parameters = _slice.call(arguments),
                length = parameters.length,
                i;

            if (length === 1 && is.array(parameters[0])) {
                parameters = parameters[0];
                length = parameters.length;
            }

            for (i = 0; i < length; i += 1) {
                if (!func.call(null, parameters[i])) {
                    return false;
                }
            }
            return true;
        };
    },

    /**
     * @param {Function} func
     * @return {Function}
     */
    any = function (func) {
        return function () {
            var parameters = _slice.call(arguments),
                length = parameters.length,
                i;

            if (length === 1 && is.array(parameters[0])) {
                parameters = parameters[0];
                length = parameters.length;
            }

            for (i = 0; i < length; i += 1) {
                if (func.call(null, parameters[i])) {
                    return true;
                }
            }
            return false;
        };
    },

    /**
     * Определить методы связанные с регулярными выражениями
     *
     * @param {Object} regexpsObj
     */
    defineRegexpMethods = function (regexpsObj) {
        var key,
            proxy = function (name) {
                return function (value) {
                    return regexpsObj[name].test(value);
                };
            };

        for (key in regexpsObj) {
            if (!regexpsObj.hasOwnProperty(key)) {
                continue;
            }
            is[key] = proxy(key);
        }
    },

    /**
     * Установить 'not', 'all', 'any' api и сообщения об ошибках для is
     */
    setInterfaces = function () {
        var options = is,
            option,
            interfaces,
            i,
            len;
        is.not = {};
        is.all = {};
        is.any = {};
        for (option in options) {
            if (_hasOwnProperty.call(options, option) && is.function(options[option])) {
                options[option].msg = __DEV__ && errMsg[option] && errMsg[option].default;
                interfaces = options[option].api || ['not', 'all', 'any'];
                for (i = 0, len = interfaces.length; i < len; i += 1) {
                    if (interfaces[i] === 'not') {
                        is.not[option] = not.call(null, is[option]);
                        is.not[option].msg = __DEV__ && errMsg[option] && errMsg[option].not;
                    }
                    if (interfaces[i] === 'all') {
                        is.all[option] = all.call(null, is[option]);
                        is.all[option].msg = __DEV__ && errMsg[option] && errMsg[option].all;
                    }
                    if (interfaces[i] === 'any') {
                        is.any[option] = any.call(null, is[option]);
                        is.any[option].msg = __DEV__ && errMsg[option] && errMsg[option].any;
                    }
                }
            }
        }
    };

/**
 * Проверяет является ли переданный параметр типа Arguments
 *
 * @param {*} value
 * @return {Boolean}
 */
is.args = function (value) {
    return is.not.null(value) &&
        (_toString.call(value) === '[object Arguments]' || (typeof value === 'object' && 'callee' in value));
};

/**
 * Проверяет является ли переданный параметр массивом
 *
 * @param {*} value
 * @return {Boolean}
 */
is.array = Array.isArray || function (value) {
    return _toString.call(value) === '[object Array]';
};

/**
 * Проверяет является ли переданный параметр булевым значением
 *
 * @param {*} value
 * @return {Boolean}
 */
is.boolean = function (value) {
    return value === true || value === false || _toString.call(value) === '[object Boolean]';
};

/**
 * Проверяет является ли переданный параметр типом Date
 *
 * @param {*} value
 * @return {Boolean}
 */
is.date = function (value) {
    return _toString.call(value) === '[object Date]';
};

/**
 * Проверяет является ли переданный параметр типом Error
 *
 * @param {*} value
 * @return {Boolean}
 */
is.error = function (value) {
    return _toString.call(value) === '[object Error]';
};

/**
 * Проверяет является ли переданный параметр типом Function
 *
 * @param {*} value
 * @return {Boolean}
 */
is.function = function (value) {
    return _toString.call(value) === '[object Function]' || typeof value === 'function';
};

/**
 * Проверяет является ли переданный параметр NaN значением
 *
 * @param {*} value
 * @return {Boolean}
 */
is.nan = function (value) {
    return value !== value;
};

/**
 * Проверяет является ли переданный параметр null значением
 *
 * @param {*} value
 * @return {Boolean}
 */
is.null = function (value) {
    return value === null;
};

/**
 * Проверяет является ли переданный параметр типом Number
 *
 * @param {*} value
 * @return {Boolean}
 */
is.number = function (value) {
    return is.not.nan(value) && _toString.call(value) === '[object Number]';
};

/**
 * Проверяет является ли переданный параметр объектом в широком смысле слова
 *
 * @param {*} value
 * @return {Boolean}
 */
is.object = function (value) {
    var type = typeof value;
    return type === 'function' || type === 'object' && !!value;
};

/**
 * Проверяет является ли переданный параметр простым объектом типа Object
 *
 * @param {*} value
 * @return {Boolean}
 */
is.plainObject = function (value) {
    return _toString.call(value) === '[object Object]';
};

/**
 * Проверяет является ли переданный параметр регулярным выражением типом RegExp
 *
 * @param {*} value
 * @return {Boolean}
 */
is.regexp = function (value) {
    return _toString.call(value) === '[object RegExp]';
};

/**
 * Проверяет одинаковость типов переданных параметров
 *
 * @param {*} value1
 * @param {*} value2
 * @return {Boolean}
 */
is.sameType = function (value1, value2) {
    if (is.nan(value1) || is.nan(value2)) {
        return is.nan(value1) === is.nan(value2);
    }
    return _toString.call(value1) === _toString.call(value2);
};
is.sameType.api = ['not'];

/**
 * Проверяет является ли переданный параметр строкой
 *
 * @param {*} value
 * @return {Boolean}
 */
is.string = function (value) {
    return _toString.call(value) === '[object String]';
};

/**
 * Проверяет является ли переданный параметр undefined
 *
 * @param {*} value
 * @return {Boolean}
 */
is.undefined = function (value) {
    return value === void 0;
};

/**
 * Проверяет является ли переданный параметр десятичным числом
 *
 * @param {Number} numb
 * @return {Boolean}
 */
is.decimal = function (numb) {
    invariant(is.number(numb), __DEV__ && 'is.decimal(...): Переданный параметр не является числом');
    return numb % 1 !== 0;
};

/**
 * Проверяет является ли переданный параметр целым числом
 *
 * @param {Number} numb
 * @return {Boolean}
 */
is.integer = function (numb) {
    invariant(is.number(numb), __DEV__ && 'is.integer(...): Переданный параметр не является числом');
    return numb % 1 === 0;
};

/**
 * Проверяет принадлежит ли переданный параметр объекту
 *
 * @param {String} name
 * @param {Object} obj
 * @return {Boolean}
 */
is.nameDefined = function (name, obj) {
    invariant(is.object(obj), __DEV__ && 'is.nameDefined(..., obj): Переданный параметр не является объектом');
    invariant(is.string(name), __DEV__ && 'is.nameDefined(name,...): Переданный параметр не является строкой');
    return name in obj;
};
is.nameDefined.api = ['not'];

/**
 * Проверяет является ли переданный параметр собственным свойством объекта
 *
 * @param {String} name
 * @param {Object} obj
 * @return {Boolean}
 */
is.ownName = function (name, obj) {
    invariant(is.object(obj), __DEV__ && 'is.ownName(..., obj): Переданный параметр не является объектом');
    invariant(is.string(name), __DEV__ && 'is.ownName(name,...): Переданный параметр не является строкой');
    return _hasOwnProperty.call(obj, name);
};
is.ownName.api = ['not'];

/**
 * Возвращает функцию для проверки наличия свойства (из параметра: name) в объекте
 *
 * @param {String} name
 * @return {function(this:{})}
 */
is.required = function (name) {
    var fn;
    invariant(is.string(name), __DEV__ && 'is.required(name): Переданный параметр не является строкой');
    fn = is.ownName.bind(is, name);
    // устанавливаем специальное поле нужное для метода валидации объектов
    fn[is.required.token] = true;
    return fn;
};
// у этого метода не должно быть дополнительных api
is.required.api = [];
// имя специального поля нужного для метода валидации объектов
is.required.token = 'isRequired';

/**
 * Проверяет находится ли переданный параметр в строке или массиве
 *
 * @param {String} name
 * @param {(String|Array)} strOrArr
 * @return {Boolean}
 */
is.include = function (name, strOrArr) {
    invariant(is.array(strOrArr) || is.string(strOrArr),
        __DEV__ && 'is.include(..., strOrArr): Переданный параметр не является строкой или массивом');
    invariant(is.string(name), __DEV__ && 'is.include(name,...): Переданный параметр не является строкой');
    return strOrArr.indexOf(name) > -1;
};
is.include.api = ['not'];

/**
 * Возвращает функцию для проверки наличия параметра name в массиве variantArr из замыкания
 *
 * @param {Array} variantArr
 * @return {Function}
 */
is.anyOf = function (variantArr) {
    invariant(is.array(variantArr), __DEV__ && 'is.anyOf(variantArr): Переданный параметр не является массивом');
    return function (name) {
        return is.include(name, variantArr);
    };
};
// у этого метода не должно быть дополнительных api
is.anyOf.api = [];

/**
 * Проверяет является ли переданный параметр пустым
 *
 * @param {*} value
 * @return {Boolean}
 */
is.empty = function (value) {
    var num;
    if (is.object(value)) {
        num = Object.getOwnPropertyNames(value).length;
        if (num === 0) {
            return true;
        } else if (num === 1 && is.array(value)) {
            return true;
        } else if (num === 2 && is.args(value)) {
            return true;
        }
        return false;
    }
    return value === '';
};

/**
 * Определяем методы связанные с регулярными выражениями
 */
defineRegexpMethods({
    /**
     * Проверяет является ли строка относительным путём
     */
    relativePath: /^\.\.?\/.+$/
});

/**
 * Проверяет является ли переданный объект валидным на основе переданных правил
 *
 * @param {Object} obj
 * @param {Object} policies объект к функциями для валидации объекта
 * @param {String=} title строка которя будет клеиться перед сообщением об ошибке
 * @return {Object}
 */
is.validObject = function (obj, policies, title) {
    var isValidFlag = true,
        msg = null,
        args = [];

    invariant(is.plainObject(policies),
        __DEV__ && 'is.validObject(..., policies): Переданный параметр не является простым объектом');
    invariant(is.object(obj),
        __DEV__ && 'is.validObject(obj,...): Переданный параметр не является объектом');

    Object.keys(policies).filter(Boolean).forEach(function (key) {
        var rules = policies[key];

        invariant(!!rules, __DEV__ && 'is.validObject(): Правила валидации для %s не заданы', key);

        [].concat(rules).filter(Boolean).forEach(function (rule) {
            var isRequiredRule;

            invariant(is.function(rule),
                __DEV__ && 'is.validObject(): Правило валидации для %s должно быть функцией', key);

            isRequiredRule = is.ownName(is.required.token, rule) && rule[is.required.token] === true;
            if (is.not.ownName(key, obj) && isRequiredRule === false) {
                return;
            }

            if (rule.call(null, isRequiredRule ? obj : obj[key]) === false) {
                isValidFlag = false;
                args.push(key);
                if (rule.msg) {
                    msg = (title ? title + ' ' : '') + 'is.validObject(): ' + rule.msg;
                }
            }
        });

    });

    return {
        condition: !!isValidFlag,
        args: args,
        msg: msg
    };

};
// не должно быть других интерфейсов
is.validObject.api = [];

// устанавливаем 'not', 'all', 'any' api для is и сообщения об ошибках
setInterfaces();

module.exports = is;
