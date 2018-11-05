import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput,
  AsyncStorage,
} from 'react-native';
import {
  RkButton,
  RkTextInput,
  RkText,
  RkCard,
} from 'react-native-ui-kitten';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: ' ',
      password: ' '
    };
  };

  cancelLogin = ()=>{
    Alert.alert('Login cancelled!');
    this.props.navigation.navigate('HomeRT');
  };

  displayMessage = ()=>{
    Alert.alert('Someone already logged on');
    this.props.navigation.navigate('HomeRT');
  };

  displayWarning = ()=>{
    Alert.alert('Password incorrect');
  };

  loginAndNavigateHome = ()=>{
    Alert.alert(`${this.state.username} Logged in`);
    this.props.navigation.navigate('HomeRT');
  };

  userDoesNotExist = ()=>{
    Alert.alert(`No account for ${this.state.username}`);
  };

  validateUser = ()=>{
    //Logic if someone is Loggin on
    AsyncStorage.getItem('userLoggedIn', (err, result) =>{
      if (result!=='none') {
        this.displayMessage()
      }
      //Check is password is correct
      else {
        AsyncStorage.getItem(this.state.username, (err, result) => {
          if ( result !==null ) {
            if (result !==this.state.password) {
              this.displayWarning()
            }
            //Login User
            else {
              AsyncStorage.setItem('userLoggedIn',this.state.username, (err, result) => {
                this.loginAndNavigateHome()
              });
            }
          }
          //Response if the user does not exist
          else  {
            this.userDoesNotExist()
          }
        })
      }
    })
  }

  loginUser = ()=>{
    //Display message if the userme or password fields are empty
    if ( !this.state.username ) {
      Alert.alert('Please enter a username')
    }
    else if ( !this.state.password ) {
      Alert.alert('Please enter a password')
    }
    else {
      this.validateUser()
    }
  }

  render() {
    return (
      <RkCard style={styles.container}>
        <RkText style={styles.heading}>Login</RkText>

        <RkTextInput
          style={styles.inputs}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <RkText style={styles.label}>Enter Username</RkText>

        <RkTextInput
          style={styles.inputs}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
        />
        <RkText style={styles.label}>Enter Password</RkText>

          <RkButton style = {styles.buttons} rkType='rounded' onPress={this.loginUser}>
            Login
          </RkButton>

        <RkButton style = {styles.buttons} rkType='rounded' onPress={this.cancelLogin}>
          Cancel
        </RkButton>

      </RkCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '45%',
    paddingTop: '20%'
  },
  heading: {
    fontSize: 18,
    flex: 1
  },
  inputs: {
    flex: 1,
    width: '80%',
    padding: 10
  },
  buttons: {
    marginTop: 15
  },
  labels: {
    paddingBottom: 10
  }
});
