import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      loggedUser: false
    };
  }

  toggleUser = () => {
    if (this.state.isLoggedIn) {
      AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
        this.setState({
          isLoggedIn: false,
          loggedUser: false
        });
          Alert.alert('user logged out');
      })
    }
    else {
      this.props.navigate('LoginRT')
    }
  };

  componentDidMount(){
    AsyncStorage.getItem('userLoggedIn', (err, result) => {
      if ( result==='none' ){
        console.log('NONE');
      }
      else if (result === null){
        AsyncStorage.setItem('userLoggedIn', 'none' , (err, result) => {
          console.log('Set user to NONE');
        })
      }
      else {
        this.setState({
          isLoggedIn: true,
          loggedUser: result
        });
      }
    })
  }

  render() {
    const display = this.state.isLoggedIn ? this.state.loggedUser : this.props.message;
    return (
      <View style={styles.headStyle}>
        <Image
          style={styles.logoStyle}
          source={ require('../assets/images/rings.png')}
        />
        <Text
          style={styles.headText}
          onPress={this.toggleUser}>{display}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 20,
    flex: 1
  },
  headStyle: {
    paddingTop: 70,
    paddingBottom: 45,
    paddingRight: 40,
    backgroundColor: '#6e8264',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000000'
  },
  logoStyle: {
    width: 150,
    height: 85,
  }
});
