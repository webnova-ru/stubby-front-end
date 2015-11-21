'use strict';

/**
 * stylComponentLoader:
 * Лоудер для подклейки stylus-файликов из компонентов в основную сборку stylus-а
 *
 * @module gulp/lib/loaders/stylComponent
 * @type {Function}
 */

/**
 * Зависимости модуля
 */
var consolidate = require('consolidate'),
    loaderUtils = require('loader-utils'),
    path = require('path'),
    fs = require('fs-extra'),
    invariant = require('../shared/invariant');

/**
 * Записывает содержимое contents в файл по пути filePath и создает директории из filePath, если их нет
 *
 * @param {String} filePath
 * @param {String} contents
 * @param {Function} cb
 */
var writeFile = function (filePath, contents, cb) {
        fs.mkdirs(path.dirname(filePath), function (err) {
            if (err) {
                return cb(err);
            }
            return fs.writeFile(filePath, contents, cb);
        });
    },

    /**
     * Лоудер для stylus компонентов
     *
     * @param {String} source
     * @return {String}
     */
    stylComponentLoader = function (source) {
        if (this.cacheable) {
            this.cacheable();
        }
        return source;
    },

    /**
     * Плагин нашего лоудера
     */
    Plugin,

    /**
     * Накапливает параметры загружаемого ресурса, для дальнейшего использования их в шаблоне stylus-а
     *
     * @type {{}}
     */
    resourceParams = {};

/**
 * Добавляет загружаемый ресурс в зависимости, чтобы использовать его в дальнейшем в плагине.
 */
stylComponentLoader.pitch = function () {
    if (this.cacheable) {
        this.cacheable();
    }
    this.addDependency(this.resourcePath);
    resourceParams[this.resourcePath] = loaderUtils.parseQuery(this.resourceQuery);

    // возвращаем не нулевые данные, чтобы проскачить выполнение лоудера и не загружать содержимое файла
    return '// remove by styl-component-loader';
};

/**
 * Подготавливает строку для лоудера с параметрами из аргумента функции
 *
 * @param {Object=} params
 * @return {string}
 */
stylComponentLoader.getLoaderString = function (params) {
    var query = Object.keys(params || {})
        .filter(Boolean)
        .reduce(function (prev, key) {
            prev.push(key + '=' + params[key]);
            return prev;
        }, [])
        .join('&');
    return __filename + (query !== '' ? '?' + query : '');
};

/**
 * Конструктор плагина, содержит ряд настроек плагина
 *
 * @param {Object} options
 * @constructor
 */
Plugin = function (options) {
    var opts = options || {},
        resStylusPath = opts.resStylusPath || null,
        tplPath = opts.tplPath || null,
        engine = opts.engine || null;

    invariant(!!resStylusPath && typeof resStylusPath === 'string',
        'new stylComponentLoader.Plugin(options): options.resStylusPath должен быть определён и являться строкой');
    invariant(!!tplPath && typeof tplPath === 'string',
        'new stylComponentLoader.Plugin(options): options.tplPath должен быть определён и являться строкой');
    invariant(!!engine && typeof engine === 'string',
        'new stylComponentLoader.Plugin(options): options.engine должен быть определён и являться строкой');
    invariant(consolidate[engine],
        'new stylComponentLoader.Plugin(): шаблонизатора %s нет в модуле consolidate', engine);

    this.resStylusPath = resStylusPath;
    this.tplPath = tplPath;
    this.engine = engine;
};

/**
 * Получает из шаблона stylus-код, который нужно нам подключить и сохраняет его в файл
 *
 * @param {Compiler} compiler
 */
Plugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin('emit', function (compilation, cb) {
        var tmpData = compilation.fileDependencies
            .filter(function (dep) {
                return /\.styl$/.test(dep);
            })
            .map(function (filePath) {
                return {
                    path: filePath,
                    params: resourceParams[filePath] || {}
                };
            });

        consolidate[self.engine](self.tplPath, { data: tmpData })
            .then(function (content) {
                writeFile(self.resStylusPath, content, cb);
            })
            .catch(function (err) {
                return cb(err);
            });
    });
};

stylComponentLoader.Plugin = Plugin;

module.exports = stylComponentLoader;
