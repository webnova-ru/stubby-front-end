'use strict';

/**
 * Основной файл конфигурации gulp-a
 *
 * @module gulp/config
 * @type {Object}
 */

module.exports = {
    // все пути относительно корня проекта
    dir: {
        gulpTasks: './gulp/tasks',    // путь до папки с тасками gulp-а
        src: './src',                 // путь ко всем исходникам
        scaffolding: './scaffolding', // путь к шаблонам для скафолдинга
        components: './src/components', // компоненты react-а

        temp: './_temp',      // путь к временным файлам
        dest: './_dest',      // путь к результатам сборки проекта
        release: './_release' // путь к результатам сборки готовым для продакшена
    },

    // имена временных файлов
    tempFileNames: {
        componentStylus: 'reactComponents.styl',
        iconfont: 'iconfont.styl'
    },

    livereload: true, // Влючает автоматическое обновление страницы
    staticServerPort: 9000, // порт по которому работает локальный сервер
    appWithHTML5HistoryApi: true // все пути в url направляет на index.html
};
