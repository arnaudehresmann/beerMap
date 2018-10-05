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
        const { iconName, iconSize, iconStyle, iconColor, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style = {[styles.touch]}>
                <Icon
                    name={iconName}
                    size={iconSize}
                    style={[styles.icon, iconStyle]}
                    color={iconColor}
                />
            </TouchableOpacity>
        );
    }
}