import React from 'react'
import { SectionList, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    renderUser() {
        const user = this.state.currentUser;

        const email = user != null ? user.email : 'Not logged in';
        return(
            <Text>{this.state.currentUser != null ? this.state.currentUser.email : 'Not logged in'}</Text>
        )

    }
    render() {
        return (
        <View>
            {this.renderUser()}
        </View>);
    }
}