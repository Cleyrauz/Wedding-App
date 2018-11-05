import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

export default class Hero extends React.Component {
  render() {
    return (
      <Image
        style={styles.heroImage}
        source={ require ('../assets/images/image-app.jpg')}
      />
    )
  }
}

const styles = StyleSheet.create({
  heroImage: {
    width: undefined,
    height: undefined,
    flex: 8,
  },
});
