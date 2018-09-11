import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import Handwriting from './handwriting';
import Profile from './profile';
import Languages from './languages';


export default createBottomTabNavigator({
      Languages: { screen: Languages },
      Home: { screen: Handwriting },
      Profile: {screen: Profile},
    });


  //  Settings: {screen: props => <SettingsScreen {...props} userId="abhi" />},