import React, { Component } from 'react';
import HomeScreen  from './screens/HomeScreen.js';
import {
  createStackNavigator,
} from 'react-navigation';
import Register from './screens/Register.js';
import Login from './screens/Login.js';

const MyRoutes = createStackNavigator({
  HomeRT: { screen: HomeScreen },
  RegisterRT: { screen: Register },
  LoginRT: { screen: Login },
  initialRouteName: HomeScreen
});

class App extends React.Component {

  render() {
    return (
        <MyRoutes />
    )
  }
};

export default App;
