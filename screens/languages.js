import React, { Component } from 'react';
import { Button, Text, View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { UserContext } from '../user_context';
import UserLanguages from './user_languages';

export default class Languages extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('languages');

    this.state = {
      loading: true,
      languages: [],
      user: null,
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

  }

  componentWillUnmount() {
    this.unsubscribe();

  }

  onCollectionUpdate = (querySnapshot) => {
    const languages = [];

    querySnapshot.forEach((doc) => {
      const { english_name, name } = doc.data();

      languages.push({
        key: doc.id,
        doc, // DocumentSnapshot
        english_name,
        name,
      });
    });

    this.setState({
      languages,
      loading: false,
    });
  }
  render() {
    return (
      <UserContext.Consumer>
        {userContext =>
          <View>
            <UserLanguages uid={userContext.user.uid} />
            <FlatList
              data={this.state.languages}
              renderItem={({ item }) =>
                <Button
                  title={item.english_name}
                  onPress={() => this.onPress(item.key, userContext.user.uid)} />} />
          </View>
        }
      </UserContext.Consumer>
    );
  }

  onPress = (name, uid) => {
    console.log(name);
    const profileRef = firebase.firestore().doc('profiles/' + uid);
    profileRef.get().then(function (p) {
      const profile = p.data();
      if(!profile.languages.includes(name)) {
        profile.languages.push(name);
        profileRef.update({ languages: profile.languages });
      }

    });
  }
}