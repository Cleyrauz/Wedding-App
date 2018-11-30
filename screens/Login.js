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
  Dimensions,
  Keyboard,
  TextInput,
  AsyncStorage,
} from 'react-native';
import {
  RkButton,
  RkTextInput,
  RkText,
  RkCard,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import { FontAwesome } from '../assets/icons';
import { GradientButton } from '../components/gradientButton';
import { scaleModerate, scaleVertical } from '../utils/scale';
import NavigationType from '../config/navigation/PropTypes';

class Login extends React.Component {
  static propTypes = {
  navigation: NavigationType.isRequired,
};
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  };

getThemeImageSource = (theme) => (
  theme.name === 'light' ?
    require('../assets/images/backgroundLoginV1.png') : require('../assets/images/backgroundLoginV1DarkTheme.png')
);

renderImage = () => {
  const screenSize = Dimensions.get('window');
  const imageSize = {
    width: screenSize.width,
    height: screenSize.height - scaleModerate(375, 1),
  };
  return (
      <Image
        style={[styles.image, imageSize]}
        source={this.getThemeImageSource(RkTheme.current)}
      />
    );
  };

  onLoginButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onSignUpButtonPressed = () => {
    Alert.alert('Login cancelled!');
    this.props.navigation.navigate('RegisterRT');
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
  if (this.state.loading) return <Text>Loading...</Text>;
    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
        style={styles.screen}
      >
        {this.renderImage()}
        <View style={styles.container}>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.twitter}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>
          <RkTextInput
            rkType='rounded'
            placeholder='Username'
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
          <RkTextInput
           rkType='rounded'
           placeholder='Password'
           secureTextEntry
           onChangeText={(text) => this.setState({password: text})}
           value={this.state.password}
         />
         <RkButton style={styles.button} rkType='large' onPress={this.loginUser}>
           <RkText>LOGIN</RkText>
         </RkButton>
         <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={this.onSignUpButtonPressed}>Sign up now</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
}));

export default Login;
