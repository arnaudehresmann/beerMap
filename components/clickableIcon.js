import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const styles = {
    touch: {
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
    }
}

export default class ClickableIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { iconName, iconSize, iconStyle, iconColor, onPress, touchStyle } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style = {[styles.touch, touchStyle]}>
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