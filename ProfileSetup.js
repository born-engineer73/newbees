// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { Auth } from 'aws-amplify';

// const ProfileSetup = ({ navigation }) => {
//   const [profileData, setProfileData] = useState({
//     nickname: '',
//     gender: '',
//     age: ''
//   });

//   const handleChange = (key, value) => {
//     setProfileData({
//       ...profileData,
//       [key]: value
//     });
//   };

//   const saveProfile = async () => {
//     const { nickname, gender, age } = profileData;
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       const result = await Auth.updateUserAttributes(user, {
//         'nickname': nickname,
//         'gender': gender,
//         'custom:age': age
//       });
//       Alert.alert('Profile Updated', 'Your profile was successfully updated.');
//       navigation.navigate('Home');  // Assuming 'Home' is a valid route
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to update profile.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Nickname"
//         value={profileData.nickname}
//         onChangeText={(value) => handleChange('nickname', value)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Gender"
//         value={profileData.gender}
//         onChangeText={(value) => handleChange('gender', value)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Age"
//         value={profileData.age}
//         onChangeText={(value) => handleChange('age', value)}
//         style={styles.input}
//       />
//       <Button title="Save Profile" onPress={saveProfile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20
//   },
//   input: {
//     marginVertical: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5
//   }
// });

// export default ProfileSetup;


// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { Auth } from 'aws-amplify';

// const ProfileSetup = ({ navigation }) => {
//   const [profileData, setProfileData] = useState({
//     nickname: '',
//     gender: '',
//     age: ''
//   });

//   const handleChange = (key, value) => {
//     setProfileData({
//       ...profileData,
//       [key]: value
//     });
//   };

//   const saveProfile = async () => {
//     const { nickname, gender, age } = profileData;
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       await Auth.updateUserAttributes(user, {
//         nickname,
//         gender: gender,
//         'custom:age': age,
//         'custom:profileSetupComplete': 'true'
//       });
//       Alert.alert('Profile Updated', 'Your profile was successfully updated.');
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to update profile.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Nickname"
//         value={profileData.nickname}
//         onChangeText={(value) => handleChange('nickname', value)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Gender"
//         value={profileData.gender}
//         onChangeText={(value) => handleChange('gender', value)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Age"
//         value={profileData.age}
//         onChangeText={(value) => handleChange('age', value)}
//         style={styles.input}
//       />
//       <Button title="Save Profile" onPress={saveProfile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20
//   },
//   input: {
//     marginVertical: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5
//   }
// });

// export default ProfileSetup;


import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import logo from './assets/img/logo.png';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const navigation = useNavigation();

  const saveProfile = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        'nickname': name, // Assuming 'nickname' is used for the name
        'custom:age': age,
        'custom:heightFt': heightFeet, // Storing height in feet
        'custom:heightIn': heightInches, // Storing height in inches
        'custom:profileSetupComplete': 'true'
      });
      Alert.alert('Profile Updated', 'Your profile was successfully updated.');
      navigation.navigate('Home'); // Navigate to the next profile setup step
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>We are happy that you have taken the first step towards a Newbees. Let's start the Newbees journey</Text>
      <Text style={styles.subtitle}>What should we call you besides 'Hey you' ?</Text>
      <TextInput
        placeholder="Your NickName"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.subtitle}>How many trips around the sun have you enjoyed ?</Text>
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={[styles.input, styles.ageInput]}
        />
        <Text style={styles.unitText}>Years</Text>
      </View>
      <Text style={styles.subtitle}>How high do you reach ?</Text>
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Feet"
          value={heightFeet}
          onChangeText={setHeightFeet}
          keyboardType="numeric"
          style={[styles.input, styles.heightInput]}
        />
        <TextInput
          placeholder="Inches"
          value={heightInches}
          onChangeText={setHeightInches}
          keyboardType="numeric"
          style={[styles.input, styles.heightInput]}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
      <Text style={styles.termsText}>
      You can always change it from settings if you are not sure about your height
          </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignContent:'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5,
    marginHorizontal:20,
    marginBottom:30,
    borderRadius: 5,
    fontSize: 16
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: "center",
    // alignItems: 'center',
    marginBottom: 10
  },
  ageInput: {
    width: '20%'
  },
  heightInput: {
    width: '35%',
  },
  unitText: {
    fontSize: 20,
    // justifyContent:'center'
    marginTop:18
  },
  button: {
    backgroundColor: "#6200EE", // Background color for the button
    padding: 10, // Padding inside the button
    borderRadius: 25, // Rounded corners
    alignItems: "center", // Center the text inside the button
    justifyContent: 'center', // Center content vertically within the button
    height: 50, // Set the height
    // width: '100%', // Set the width to fill the container
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android,
    marginHorizontal:30,
        },
        buttonText: {
          color: "#fff", // Text color
          fontSize: 16, // Font size
          fontWeight: 'bold', // Font weight
        },
        logo: {
                  marginHorizontal:'auto',
                  width: 150, // Adjust size as needed
                  height: 150, // Adjust size as needed
                  // justifyContent:'center',
                  // alignItems:'center'
                  // marginLeft: 'auto'
              },
              termsText: {
                        fontSize: 14,
                        color: '#666',
                        textAlign: 'center',
                        marginVertical: 20
                    },
});

export default ProfileSetup;
