'use strict';

/**
 * Шапка приложения
 *
 * @module src/components/Header/Header
 * @type {Header}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent, PropTypes} from '../../js/lib/BaseComponent.js';
import appConstants from '../../js/constants.js';
import './Header.styl';
import Icon from '../Icon/Icon.js';

export default class Header extends BaseComponent {
    static propTypes = {
        menuBtnState: PropTypes.bool,
        title: PropTypes.string,
        onAction: PropTypes.func
    }

    constructor() {
        super(...arguments);
    }

    _onClickMenuBtnHandle(e) {
        let payload = {
            action: appConstants.TRIGGER_LEFT_MENU,
            value: { isOpen: !this.props.menuBtnState }
        };
        e.stopPropagation();
        this.props.onAction(payload);
    }

    render() {
        return (
            <header className="header">
                <div className="grid">
                    <div className="grid__1of3">
                        <a className="header__menu-link" href="#" onClick={this._onClickMenuBtnHandle.bind(this)}>
                            <Icon name="menu" />
                        </a>
                    </div>
                    <div className="grid__1of3 _text_center _padding_half-t">
                        <strong className="_text_uppercase">{this.props.title}</strong>
                    </div>
                    <div className="grid__1of3">
                    </div>
                </div>
            </header>
        );
    }
}
