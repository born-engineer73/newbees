// import { useNavigation } from '@react-navigation/native';
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

// function shuffleArray(array) {
//     let currentIndex = array.length, temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

// const Level1 = () => {
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [showResult, setShowResult] = useState(false);
//     const [showNextButton, setShowNextButton] = useState(false);
//     const [optionStyles, setOptionStyles] = useState(Array(4).fill(styles.option));
//     const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
//     const [showTryAgain, setShowTryAgain] = useState(false);
//     const [quizComplete, setQuizComplete] = useState(false);
//     const [questions, setQuestions] = useState([]);
//     const navigation = useNavigation();
//     const handleNextLevel = () => {
//         navigation.navigate('Quiz-Level 2'); // Navigate to Level2
//       };
//     useEffect(() => {
//         const initialQuestions = [
//             {
//                 question: "What unusual craving do some pregnant women experience due to a condition called pica?",
//                 options: ["Chocolate", "Clay", "Ice cream", "Pickles"],
//                 correctAnswer: "Clay"
//             },
//             {
//                 question: "What is the record for the most babies born to one woman?",
//                 options: ["19 children", "27 children", "34 children", "69 children"],
//                 correctAnswer: "69 children"
//             },
//             {
//                 question: "Identify the organ in the image below:",
//                 image: "https://harvardeye.com/wp-content/uploads/2018/08/Diagram-of-the-Eye.png",
//                 options: ["Eye", "Ear", "Nose", "Tongue"],
//                 correctAnswer: "Eye"
//             },
//             {
//                 question: "Identify the organ in the image below:",
//                 image: "https://i.pinimg.com/564x/e8/7d/5b/e87d5b7a94ab32eddb919b05a1bb886b.jpg",
//                 options: ["Nose","Eye", "Ear",  "Tongue"],
//                 correctAnswer: "Ear"
//             },
//             {
//                 question: "At what stage of pregnancy does a baby develop fingerprints?",
//                 options: ["At 6 weeks", "At 12 weeks", "At 24 weeks", "At 32 weeks"],
//                 correctAnswer: "At 12 weeks"
//             },
//             // Add more Questions from Database
//         ];
//         setQuestions(shuffleArray([...initialQuestions])); // Shuffle and set the questions
//     }, []);

//     const handleOptionSelect = (option, index) => {
//         setSelectedOption(option);
//         const newOptionStyles = [...optionStyles];

//         if (option === questions[questionIndex].correctAnswer) {
//             newOptionStyles[index] = styles.correctOption;
//             setCorrectOptionIndex(index);
//             setShowResult(true);
//             setShowTryAgain(false);

//             if (questionIndex === questions.length - 1) { // Check if it's the last question
//                 setQuizComplete(true); // End the quiz correctly
//                 setShowNextButton(false); // Don't show next button if it's the last question
//             } else {
//                 setShowNextButton(true); // Show the next button only if it's not the last question
//             }
//         } else {
//             newOptionStyles[index] = styles.incorrectOption;
//             setShowResult(false);
//             setShowTryAgain(true);

//             setTimeout(() => {
//                 newOptionStyles[index] = styles.option; // Reset specific incorrect option
//                 setOptionStyles(newOptionStyles);
//                 setShowTryAgain(false);

//                 if (questionIndex === questions.length - 1) { // Check if it's the last question
//                     // This is where you ensure it does not set the quiz complete if the last answer is wrong
//                     setShowNextButton(false); // Ensure next button isn't shown
//                 }
//             }, 100);
//         }
//         setOptionStyles(newOptionStyles);
//     };

//     const handleNextQuestion = () => {
//         if (questionIndex < questions.length - 1) {
//             setQuestionIndex(questionIndex + 1);
//             setSelectedOption(null);
//             setShowResult(false);
//             setShowNextButton(false);
//             setOptionStyles(Array(4).fill(styles.option));
//             setCorrectOptionIndex(null);
//         } else {
//             setQuizComplete(true);
//         }
//     };

//     const handleStartAgain = () => {
//         setQuestions(shuffleArray([...questions])); // Shuffle the questions array
//         setQuestionIndex(0);
//         setSelectedOption(null);
//         setShowResult(false);
//         setShowNextButton(false);
//         setOptionStyles(Array(4).fill(styles.option));
//         setCorrectOptionIndex(null);
//         setQuizComplete(false);
//     };

//     return (
//         <View style={styles.container}>
//             {questions.length > 0 ? (
//                 <>
//                     <Text style={styles.question}>{questions[questionIndex].question}</Text>
//                     {questions[questionIndex].image && (
//                         <Image
//                             source={{ uri: questions[questionIndex].image }}
//                             style={styles.questionImage}
//                             resizeMode="contain"
//                         />
//                     )}
//                     <View style={styles.optionRow}>
//                         {questions[questionIndex].options.slice(0, 2).map((option, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[optionStyles[index], styles.option]}
//                                 onPress={() => handleOptionSelect(option, index)}
//                                 disabled={showResult}
//                             >
//                                 <Text style={styles.optionText}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                     <View style={styles.optionRow}>
//                         {questions[questionIndex].options.slice(2, 4).map((option, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[optionStyles[index + 2], styles.option]}
//                                 onPress={() => handleOptionSelect(option, index + 2)}
//                                 disabled={showResult}
//                             >
//                                 <Text style={styles.optionText}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                     {showResult && (
//                         <Text style={[styles.resultText,
//                             selectedOption !== questions[questionIndex].correctAnswer && styles.incorrectResult]}>
//                             {selectedOption === questions[questionIndex].correctAnswer
//                                 ? "Congratulations! That's correct."
//                                 : "Try again."}
//                         </Text>
//                     )}
//                     {!quizComplete && showNextButton && (
//                         <View style={styles.buttonContainer}>
//                             <Button title="Next Question" onPress={handleNextQuestion} color="blue" />
//                         </View>
//                     )}
//                     {quizComplete && (
//                         <>
//                             <View style={styles.buttonContainer}>
//                                 <Button
//                                     title="Next Level"
//                                     onPress={handleNextLevel}
//                                     color="blue"
//                                 />
//                             </View>
//                             <View style={styles.buttonContainer}>
//                                 <Button
//                                     title="Start Again"
//                                     onPress={handleStartAgain}
//                                     color="green"
//                                 />
//                             </View>
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <Text>Loading questions...</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     questionImage: {
//         width: 300, // Set a fixed width or use percentages
//         height: 200, // Set a fixed height
//         marginTop: 20,
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         margin: 10,
//     },
//     question: {
//         fontSize: 20,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     optionRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-around', // This will space the buttons evenly
//         marginBottom: 10, // Adds space between the rows
//     },
//     option: {
//         paddingTop: 55,
//         paddingBottom: 55,
//         margin: 5,
//         borderWidth: 1,
//         borderRadius: 5,
//         borderColor: '#ccc',
//         flex: 1, // Makes the buttons expand to fill the space
//     },
//     optionText: {
//         fontSize: 16,
//         textAlign: 'center', // Centers the text within the button
//     },
//     correctOption: {
//         backgroundColor: 'lightgreen',
//     },
//     incorrectOption: {
//         backgroundColor: 'red',
//     },
//     resultText: {
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     incorrectResult: {
//         color: 'red',
//     },
//     buttonContainer: {
//         marginTop: 15, // Adds space above each button
//         marginBottom: 10, // Adds space below each button, effectively spacing the buttons apart
//         paddingLeft: 40,
//         paddingRight: 40,
//     },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const Level1 = ({ route }) => {
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [optionStyles, setOptionStyles] = useState(Array(4).fill(styles.option));
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(route.params?.score || 0); // Initialize score from route params or 0

    const navigation = useNavigation();

    useEffect(() => {
        initializeQuiz();
        fetchUserScore();
    }, []);

    const fetchUserScore = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const userAttributes = user.attributes;
            const userScore = userAttributes['custom:score'] ? parseInt(userAttributes['custom:score'], 10) : 0;
            setScore(userScore);
            const result = await Auth.updateUserAttributes(user, {
                'custom:level': '1', // Ensure the value is a string
            });
        } catch (error) {
            console.error('Error fetching user score:', error);
        }
    };

    const updateUserScore = async (newScore) => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, {
                'custom:score': newScore.toString(),
            });
        } catch (error) {
            console.error('Error updating user score:', error);
        }
    };

    const initializeQuiz = () => {
        const initialQuestions = [
            {
                question: "What unusual craving do some pregnant women experience due to a condition called pica?",
                options: ["Chocolate", "Clay", "Ice cream", "Pickles"],
                correctAnswer: "Clay"
            },
            {
                question: "What is the record for the most babies born to one woman?",
                options: ["19 children", "27 children", "34 children", "69 children"],
                correctAnswer: "69 children"
            },
            {
                question: "Identify the organ in the image below:",
                image: "https://harvardeye.com/wp-content/uploads/2018/08/Diagram-of-the-Eye.png",
                options: ["Eye", "Ear", "Nose", "Tongue"],
                correctAnswer: "Eye"
            },
            {
                question: "Identify the organ in the image below:",
                image: "https://i.pinimg.com/564x/e8/7d/5b/e87d5b7a94ab32eddb919b05a1bb886b.jpg",
                options: ["Nose","Eye", "Ear",  "Tongue"],
                correctAnswer: "Ear"
            },
            {
                question: "At what stage of pregnancy does a baby develop fingerprints?",
                options: ["At 6 weeks", "At 12 weeks", "At 24 weeks", "At 32 weeks"],
                correctAnswer: "At 12 weeks"
            },
            // Add more Questions from Database
        ];
        setQuestions(shuffleArray([...initialQuestions])); // Shuffle and set the questions
    };

    const handleOptionSelect = (option, index) => {
        setSelectedOption(option);
        const newOptionStyles = [...optionStyles];

        if (option === questions[questionIndex].correctAnswer) {
            newOptionStyles[index] = styles.correctOption;
            setCorrectOptionIndex(index);
            setShowResult(true);
            setShowTryAgain(false);
            const newScore = score + 2; // Add 2 points for correct answer
            setScore(newScore);
            updateUserScore(newScore); // Update the score in Cognito

            if (questionIndex === questions.length - 1) {
                setQuizComplete(true);
                setShowNextButton(false);
            } else {
                setShowNextButton(true);
            }
        } else {
            newOptionStyles[index] = styles.incorrectOption;
            setShowResult(false);
            setShowTryAgain(true);
            const newScore = score - 1; // Subtract 1 point for incorrect answer
            setScore(newScore);
            updateUserScore(newScore); // Update the score in Cognito

            setTimeout(() => {
                newOptionStyles[index] = styles.option;
                setOptionStyles(newOptionStyles);
                setShowTryAgain(false);

                if (questionIndex === questions.length - 1) {
                    setShowNextButton(false);
                }
            }, 100);
        }
        setOptionStyles(newOptionStyles);
    };

    const handleNextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setSelectedOption(null);
            setShowResult(false);
            setShowNextButton(false);
            setOptionStyles(Array(4).fill(styles.option));
            setCorrectOptionIndex(null);
        } else {
            setQuizComplete(true);
        }
    };

    const handleStartAgain = () => {
        initializeQuiz(); // Shuffle the questions array and reinitialize the quiz
        fetchUserScore(); // Fetch the initial score from Cognito
        setQuestionIndex(0);
        setSelectedOption(null);
        setShowResult(false);
        setShowNextButton(false);
        setOptionStyles(Array(4).fill(styles.option));
        setCorrectOptionIndex(null);
        setQuizComplete(false);
    };

    const handleNextLevel = () => {
        navigation.navigate('Quiz-Level 2', { score });
    };

    return (
        <View style={styles.container}>
            {questions.length > 0 ? (
                <>
                    <Text style={styles.question}>{questions[questionIndex].question}</Text>
                    {questions[questionIndex].image && (
                        <Image
                            source={{ uri: questions[questionIndex].image }}
                            style={styles.questionImage}
                            resizeMode="contain"
                        />
                    )}
                    <View style={styles.optionRow}>
                        {questions[questionIndex].options.slice(0, 2).map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[optionStyles[index], styles.option]}
                                onPress={() => handleOptionSelect(option, index)}
                                disabled={showResult}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.optionRow}>
                        {questions[questionIndex].options.slice(2, 4).map((option, index) => (
                            <TouchableOpacity
                                key={index + 2}
                                style={[optionStyles[index + 2], styles.option]}
                                onPress={() => handleOptionSelect(option, index + 2)}
                                disabled={showResult}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {showResult && (
                        <Text
                            style={[
                                styles.resultText,
                                selectedOption !== questions[questionIndex].correctAnswer && styles.incorrectResult,
                            ]}
                        >
                            {selectedOption === questions[questionIndex].correctAnswer
                                ? "Congratulations! That's correct."
                                : "Try again."}
                        </Text>
                    )}
                    <Text style={styles.scoreText}>Score: {score}</Text>
                    {!quizComplete && showNextButton && (
                        <View style={styles.buttonContainer}>
                            <Button title="Next Question" onPress={handleNextQuestion} color="blue" />
                        </View>
                    )}
                    {quizComplete && (
                        <>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Next Level"
                                    onPress={handleNextLevel}
                                    color="blue"
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Start Again"
                                    onPress={handleStartAgain}
                                    color="green"
                                />
                            </View>
                        </>
                    )}
                </>
            ) : (
                <Text>Loading questions...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    questionImage: {
        width: 300,
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
    },
    question: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    option: {
        paddingTop: 55,
        paddingBottom: 55,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        flex: 1,
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    correctOption: {
        backgroundColor: 'lightgreen',
    },
    incorrectOption: {
        backgroundColor: 'red',
    },
    resultText: {
        marginTop: 10,
        textAlign: 'center',
    },
    incorrectResult: {
        color: 'red',
    },
    buttonContainer: {
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
    },
    scoreText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Level1;

