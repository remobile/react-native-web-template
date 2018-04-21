import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from './Button';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: '首页',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Hello, Chat App!</Text>
                <Button style={styles.button} onPress={() => navigate('Chat', { user: '方运江' })} title="方运江" />
                <Button style={styles.button} onPress={() => navigate('Chat', { user: '方运江1' })} title="方运江1" />
            </View>
        );
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        const { user, isEdit } = state.params;
        return {
            title: user,
            headerRight: (
                <Button
                    title={isEdit ? '完成' : '编辑'}
                    onPress={() => setParams({ isEdit: !isEdit })}
                    />
            ),
        };
    };
    componentDidMount() {
        this._sub = this.props.navigation.addListener('didFocus', this.setFocus);
    }
    componentWillUnmount() {
        this._sub.remove();
    }
    setFocus = () => {
        console.log('home focused');
    };
    render() {
        const { state, setParams, navigate } = this.props.navigation;
        const { user, isEdit } = state.params;
        return (
            <View style={styles.container}>
                <Text>{user}的资料</Text>
                <Button
                    title={isEdit ? '完成' : '编辑'}
                    onPress={() => setParams({ isEdit: !isEdit })}
                    />
                <Button style={styles.button}  onPress={() => navigate('Name', { parentKey: state.key })} title="方运江2" />
            </View>
        );
    }
}


class NameScreen extends React.Component {
    static navigationOptions = {
        title: '名字',
    };
    render() {
        const { state, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>名字</Text>
                <Button style={styles.button} onPress={() => goBack(state.params.parentKey)} title="返回两层" />
            </View>
        );
    }
}


export default StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: ({navigation}) => ({
            // title: `${navigation.state.params.user}'s Profile`,
        }),
    },
    Name: {
        screen: NameScreen,
    }
}, {
    initialRouteName: 'Home',
    // initialRouteParams: { user: '方运江', isEdit: false},
    navigationOptions: {
        headerBackTitle: '返回',
    },
    headerTitleStyle: {
        color: 'red',
    },
});



const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    button: {
        margin:10,
    },
});
