'use strict';

/**
 * Базовый компонент от которого наследуются все другие компоненты интерфейса
 *
 * @module src/js/lib/BaseComponent
 * @type {BaseComponent}
 */

/**
 * Зависимости модуля
 */
import {Component, PropTypes as _PropTypes} from 'react';
import makeClassString from '../../js/lib/makeCssClass.js';

export const PropTypes = _PropTypes;

export class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    makeCssClass(...cssClasses) {
        return makeClassString([this.props.className || null].concat(cssClasses), '').trim();
    }
}
