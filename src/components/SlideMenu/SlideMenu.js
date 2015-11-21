'use strict';

/**
 * Меню быстрого доступа из левого края экрана
 *
 * @module src/js/components/SlideMenu/SlideMenu
 * @type {SlideMenu}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent} from '../../js/lib/BaseComponent.js';
import './SlideMenu.styl';

export default class SlideMenu extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {
                ...other
            } = this.props,
            cssClass = this.makeCssClass(['slide-menu']);
        return (
            <div {...other} className={cssClass}>
                <div className="slide-menu__header">Быстрый доступ</div>
                <div className="slide-menu__block">
                    <span className="slide-menu__title">Основное меню</span>
                    <ul className="slide-menu__list">
                        <li className="slide-menu__item">
                            <a href="#" className="slide-menu__link slide-menu__link_state_active">Главная</a>
                        </li>
                        <li className="slide-menu__item">
                            <a href="#" className="slide-menu__link">Пункт 1</a>
                        </li>
                        <li className="slide-menu__item">
                            <a href="#" className="slide-menu__link">Пункт 2</a>
                        </li>
                    </ul>
                </div>
                <div className="slide-menu__block">
                    <span className="slide-menu__title">Дополнительное меню</span>
                    <ul className="slide-menu__list">
                        <li className="slide-menu__item">
                            <a href="#" className="slide-menu__link">Пункт 1</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
