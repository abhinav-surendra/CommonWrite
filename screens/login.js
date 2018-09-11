import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
} from 'react-native';


export const googleLogin = async () => {
    try {
        // Add any configuration settings here:
        await GoogleSignin.configure();

        const data = await GoogleSignin.signIn();

        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
        console.error(e);
    }
}

export default class Login extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>

            <GoogleSigninButton
    style={{ width: 312, height: 48, alignSelf: 'center',  }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}/>
                </View>

        )
    }

    _signIn = async() => {
        try {
            // Add any configuration settings here:
            console.info('1');
            await GoogleSignin.configure();
            console.info('2');

            const data = await GoogleSignin.signIn();
            console.info('3');

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            console.info('4');
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    
            console.info(JSON.stringify(currentUser.user.toJSON()));
        } catch (e) {
            console.error(e);
        }
    
    }
}