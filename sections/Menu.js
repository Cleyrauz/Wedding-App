import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class Menu extends React.Component {
  onPress = () => {
    Alert.alert('You clicked the button!');
  };

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonStyles} onPress={this.onPress}>
            <Text style={styles.buttonText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles} onPress={()=>this.props.navigate('RegisterRT')}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonStyles} onPress={()=>this.props.navigate('QuizRT')}>
            <Text style={styles.buttonText}>QUIZ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles} onPress={this.onPress}>
            <Text style={styles.buttonText}>BLOG</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonStyles} onPress={this.onPress}>
            <Text style={styles.buttonText}>GET READY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles} onPress={this.onPress}>
            <Text style={styles.buttonText}>ABOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  ;}
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#ffffff'
  },
  buttonRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#cc9900',
    borderBottomWidth: 1
  },
  buttonStyles: {
    backgroundColor: '#ffffff',
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#777777',
    fontSize: 18,
  }
});
