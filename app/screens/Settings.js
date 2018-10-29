import React from 'react'
import { Button, Image, View, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
        }

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        const currentUser  = firebase.auth().currentUser;
        this.setState({ currentUser })
    }

    onPress(){
        if(this.state.currentUser != null){
            this.logout();
        } else {
            this.login();
        }
    }

    logout() {
        firebase.auth().signOut();
    }

    login() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
            <Image 
                style={styles.userImage}
                source={require('../assets/user.png')}></Image>
            <Button 
                style={styles.login} 
                color="#689F38"
                title={this.state.currentUser != null ? 'Log out' : 'Log in'}
                onPress={this.onPress}>
            </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingsView:{
      flex: 1,
    },
    userImage:{
        height: 250,
        width: 250,
        alignSelf: 'center',
        margin: 20,
    },
    login:{
        marginTop: 10,
    } 
});