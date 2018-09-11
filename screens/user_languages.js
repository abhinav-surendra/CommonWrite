import React, { Component } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import firebase from 'react-native-firebase';


export default class UserLanguages extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().doc('profiles/' + props.uid);

        this.state = {
            loading: true,
            profile: null,
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onDocumentUpdate)

    }

    componentWillUnmount() {
        this.unsubscribe();

    }

    onDocumentUpdate = (querySnapshot) => {
        const doc = querySnapshot.data();
        if (doc != null) {
            this.setState({
                profile: doc,
                loading: false,
            });
        }
    }
    render() {
        if (this.state.profile != null) {
            return (
                <FlatList
                    data={this.state.profile.languages}
                    renderItem={({ item }) => <Button
                        color={item == this.state.profile.current_language ? "#FF8800" : "#00FFFF"}
                        title={item}
                        onPress={() => this.onPress(item)} />} />
            );
        } else {
            return (<Text>{this.props.uid}</Text>);
        }
    }

    onPress = (name) => {
        console.log(name);
        const profileRef = firebase.firestore().doc('profiles/' + this.props.uid);
        profileRef.get().then(function (p) {
            profileRef.update({ current_language: name });
        }
        )
    }

}