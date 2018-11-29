import React, { Component } from 'react';
import HomeScreen  from './screens/HomeScreen';
import {
  createStackNavigator,
} from 'react-navigation';
import Register from './screens/Register';
import Login from './screens/Login';
import Quiz from './screens/Quiz';
import Finish from './screens/QuizFinish';

const MyRoutes = createStackNavigator({
  HomeRT: { screen: HomeScreen },
  RegisterRT: { screen: Register },
  LoginRT: { screen: Login },
  QuizRT: { screen: Quiz },
  FinishRT: { screen: Finish },

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
