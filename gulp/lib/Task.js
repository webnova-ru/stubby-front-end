'use strict';

/**
 * Объект описания задачи для gulp
 *
 * @module gulp/lib/Task
 * @type {Function}
 */

/**
 * Зависимости модуля
 */
var path = require('path'),
    fs = require('fs'),
    dir = require('./dir'),
    config = require('../config/index'),
    invariant = require('./shared/invariant'),
    is = require('./shared/is');

/**
 * Конструктор объекта задачи для gulp, содержит имя задачи и конфигурационные
 * данные
 *
 * @param {string|Object} options конфигурационные данные таска
 * @constructor
 */
var Task = function (options) {
    var opt;

    if (!(this instanceof Task)) {
        return new Task(options);
    }

    opt = typeof options === 'string' ? { name: options } : options;

    invariant(is.plainObject(opt), 'Task(): параметр "options" должен быть объектом или строкой');
    invariant(is.string(opt.name) && opt.name !== '',
        'Task(): поле "name" при создании объекта Task обязателено и должно быть строкой');
    invariant(is.not.ownName(opt.name, Task.tasks), 'Task(): имя таска opt.name должно быть уникально');

    Task.tasks[opt.name] = this;

    if (opt.watch) {
        Task.watchTasksList.push(opt.name);
    }

    this._init(opt);
};

/**
 * Список всех загруженных тасков
 *
 * @type {Object}
 */
Task.tasks = {};

/**
 * Список тасков, у которых нужно отслеживать изменения файлов
 *
 * @type {Array}
 */
Task.watchTasksList = [];

/**
 * Объект с настройками gulp-a
 *
 * @type {Object}
 */
Task.gulpConfig = config;

/**
 * Включает ленивую загрузку модулей при вызове метода Task.lazyRequire
 *
 * @type {boolean}
 */
Task.isLazyLoadPlugins = true;

/**
 * Ленивая загрузка модулей, переданных через параметры
 *
 * @param {Object} plugins
 * @return {Object}
 * @static
 */
Task.lazyRequire = function (plugins) {
    var pluginsObj = plugins,
        lazyPluginsObj = {},
        self = this;

    if (typeof plugins === 'string') {
        pluginsObj = {};
        pluginsObj[path.basename(plugins, path.extname(plugins))] = plugins;
    }

    invariant(is.plainObject(pluginsObj), 'Task.lazyRequire(): pluginsObj должно быть простым объектом');

    Object.keys(pluginsObj).forEach(function (key) {
        if (self.isLazyLoadPlugins === true) {
            invariant(is.not.relativePath(pluginsObj[key]),
                'Task.lazyRequire(): лениво можно подключать только модули по абсолютному пути');
            Object.defineProperty(lazyPluginsObj, key, {
                configurable: true,
                get: function () {
                    return require(pluginsObj[key]);
                }
            });
        } else {
            lazyPluginsObj[key] = require(pluginsObj[key]);
        }
    });

    return lazyPluginsObj;
};

/**
 * Назначить все таски gulp-a
 *
 * @static
 */
Task.defineAllTasks = function (tasksList) {
    var tasks = (Array.isArray(tasksList) && tasksList.length) ? tasksList : fs.readdirSync(dir.gulpTasks.to('./'));

    tasks.forEach(function (taskName) {
        var taskInst = require(dir.cwd.gulpTasks.to(taskName));
        taskInst.define();
    });
};

/**
 * Инициализация полей инстасна объекта Task
 *
 * @param {Object} opt
 * @private
 */
Task.prototype._init = function (opt) {
    Object.keys(opt).forEach(function (key) {
        this[key] = opt[key];
    }.bind(this));

    this.name = opt.name;
    this.info = opt.info || null;

    if (opt.src) {
        this.srcOrig = opt.src;
        this.src = dir.src.to(opt.src);
    }

    if (opt.dest) {
        this.destOrig = opt.dest;
        this.dest = dir.dest.to(opt.dest);
    }

    this.watch = opt.watch || null;
    this.options = opt.options || {};
    this.plugins = opt.plugins ? Task.lazyRequire.apply(this, [opt.plugins]) : {};

    if (is.function(opt.define)) {
        this.define = this._callOnceFn('define', opt.define);
    }
};

/**
 * Использовать левивую загрузку плагинов для таска
 *
 * @type {boolean}
 */
Task.prototype.isLazyLoadPlugins = true;

/**
 * Содержит в себе логику самого таска gulp-a, для каждого инстанса объекта-Task
 * этот метод должен быть переопределён
 *
 * @public
 */
Task.prototype.define = function () {
    throw new Error('Таск ' + this.name + ' должен содержать метод "define"');
};

/**
 * Позволяет вызывать возвращаемую функцию лишь один раз
 *
 * @param {String} name
 * @param {Function} fn
 * @return {Function}
 * @private
 */
Task.prototype._callOnceFn = function (name, fn) {
    return function () {
        if (!this['_is_' + name]) {
            this['_is_' + name] = true;
            return fn.apply(this, arguments);
        } else {
            throw new Error('Вызов метода "' + name + '" может быть лишь однажды');
        }
    }.bind(this);

};

module.exports = Task;

