import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';

import SketchCanvas from '@terrylinla/react-native-sketch-canvas';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import Login from './screens/login';
import Handwriting from './screens/handwriting';
import { UserContext } from './user_context';

export default class example extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: null,
      profile: null
    }
  }

  componentDidMount() {
    //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user });
        // var profile;
        // firebase.firestore().doc('profiles/' + user.uid).get().then(function (p) {
        //   profile = p.data();
        //   console.log(profile);
        //   this.setState({ user, profile });
        // }.bind(this));
      }
    });
  }

  componentWillUnmount() {
    //this.unsubscribe();
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }




  render() {
    if (!this.state.user) {
      return <Login />;
    }
    return (
      <UserContext.Provider value={this.state}>
        <Handwriting />
      </UserContext.Provider>
    );

  }
}
