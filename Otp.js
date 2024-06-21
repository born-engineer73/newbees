// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet,ScrollView, Alert, Platform , Image } from 'react-native';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import firebase from 'firebase/compat/app';
// import { firebaseConfig } from './config'; // Ensure your Firebase config is correctly imported
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import logo from './assets/img/logo.png';

// const Otp = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [countryCode, setCountryCode] = useState('+91');
//     const [code, setCode] = useState('');
//     const [verificationId, setVerificationId] = useState(null);
//     const [otpSent, setOtpSent] = useState(false);
//     const recaptchaVerifier = useRef(null);
//     const navigation = useNavigation();
//     const sendVerification = () => {
//         const phoneProvider = new firebase.auth.PhoneAuthProvider();
//         phoneProvider.verifyPhoneNumber(countryCode+phoneNumber, recaptchaVerifier.current)
//             .then(setVerificationId)
//             .catch(error => alert(error.message));
//         // setPhoneNumber('');
//         setCountryCode('');
//         setOtpSent(true); // Show the OTP input fields
//     };

//     const confirmCode = () => {
//         const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
//         firebase.auth().signInWithCredential(credential)
//             .then(() => {
//                 setCode('');
//                 Alert.alert('Login Successfully. Welcome to Newbees');
//                 navigation.navigate('Home');
//             })
//             .catch(error => {
//                 if (error.code === 'auth/invalid-verification-code') {
//                     Alert.alert('Invalid OTP', 'The OTP entered is wrong, please enter again.'); // Show alert for incorrect OTP
//                 } else {
//                     alert(error.message); // Handle other types of errors
//                 }
//                 setCode(''); // Optionally clear the code input field for re-entry
//             });
//     };

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//             <FirebaseRecaptchaVerifierModal
//                 ref={recaptchaVerifier}
//                 firebaseConfig={firebaseConfig}
//             />
//             <Image source={logo} style={styles.logo} />
//             <Text style={styles.otpText}>Register using OTP</Text>
//             <View style={styles.inputGroup}>
//                     <Picker
//                         selectedValue={countryCode}
//                         style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerIOS}
//                         onValueChange={(itemValue) => setCountryCode(itemValue)}
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
//             {/* <TextInput
//                 placeholder='Phone Number with Country Code'
//                 onChangeText={setPhoneNumber}
//                 keyboardType='phone-pad'
//                 autoCompleteType='tel'
//                 style={styles.TextInput}
//             /> */}
//             <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
//                 <Text style={styles.buttonText}>Send Verification</Text>
//             </TouchableOpacity>

//             {otpSent && (
//                 <>
//                     <TextInput
//                         placeholder='Enter OTP'
//                         onChangeText={setCode}
//                         keyboardType='number-pad'
//                         style={styles.TextInput}
//                     />
//                     <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
//                         <Text style={styles.buttonText}>Confirm Verification</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.resendText}>Didn't Receive the OTP?</Text>
//                     <TouchableOpacity style={styles.resendButton} onPress={sendVerification}>
//                         <Text style={styles.buttonText}>Resend OTP</Text>
//                     </TouchableOpacity>
//                 </>
//             )}
//             <Text style={styles.termsText}>
//                 By signing up or logging in, I agree to the Terms of Services and Privacy Policy, including usage of cookies.
//             </Text>
//         </ScrollView>
//     );
// };

// export default Otp;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f4f4f4',
//         padding: 20
//     },
//     contentContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems:'center'
//     },
//     TextInput: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         fontSize: 24,
//         borderBottomColor: '#fff',
//         borderBottomWidth: 2,
//         marginBottom: 20,
//         textAlign: 'center',
//         // color: '#',
//         width: '80%'
//     },
//     sendVerification: {
//         padding: 15,
//         backgroundColor: '#3498db',
//         borderRadius: 10,
//         marginBottom: 20
//     },
//     sendCode: {
//         padding: 15,
//         backgroundColor: '#9b59b6',
//         borderRadius: 10,
//         marginBottom: 20
//     },
//     resendButton: {
//         padding: 15,
//         backgroundColor: '#e74c3c',
//         borderRadius: 10
//     },
//     resendText:{
//         marginBottom:10,
//         marginTop:30,
//     },
//     buttonText: {
//         textAlign: 'center',
//         color: '#fff',
//         fontWeight: 'bold'
//     },
//     otpText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         // color: '#fff',
//         marginBottom: 40,

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
//     logo: {
//         marginHorizontal:'auto',
//         width: 150, // Adjust size as needed
//         height: 150, // Adjust size as needed
//         // justifyContent:'center',
//         // alignItems:'center'
//         // marginLeft: 'auto'
//     },
//     termsText: {
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 20
//     },
// });

// Otp.js
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, Platform, Image } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from './config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from './assets/img/logo.png';
import { Auth } from 'aws-amplify';

const Otp = () => {
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { phoneNumber, isRegister } = route.params;

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId)
            .catch(error => alert(error.message));
    };

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
            await firebase.auth().signInWithCredential(credential);
            if (isRegister) {
                // Register the user in Cognito
                await Auth.signUp({
                    username: phoneNumber,
                    password: 'TempPass#123', // Temporary password, user will reset
                    attributes: {
                        phone_number: phoneNumber,
                    },
                });
                navigation.navigate('Auth'); // Navigate back to Auth screen
            } else {
                Alert.alert('Login Successfully. Welcome to Newbees');
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            <Image source={logo} style={styles.logo} />
            <Text style={styles.otpText}>{isRegister ? 'Register using OTP' : 'Login using OTP'}</Text>
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
            <TextInput
                placeholder='Enter OTP'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.TextInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style={styles.buttonText}>Confirm Verification</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>
                By signing up or logging in, I agree to the Terms of Services and Privacy Policy, including usage of cookies.
            </Text>
        </ScrollView>
    );
};

export default Otp;

const styles = StyleSheet.create({
    // ... (styles remain the same)
});
