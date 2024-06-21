import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const CustomSignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    nickname: '',
    gender: '',
    age: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const signUp = async () => {
    const { username, password, email, nickname, gender, age } = formData;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
            email,
          nickname,
          'custom:gender': gender,
          'custom:age': age
        }
      });
      setIsVerificationStep(true);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  const confirmSignUp = async () => {
    const { username } = formData;
    try {
      await Auth.confirmSignUp(username, verificationCode);
      navigation.navigate('ProfileSetup');
    } catch (error) {
      console.log('error confirming sign up:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!isVerificationStep ? (
        <>
          <TextInput
            placeholder="Username"
            onChangeText={(value) => handleChange('username', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(value) => handleChange('password', value)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="E Mail"
            onChangeText={(value) => handleChange('email', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nickname"
            onChangeText={(value) => handleChange('nickname', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Gender"
            onChangeText={(value) => handleChange('gender', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            onChangeText={(value) => handleChange('age', value)}
            style={styles.input}
          />
          <Button title="Sign Up" onPress={signUp} />
        </>
      ) : (
        <>
          <Text>Enter the verification code sent to your phone:</Text>
          <TextInput
            placeholder="Verification Code"
            onChangeText={setVerificationCode}
            style={styles.input}
          />
          <Button title="Confirm Sign Up" onPress={confirmSignUp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  }
});

export default CustomSignUp;
