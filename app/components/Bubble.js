import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: "white",
    paddingLeft: 30,
  }
});

class Bubble extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
  };

  render() {
    let innerChildView = this.props.children;

    if (this.props.onPress) {
      innerChildView = (
        <TouchableOpacity onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {innerChildView}
      </View>
    );
  }
}

export default Bubble;