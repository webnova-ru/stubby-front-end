'use strict';

/**
 * Обработчик ошибок потоков
 *
 * @module gulp/lib/handleErrors
 * @type {Function}
 */

module.exports = function () {
    require('gulp-notify').onError({
        title: 'Ошибка',
        message: '<%= error.message %>'
    }).apply(this, [].slice.call(arguments));
    this.emit('end');
};
