import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Header from '../sections/Header.js';
import App from '../App.js';
import Menu from '../sections/Menu.js';
import Hero from '../sections/Hero.js';
import {
  createStackNavigator,
} from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header navigate = { navigate } message = 'Press to Login' />
          <Hero />
          <Menu navigate = { navigate } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
