import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {
  createStackNavigator,
} from 'react-navigation';
import {
  RkButton,
  RkTextInput,
  RkText,
  RkCard,
} from 'react-native-ui-kitten';

export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: ' ',
      password: ' ',
      passwordConfirm: ' '
    };
  };

  cancelRegister = () =>{
    Alert.alert('Registration cancelled');
    this.props.navigation.navigate('HomeRT')
  };

  displayWarning = () =>{
    Alert.alert(`${this.state.username} already exists`);
    this.props.navigation.navigate('HomeRT');
  };

  displaySuccessMessage = ()=>{
    Alert.alert(`${this.state.username} account created`);
    this.props.navigation.navigate('HomeRT');
  };

  validateAccount = ()=>{
  //Logic if account already exist
    AsyncStorage.getItem(this.state.username, (err, result) => {
      if (result!==null){
        this.displayWarning()
      }
  //Logic to create new account
      else{
        AsyncStorage.setItem(this.state.username,this.state.password, (err, result) => {
          this.displaySuccessMessage()
        })
      }
    })
  };

  registerAccount = ()=>{
  //Display message if username is empty
    if (!this.state.username ){
      Alert.alert('Please enter a username');
    }
  //Display message if password is wrong
    else if (this.state.password !== this.state.passwordConfirm){
      Alert.alert('Passsword do not match');
    }
    else {
      this.validateAccount()
    }
  };

  render() {
    return (
      <RkCard style={styles.container}>

      <RkText style={styles.heading}>
        Register Account
      </RkText>

      <RkTextInput
        onChangeText={(text) => this.setState({username: text})}
        value={this.state.username}
        rkType='content'
        style={styles.inputs}
      />

      <RkText style={styles.label}>Enter Username</RkText>

      <RkTextInput
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        rkType='content'
        secureTextEntry={true}
        style={styles.inputs}
      />
      <RkText style={styles.label}>Enter Password</RkText>

      <RkTextInput
        onChangeText={(text) => this.setState({passwordConfirm: text})}
        value={this.state.passwordConfirm}
        rkType='content'
        secureTextEntry={true}
        style={styles.inputs}
      />
      <RkText style={styles.label}>Confirm Password</RkText>

      <RkButton
        style={styles.buttons}
        rkType='rounded'
        onPress={this.registerAccount}>
        Register
      </RkButton>

      <RkButton
        style={styles.buttons}
        rkType='rounded'
        onPress={this.cancelRegister}>
        Cancel
      </RkButton>

    </RkCard>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '30%',
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
    marginTop: 15,
  },
  labels: {
    paddingBottom: 10
  }
});
