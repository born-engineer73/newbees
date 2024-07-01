import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import logo from './assets/img/logo.png';
import profile from './assets/img/profile.png';
import home from './assets/img/home.png';
import plan from './assets/img/plan.jpg';
import more from './assets/img/more.png';
import { Auth } from 'aws-amplify';

const HomeScreen = ({ navigation }) => {
    const [userAttributes, setUserAttributes] = useState({
        nickname: '',
        phoneNumber: '',
        level: '1', // Initialize level with a default value
    });
    const [goals, setGoals] = useState('');

    const fetchUserDetails = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const { attributes } = user;
            setUserAttributes({
                nickname: attributes.nickname || '',
                phoneNumber: attributes.phone_number || '',
                level: attributes['custom:level'] || '1', // Fetch level from user attributes
            });
        } catch (error) {
            console.log('error fetching user details: ', error);
            Alert.alert('Error', 'Unable to fetch user details');
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleQuizStart = () => {
        Alert.alert(
            "Resume Quiz",
            "Would you like to resume the quiz from where you left off or start from the beginning?",
            [
                {
                    text: "Resume",
                    onPress: () => navigation.navigate(`Quiz-Level ${userAttributes.level}`, { resume: true }),
                },
                {
                    text: "Start Over",
                    onPress: () => navigation.navigate('Quiz-Level 1', { resume: false }),
                },
            ]
        );
    };

    const signOut = async () => {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBar}>
                <Image source={profile} style={styles.profilePic} />
                <View style={styles.header}>
                    <Text style={styles.headerText}>{userAttributes.nickname}</Text>
                    <Text style={styles.headerText}>{userAttributes.phoneNumber}</Text>
                </View>
                <Pressable style={styles.button} onPress={() => signOut()}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('HealthScan')}>
                    <Text>Health Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('DietPlan')}>
                    <Text>Diet Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={handleQuizStart}>
                    <Text>Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ConnectDr')}>
                    <Text>Connect to Dr.</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.planHeader}>My Plan</Text>
            <TextInput
                style={styles.planContainer}
                onChangeText={setGoals}
                value={goals}
                placeholder="Write your daily goals here"
            />
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={home} style={styles.icon} />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={plan} style={styles.icon} />
                    <Text>Plans</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={more} style={styles.icon} />
                    <Text>More</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    profilePic: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        borderRadius: 25, // Adjust for rounded edges
        marginRight: 5
    },
    logo: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        marginLeft: 'auto'
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // marginBottom: 20
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    menuContainer: {
        marginVertical: 70,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }, 
    topBar: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    menuButton: {
        width: '45%',
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        elevation: 10,
        paddingTop: 55,
        paddingBottom: 55,
        // margin: 7,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    planHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    planContainer: {
        marginTop: 10,
        height: 100,
        backgroundColor: '#e0e0e0', // Light gray background
        paddingHorizontal: 10, // Horizontal padding
        paddingVertical: 10, // Vertical padding
        fontSize: 16, // Text size within the input
        color: '#333', // Text color
        borderRadius: 5, // Rounded corners
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        // position: 'absolute',
        // bottom:0,
        backgroundColor: '#f4f4f4',
        borderTopWidth: 0,
        borderColor: '#ccc',
        paddingTop: 10,
        paddingBottom: 20,
        marginTop:110
    },
    navItem: {
        alignItems: 'center'
    },
    icon: {
        width: 24,
        height: 24
    },
    button: {
        // marginTop: 50,
        // color:'white',
        backgroundColor: '#B00020',
        padding: 10,
        borderRadius: 6,
        marginLeft: 'auto'
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight:'bold'
      },
});
