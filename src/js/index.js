'use strict';

/**
 * Старт приложения
 *
 * @module src/js/index
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import App from '../components/App/App.js';

React.render(<App isOpenLeftMenu={true} appTitle="stubby front-end" />, document.getElementById('app'));
