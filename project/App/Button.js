'use strict';

const React = require('react');
const { PropTypes } = React;
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    TouchableOpacity,
} = ReactNative;

const DEFAULT_OPACITY = 0.8;

export default class HomeScreen extends React.Component {
    render () {
        const touchableProps = {
            activeOpacity: this.props.disable ? 1 : this.props.activeOpacity ? this.props.activeOpacity : DEFAULT_OPACITY,
        };
        if (!this.props.disable) {
            touchableProps.onPress = this.props.onPress;
        }
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]} {...touchableProps}
                testID={this.props.testID}>
                <Text style={[styles.text, this.props.disable ? styles.disableText : null, this.props.textStyle]}
                    numberOfLines={1}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'blue',
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    disableText: {
        color: '#dcdcdc',
    },
});
