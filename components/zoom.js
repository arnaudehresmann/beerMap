import React, { Component } from 'react';
import { View } from 'react-native';
import ClickableIcon from './clickableIcon'

export default class Zoom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerStyle, iconSize, iconColor, onZoomIn, onZoomOut, iconStyle} = this.props;
        return (
            <View style={ containerStyle }>
                <ClickableIcon
                    style={iconStyle}
                    iconName={'plus'}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    onPress={onZoomIn}>
                </ClickableIcon>
                <ClickableIcon
                    style={iconStyle}
                    iconName={'minus'}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    onPress={onZoomOut}>
                </ClickableIcon>
            </View>
        );
    }
}