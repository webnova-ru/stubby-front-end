'use strict';

/**
 * Плагины для stylus-а
 *
 * @module gulp/lib/stylusPlugin
 * @type {{}}
 */

/**
 * Зависимости модуля
 */
var path = require('path'),
    spritesConfig = require('../config/sprites'),
    dir = require('./dir');

var commonSpriteDir = dir.cwd.src.to(spritesConfig.pathStringId);

/**
 * Возвращает директорию до папки со спрайтами
 */
exports.getSpriteDir = function () {
    var currStylFile = this.renderer.nodes.filename;
    return (currStylFile.indexOf(dir.components()) !== -1 ?
        dir(path.dirname(currStylFile), spritesConfig.pathStringId) :
        commonSpriteDir);

};
