// ProfileSetup2.js
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const ProfileSetup2 = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/img/logo.png')} style={styles.image} />
    </View>
  );
};

// const styles = StyleSheet so as to be able to use this code in your application:

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200, // Adjust width as necessary
    height: 200, // Adjust height as necessary
    resizeMode: 'contain', // This ensures the image scales correctly within the bounds
  }
});

export default ProfileSetup2;
