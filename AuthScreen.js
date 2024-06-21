// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Platform , Image} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { AuthErrorCodes } from 'firebase/auth';
// const windowWidth = Dimensions.get('window').width;
// import logo from './assets/img/logo.png';
// const AuthScreen = () => {
//     const navigation = useNavigation();
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [countryCode, setCountryCode] = useState('+91');

//     const handleContinue = () => {
//         // Placeholder for navigation or API call
//         // console.log('Continue with:', countryCode, phoneNumber);
//         navigation.navigate('Home');
//     };
//     const handleRegister = () => {
//         // Navigate to the OTP screen
//         navigation.navigate('Otp');
//     };
//     const handleValueChange= ((itemValue,itemIndex) => setCountryCode(itemValue))
//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
// <Image source={logo} style={styles.logo} />
//             <Text style={styles.header}>Welcome to NewBees</Text>
            
//             {/* Login Section */}
//             <View style={styles.section}>
//                 <Text style={styles.subtitle}>Log in to continue</Text>
//                 <View style={styles.inputGroup}>
//                     <Picker
//                         selectedValue={countryCode}
//                         style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerIOS}
//                         onValueChange={handleValueChange}
//                         mode="dropdown" // Android only
//                     >
//                         <Picker.Item label="+91" value="+91" />
//                         <Picker.Item label="+1" value="+1" />
//                         <Picker.Item label="+44" value="+44" />
//                         {/* Add other countries as needed */}
//                     </Picker>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter your phone number"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={handleContinue}>
//                     <Text style={styles.buttonText}>Continue</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Separator */}
//             <View style={styles.separator} />

//             {/* Register Section */}
//             <View style={styles.section}>
//                 {/* <Text style={styles.subtitle}>First Time User</Text> */}
//                 <Text style={styles.subtitle}>Lets Create Your Account</Text>
//                 {/* <View style={styles.inputGroup}>
//                     <Picker
//                         selectedValue={countryCode}
//                         style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerIOS}
//                         onValueChange={(itemValue, itemIndex) => setCountryCode(itemValue)}
//                         mode="dropdown" // Android only
//                     >
//                         <Picker.Item label="+91 India" value="+91" />
//                         <Picker.Item label="+1 USA" value="+1" />
//                         <Picker.Item label="+44 UK" value="+44" />
//                         {/* Add other countries as needed */}
//                     {/* </Picker>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter your phone number"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />
//                 </View> */}
//                 <TouchableOpacity style={styles.button} onPress={handleRegister}>
//                     <Text style={styles.buttonText}>Register</Text>
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.termsText}>
//                 By signing up or logging in, I agree to the Terms of Services and Privacy Policy, including usage of cookies.
//             </Text>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f4f4f4',
//         padding: 20
//     },
//     contentContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//     },
//     header: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center'
//     },
//     section: {
//         marginBottom: 20
//     },
//     subtitle: {
//         fontSize: 20,
//         fontWeight: '500',
//         marginBottom: 10,
//         textAlign: 'center'
//     },
//     inputGroup: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20
//     },
//     pickerAndroid: {
//         flex: 1,
//         height:44, // Adjust based on your design
//         maxWidth:108,
//         backgroundColor: '#fff',
//         overflow:'hidden'
//     },
//     pickerIOS: {
//         flex: 1,
//         height: 150, // iOS needs more height for the picker to display correctly
//         backgroundColor: '#fff'
//     },
//     input: {
//         flex: 1,
//         fontSize: 18,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         backgroundColor: '#fff',
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//         height:54
//     },
//     button: {
//         backgroundColor: '#007bff',
//         padding: 15,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18
//     },
//     termsText: {
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 20
//     },
//     switchModeButton: {
//         marginBottom: 20,
//     },
//     switchModeText: {
//         color: '#007bff',
//         fontSize: 16
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#ccc',
//         marginVertical: 20
//     },
//     logo: {
//         marginHorizontal:'auto',
//         width: 150, // Adjust size as needed
//         height: 150, // Adjust size as needed
//         // justifyContent:'center',
//         // alignItems:'center'
//         // marginLeft: 'auto'
//     },
// });

// export default AuthScreen;


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Platform, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import logo from './assets/img/logo.png';

const AuthScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');

    const handleContinue = async () => {
        try {
            // Try to sign in the user
            await Auth.signIn(countryCode + phoneNumber);
            // If successful, navigate to the OTP screen
            navigation.navigate('Otp', { phoneNumber: countryCode + phoneNumber });
        } catch (error) {
            if (error.code === 'UserNotFoundException') {
                Alert.alert('Error', 'Mobile number not registered. Please register first.');
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    const handleRegister = () => {
        navigation.navigate('Otp', { phoneNumber: countryCode + phoneNumber, isRegister: true });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Welcome to NewBees</Text>
            <View style={styles.section}>
                <Text style={styles.subtitle}>Log in to continue</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={countryCode}
                        style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerIOS}
                        onValueChange={(itemValue) => setCountryCode(itemValue)}
                        mode="dropdown"
                    >
                        <Picker.Item label="+91" value="+91" />
                        <Picker.Item label="+1" value="+1" />
                        <Picker.Item label="+44" value="+44" />
                    </Picker>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>
                <Text style={styles.subtitle}>First Time User</Text>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>
                By signing up or logging in, I agree to the Terms of Services and Privacy Policy, including usage of cookies.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // ... (styles remain the same)
});

export default AuthScreen;
