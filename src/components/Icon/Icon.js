'use strict';

/**
 * Иконка
 *
 * @module src/js/components/Icon/Icon
 * @type {Icon}
 */

/**
 * Зависимости модуля
 */
import React from 'react';
import {BaseComponent, PropTypes} from '../../js/lib/BaseComponent.js';

export default class Icon extends BaseComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
        center: PropTypes.bool,
        color: PropTypes.string,
        hoverColor: PropTypes.string,
        onMouseOut: PropTypes.func,
        onMouseOver: PropTypes.func
    }

    static defaultProps = {
        center: false
    }

    _handleMouseOut(e) {
        this.setState({
            hovered: false
        });
        if (this.props.onMouseOut) {
            this.props.onMouseOut(e);
        }
    }

    _handleMouseOver(e) {
        this.setState({
            hovered: true
        });
        if (this.props.onMouseOver) {
            this.props.onMouseOver(e);
        }
    }

    constructor() {
        super(...arguments);

        this.state = {
            hovered: false
        };
    }

    render() {
        let {
            name,
            size,
            center,
            color,
            hoverColor,
            onMouseOut,
            onMouseOver,
            ...other
            } = this.props,
            cssClasses = this.makeCssClass([
                'icon',
                name ? 'icon_' + name : null,
                center ? 'icon_lg' : null,
                size ? 'icon_size_' + size + 'x' : null
            ]),
            defaultColor = color || null,
            defaultHoverColor = hoverColor || defaultColor,
            style = {
                color: this.state.hovered ? defaultHoverColor : defaultColor
            };
        return (
            <span
                {...other}
                className={cssClasses}
                style={style}
                onMouseOut={this._handleMouseOut.bind(this)}
                onMouseOver={this._handleMouseOver.bind(this)} />
        );
    }
}

