// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthScreen from './AuthScreen';
// import Otp from './Otp';
// import HomeScreen from './HomeScreen';
// import { NavigationContainer } from '@react-navigation/native';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     // <View style={styles.container}>
//     //   <NavigationContainer>

//     //   <AuthScreen/>
//     //   </NavigationContainer>
//     //   {/* <Text>close up App.js to start working on your app!</Text> */}

//     // </View>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Auth" component={AuthScreen} options={{
//             headerShown: false,
//             gestureEnabled: false, // Disable swipe gestures
//           }} />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             headerShown: false,
//             gestureEnabled: false, // Disable swipe gestures
//           }}
//         />
//         <Stack.Screen name="Otp" component={Otp} options={{ title: 'OTP Verification' }} />
//         <Stack.Screen name="Quiz-Level 1" component={Level1} options={{ title: 'Quiz-Level 1' }} />
//         <Stack.Screen name="Quiz-Level 2" component={Level2} options={{ title: 'Quiz-Level 2' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#808080',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Amplify } from 'aws-amplify';
// import awsconfig from './src/aws-exports';
// import AuthScreen from './AuthScreen';
// import OtpScreen from './Otp';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Amplify.configure(awsconfig);

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'OTP Verification' }} />
//         {/* Add more screens as needed */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View , Image} from 'react-native';
// import { Amplify } from 'aws-amplify';
// import awsExports from './src/aws-exports';
// Amplify.configure(awsExports);
// import { withAuthenticator } from '@aws-amplify/ui-react-native';
// // import Home from './screens/Home';
// import HomeScreen from './HomeScreen';
// // import Level1 from './Level1';
// // import Level2 from './Level2';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// // const Stack = createStackNavigator();

// function App() {
//   return (
//     // <NavigationContainer>

//     <View style={styles.container}>
//    <HomeScreen/>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// export default withAuthenticator(App);


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Amplify } from 'aws-amplify';
// import awsExports from './src/aws-exports';
// Amplify.configure(awsExports);
// import { withAuthenticator } from '@aws-amplify/ui-react-native';
// import HomeScreen from './HomeScreen';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// function App() {
//   return (
    
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} options={{
//             headerShown: false,
//             gestureEnabled: false, // Disable swipe gestures
//           }}/>
//         <Stack.Screen name="Quiz-Level 1" component={Level1} />
//         <Stack.Screen name="Quiz-Level 2" component={Level2} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default withAuthenticator(App);

// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Amplify } from 'aws-amplify';
// import awsExports from './src/aws-exports';
// Amplify.configure(awsExports);
// import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react-native';
// import ProfileSetup from './ProfileSetup';
// import HomeScreen from './HomeScreen';
// import Level1 from './Level1';
// import Level2 from './Level2';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// function App() {
//   return (
    
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="ProfileSetup">
//       <Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{
//             headerShown: false,
//             gestureEnabled: false, // Disable swipe gestures
//           }}/>
//         <Stack.Screen name="Home" component={HomeScreen} options={{
//             headerShown: false,
//             gestureEnabled: false, // Disable swipe gestures
//           }}/>
        
//         <Stack.Screen name="Quiz-Level 1" component={Level1} />
//         <Stack.Screen name="Quiz-Level 2" component={Level2} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default withAuthenticator(App);


import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileSetup from './ProfileSetup';
import ProfileSetup2 from './ProfileSetup2';
import HomeScreen from './HomeScreen';
import Level1 from './Level1';
import Level2 from './Level2';
import { ScrollView } from 'react-native-gesture-handler';

Amplify.configure(awsExports);

const Stack = createStackNavigator();

function App() {
  const [userHasProfile, setUserHasProfile] = useState(null);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const profileSetupComplete = user.attributes['custom:profileSetupComplete'];
      setUserHasProfile(profileSetupComplete === 'true');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (userHasProfile === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userHasProfile ? "Home" : "ProfileSetup"}>
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileSetup2" component={ProfileSetup2} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Quiz-Level 1" component={Level1} />
        <Stack.Screen name="Quiz-Level 2" component={Level2} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <HomeScreen/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(App, { includeGreetings: true });

// export default App;
