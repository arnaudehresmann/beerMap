import React, { Component } from 'react';
import { View } from 'react-native';
import ClickableIcon from './clickableIcon'

export default class Zoom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerStyle, iconSize, iconColor, onZoomIn, onZoomOut} = this.props;
        return (
            <View style={ containerStyle }>
                <ClickableIcon
                    iconName={'plus'}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    onPress={onZoomIn}>
                </ClickableIcon>
                <ClickableIcon
                    iconName={'minus'}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    onPress={onZoomOut}>
                </ClickableIcon>
            </View>
        );
    }
}