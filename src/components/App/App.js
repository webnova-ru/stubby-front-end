'use strict';

/**
 * Корневой компонент, в котором лежит весь сайт
 *
 * @module src/components/App/App
 * @type {App}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent, PropTypes} from '../../js/lib/BaseComponent.js';
import appConstants from '../../js/constants.js';
import './App.styl';
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import SlideMenu from '../SlideMenu/SlideMenu.js';

export default class App extends BaseComponent {
    static propTypes = {
        isOpenLeftMenu: PropTypes.bool,
        appTitle: PropTypes.string
    }
    static defaultProps = {
        isOpenLeftMenu: false,
        appTitle: 'stubby front-end'
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpenLeftMenu: !!this.props.isOpenLeftMenu,
            appTitle: this.props.appTitle
        };
    }

    onAction = (payload) => {
        switch (payload.action) {
            case appConstants.TRIGGER_LEFT_MENU:
                this._onTriggerLeftMenu(payload.value);
                break;
            default:
                __DEV__ && console.warn("Действие: '" + payload.action + "' не имеет обработчика");
        }
    }

    _onTriggerLeftMenu(value) {
        this.setState({
            isOpenLeftMenu: value.isOpen
        });
    }

    render() {
        let {
                ...other
                } = this.props,
            cssClass = this.makeCssClass([
                'app',
                this.state.isOpenLeftMenu && 'app_openLeftMenu'
            ]);
        return (
            <div {...other} className={cssClass}>
                <div className="app__content">
                    <Header title={this.state.appTitle}
                            menuBtnState={this.state.isOpenLeftMenu}
                            onAction={this.onAction} />
                    <Content />
                </div>
                <SlideMenu className="app__menu" />
            </div>
        );
    }
}
