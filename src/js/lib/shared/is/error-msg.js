'use strict';

/**
 * Сообщения об ошибках для валидатора
 *
 * @module gulp/lib/is/error-msg
 * @type {Object}
 */

module.exports = {
    args: {
        default: '%s не является типом Arguments',
        not: '%s является типом Arguments',
        any: 'ни один элемент из %s не является типом Arguments',
        all: 'не все элементы из %s являются типом Arguments'
    },
    array: {
        default: '%s не является массивом',
        not: '%s является массивом',
        any: 'ни один элемент из %s не является массивом',
        all: 'не все элементы из %s являются массивом'
    },
    boolean: {
        default: '%s не является булевым значением',
        not: '%s является булевым значением',
        any: 'ни один элемент из %s не является булевым значением',
        all: 'не все элементы из %s являются булевыми значениями'
    },
    date: {
        default: '%s не является типом Date',
        not: '',
        any: '',
        all: ''
    },
    error: {
        default: '%s не является типом Error',
        not: '',
        any: '',
        all: ''
    },
    function: {
        default: '%s не является типом Function',
        not: '',
        any: '',
        all: ''
    },
    nan: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    null: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    number: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    object: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    plainObject: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    regexp: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    sameType: {
        default: '',
        not: ''
    },
    string: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    undefined: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    decimal: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    integer: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    domNode: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    domElement: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    nameDefined: {
        default: '',
        not: ''
    },
    ownName: {
        default: '',
        not: ''
    },
    required: {
        default: ''
    },
    include: {
        default: '',
        not: ''
    },
    anyOf: {
        default: ''
    },
    empty: {
        default: '',
        not: '',
        any: '',
        all: ''
    },
    relativePath: {
        default: '',
        not: '',
        any: '',
        all: ''
    }
};
