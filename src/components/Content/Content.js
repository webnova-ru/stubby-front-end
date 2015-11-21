'use strict';

/**
 * Контейнер основной части приложения
 *
 * @module src/components/Content/Content
 * @type {Content}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent} from '../../js/lib/BaseComponent.js';
import './Content.styl';
import Simple from '../Simple/Simple.js';

export default class Content extends BaseComponent {
    constructor() {
        super(...arguments);
    }

    render() {
        let {
                ...other
                } = this.props,
            cssClass = this.makeCssClass('content');
        return (
            <div {...other} className={cssClass}>
                <h1>Stubby front-end</h1>
                <p>
                    <code>stubby-front-end</code> - готовый минимальный набор кода
                    необходимый для быстрого и легкого старта разработки front-end-а
                    на стеке технологий: gulp, webpack, babel, reactjs, stylus, mocha.
                    Всю дополнительную информацию вы можете найти на странице
                    <a href="https://github.com/webnova-ru/stubby-front-end">github-а</a>.
                </p>
                <hr />
                <h3>Пример простого компонента интерфейса</h3>
                <Simple />
            </div>
        );
    }
}
