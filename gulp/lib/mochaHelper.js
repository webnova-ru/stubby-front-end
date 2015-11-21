'use strict';

/**
 * Подключает для mocha нужные наборы библиотек
 */

/**
 * Зависимости модуля
 */
var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    setEnv = require('./setEnv');

// определяем режимы для нашего кода
setEnv(process.env['NODE_ENV']);

chai.use(sinonChai);

global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;
