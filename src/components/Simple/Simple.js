'use strict';

/**
 * Простой компонент React-а
 *
 * @module src/components/Simple/Simple
 * @type {Simple}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent, PropTypes} from '../../js/lib/BaseComponent.js';
import './Simple.styl';
import Icon from '../Icon/Icon.js';

export default class Simple extends BaseComponent {
    static propTypes = {
        prop1: PropTypes.bool
    }
    static defaultProps = {
        prop1: false
    }

    constructor(props) {
        super(props);

        this.state = {
            state1: !!this.props.prop1
        };
    }

    render() {
        let {
                prop1,
                ...other
                } = this.props,
            cssClass = this.makeCssClass([
                'simple',
                this.state.state1 ? 'simple_state1' : null
            ]);
        return (
            <div {...other} className={cssClass}>
                <div className="_spacer_half">
                    <span>Подключаемые ресурсы компонента</span>
                </div>
                <div className="grid">
                    <div className="grid__1of5">
                        <span className="_text_ghost">простые изображение:</span>
                        <div className="simple__image" />
                    </div>
                    <div className="grid__1of5">
                        <span className="_text_ghost">base64-изображение:</span>
                        <div className="simple__base64"></div>
                    </div>
                    <div className="grid__1of5">
                        <span className="_text_ghost">иконочный шрифт:</span>
                        <div className="simple__iconfont">
                            <Icon name="tube" center={true} /> youTube
                        </div>
                    </div>
                    <div className="grid__1of5">
                        <span className="_text_ghost">cпрайт - 'icons':</span>
                        <div className="simple__sprite">
                            <span className="simple__visa" />
                        </div>
                    </div>
                    <div className="grid__1of5">
                        <span className="_text_ghost">cпрайт - 'test_sprite':</span>
                        <div className="simple__sprite">
                            <span className="simple__vespa" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
