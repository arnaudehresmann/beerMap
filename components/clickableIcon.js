import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

export default class ClickableIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { iconName, iconSize, iconStyle, iconColor, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}>
                <Icon
                    name={iconName}
                    size={iconSize}
                    style={iconStyle}
                    color={iconColor}
                />
            </TouchableOpacity>
        );
    }
}