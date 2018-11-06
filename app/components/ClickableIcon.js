import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View } from 'react-native';
import CommonStyles from './../styles/Common';

const styles = {
    touch: {
        backgroundColor: CommonStyles.defaultBackgroundColor,
        borderRadius: 30,
        alignItems: 'center',
    },
    icon:{
        margin: 10,
    }
}

export default class ClickableIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, size, style, color, onPress, touchStyle } = this.props;
        return (
            <TouchableOpacity
                onPress={() => onPress()}
                onPressIn={this.props.onPressIn}
                onPressOut={this.props.onPressOut}
                style = {[styles.touch, touchStyle]}
                >
                <View>
                    <Icon
                        name={name}
                        size={size}
                        style={[style, styles.icon]}
                        color={color}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}