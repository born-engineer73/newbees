// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Animated, PanResponder, Button, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// function shuffleArray(array) {
//     let currentIndex = array.length, randomIndex, temporaryValue;
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//     return array;
// }

// const Level2 = () => {
//     const [questions, setQuestions] = useState([]);
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [quizComplete, setQuizComplete] = useState(false);
//     const [isCorrect, setIsCorrect] = useState(false);
//     const [feedback, setFeedback] = useState('');
//     const [showFeedback, setShowFeedback] = useState(false);
//     const panRefs = useRef([]);
//     const navigation = useNavigation();
//     useEffect(() => {
//         initializeQuiz();
//     }, []);
//     const initializeQuiz = () => {
//         const initialQuestions = [
//             {
//                 question: "During ______, many women experience unusual cravings.",
//                 options: ["Pregnancy", "Adolescence", "Menopause", "Infancy"],
//                 correctAnswer: "Pregnancy"
//             },
//             {
//                 question: "The first movement of the fetus felt by the mother is known as ______.",
//                 options: ["Quickening", "Fluttering", "Kicking", "Waving"],
//                 correctAnswer: "Quickening"
//             },
//             {
//                 question: "To prevent neural tube defects, pregnant women are recommended to increase their intake of ______.",
//                 options: ["Vitamin C", "Vitamin D", "Vitamin A", "Folic Acid"],
//                 correctAnswer: "Folic Acid"
//             },
//             {
//                 question: "By the sixth week of pregnancy, the baby's heart starts to ______.",
//                 options: ["Grow", "Form", "Beat", "Expand"],
//                 correctAnswer: "Beat"
//             },
//             {
//                 question: "______ is a condition characterized by high blood pressure during pregnancy.",
//                 options: ["Hypertension", "Preeclampsia", "Gestational diabetes", "Anemia"],
//                 correctAnswer: "Preeclampsia"
//             },
//             {
//                 question: "The hormone detected by most home pregnancy tests is ______.",
//                 options: ["Estrogen", "Progesterone", "Human Chorionic Gonadotropin (hCG)", "Oxytocin"],
//                 correctAnswer: "Human Chorionic Gonadotropin (hCG)"
//             }
//         ];
//         setQuestions(shuffleArray([...initialQuestions]));
//         panRefs.current = initialQuestions.map(() => new Animated.ValueXY());
//         setQuestionIndex(0);
//         setIsCorrect(false);
//         setQuizComplete(false);
//         setShowFeedback(false);
//     };

//     const handleDrag = (index) => {
//         const option = questions[questionIndex].options[index];
//         const isCorrectAnswer = option === questions[questionIndex].correctAnswer;
//         setIsCorrect(isCorrectAnswer);
//         setFeedback(isCorrectAnswer ? 'Congratulations! That\'s correct!' : `Wrong Answer. Correct Answer is: ${questions[questionIndex].correctAnswer}`);
//         setShowFeedback(true);
//         Animated.spring(panRefs.current[index], {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true
//         }).start();
//         if (questionIndex === questions.length - 1) {
//             setQuizComplete(true);
//         }
//     };

//     const handleNextQuestion = () => {
//         if (questionIndex < questions.length - 1) {
//             setQuestionIndex(questionIndex + 1);
//             setIsCorrect(false);
//             setShowFeedback(false);
//         }
//     };

//     const handleRestartQuiz = () => {
//         setQuestions(shuffleArray([...questions]));
//         setQuestionIndex(0);
//         setIsCorrect(false);
//         setQuizComplete(false);
//         setShowFeedback(false);
//     };

//     const handleNextLevel = () => {
//         // Function to navigate to the next level
//         // console.log("Navigate to the next level.");
//         navigation.navigate('Home');
//     };

//     const renderDraggables = () => {
//         const rows = [];
//         for (let i = 0; i < questions[questionIndex].options.length; i += 2) {
//             const rowItems = questions[questionIndex].options.slice(i, i + 2).map((option, j) => {
//                 const index = i + j;
//                 const panResponder = PanResponder.create({
//                     onStartShouldSetPanResponder: () => true,
//                     onPanResponderMove: Animated.event(
//                         [null, { dx: panRefs.current[index].x, dy: panRefs.current[index].y }],
//                         { useNativeDriver: false }
//                     ),
//                     onPanResponderRelease: () => handleDrag(index),
//                 });

//                 return (
//                     <Animated.View
//                         key={index}
//                         style={[styles.option, { transform: panRefs.current[index].getTranslateTransform() }]}
//                         {...panResponder.panHandlers}>
//                         <Text style={styles.optionText}>{option}</Text>
//                     </Animated.View>
//                 );
//             });

//             rows.push(
//                 <View key={i} style={styles.optionRow}>
//                     {rowItems}
//                 </View>
//             );
//         }
//         return <View style={styles.optionsContainer}>{rows}</View>;
//     };

//     return (
//         <View style={styles.container}>
//             {questions.length > 0 && questionIndex < questions.length ? (
//                 <>
//                     <Text style={styles.question}>{questions[questionIndex].question.replace("______", isCorrect ? questions[questionIndex].correctAnswer : "______")}</Text>
//                     {renderDraggables()}
//                     {showFeedback && (
//                         <>
//                             <Text style={[styles.feedback, { color: isCorrect ? 'green' : 'red' }]}>{feedback}</Text>
//                             {!quizComplete && 
//                             (<View style={styles.buttonContainer}>
//                                 <Button title="Next Question" onPress={handleNextQuestion} />
//                                 </View>)}
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <Text>Loading questions...</Text>
//             )}
//             {quizComplete && (
//                 <>
//                 <View style={styles.buttonContainer}>

//                     <Button title="Restart Quiz" onPress={handleRestartQuiz} />
//                 </View>
//                 <View style={styles.buttonContainer}>

//                     <Button title="Home Page" onPress={handleNextLevel} />
//                 </View>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     question: {
//         fontSize: 20,
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     optionsContainer: {
        
//         borderWidth: 2,
//         borderColor: '#ddd',
//         margin: 50,
//         padding: 10,
//         width: '100%',
//     },
//     optionRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         margin: 5,
//     },
//     option: {
//         width: '48%', // Nearly half of the container width to fit two per row
//         padding: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'lightgrey',
//         borderRadius: 5,
//     },
//     optionText: {
//         fontSize: 16,
//     },
//     feedback: {
//         fontSize: 16,
//         marginTop: 20,
//     },
//     buttonContainer: {
//         marginTop: 15, // Adds space above each button
//         marginBottom: 10, // Adds space below each button, effectively spacing the buttons apart
//         paddingLeft: 40,
//         paddingRight: 40,
//     },
// });

// export default Level2;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const Level2 = ({ route }) => {
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(route.params?.score || 0); // Initialize score from route params or 0
    const panRefs = useRef([]);
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
                'custom:level': '2', // Ensure the value is a string
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
                question: "During ______, many women experience unusual cravings.",
                options: ["Pregnancy", "Adolescence", "Menopause", "Infancy"],
                correctAnswer: "Pregnancy"
            },
            {
                question: "The first movement of the fetus felt by the mother is known as ______.",
                options: ["Quickening", "Fluttering", "Kicking", "Waving"],
                correctAnswer: "Quickening"
            },
            {
                question: "To prevent neural tube defects, pregnant women are recommended to increase their intake of ______.",
                options: ["Vitamin C", "Vitamin D", "Vitamin A", "Folic Acid"],
                correctAnswer: "Folic Acid"
            },
            {
                question: "By the sixth week of pregnancy, the baby's heart starts to ______.",
                options: ["Grow", "Form", "Beat", "Expand"],
                correctAnswer: "Beat"
            },
            {
                question: "______ is a condition characterized by high blood pressure during pregnancy.",
                options: ["Hypertension", "Preeclampsia", "Gestational diabetes", "Anemia"],
                correctAnswer: "Preeclampsia"
            },
            {
                question: "The hormone detected by most home pregnancy tests is ______.",
                options: ["Estrogen", "Progesterone", "Human Chorionic Gonadotropin (hCG)", "Oxytocin"],
                correctAnswer: "Human Chorionic Gonadotropin (hCG)"
            }
        ];
        setQuestions(shuffleArray([...initialQuestions]));
        panRefs.current = initialQuestions.map(() => new Animated.ValueXY());
        setQuestionIndex(0);
        setIsCorrect(false);
        setQuizComplete(false);
        setShowFeedback(false);
    };

    const handleDrag = (index) => {
        const option = questions[questionIndex].options[index];
        const isCorrectAnswer = option === questions[questionIndex].correctAnswer;
        setIsCorrect(isCorrectAnswer);
        setFeedback(isCorrectAnswer ? 'Congratulations! That\'s correct!' : `Wrong Answer. Correct Answer is: ${questions[questionIndex].correctAnswer}`);
        setShowFeedback(true);

        let newScore = score;
        if (isCorrectAnswer) {
            newScore += 3; // Add 3 points for correct answer
        } else {
            newScore -= 1; // Subtract 1 point for incorrect answer
        }
        setScore(newScore);
        updateUserScore(newScore); // Update the score in Cognito

        Animated.spring(panRefs.current[index], {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true
        }).start();

        if (questionIndex === questions.length - 1) {
            setQuizComplete(true);
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setIsCorrect(false);
            setShowFeedback(false);
        }
    };

    const handleRestartQuiz = () => {
        initializeQuiz(); // Restart the quiz with shuffled questions
        fetchUserScore(); // Fetch the initial score from Cognito
    };

    const handleNextLevel = () => {
        navigation.navigate('Home', { score }); // Pass the score to the next level or home
    };

    const renderDraggables = () => {
        const rows = [];
        for (let i = 0; i < questions[questionIndex].options.length; i += 2) {
            const rowItems = questions[questionIndex].options.slice(i, i + 2).map((option, j) => {
                const index = i + j;
                const panResponder = PanResponder.create({
                    onStartShouldSetPanResponder: () => true,
                    onPanResponderMove: Animated.event(
                        [null, { dx: panRefs.current[index].x, dy: panRefs.current[index].y }],
                        { useNativeDriver: false }
                    ),
                    onPanResponderRelease: () => handleDrag(index),
                });

                return (
                    <Animated.View
                        key={index}
                        style={[styles.option, { transform: panRefs.current[index].getTranslateTransform() }]}
                        {...panResponder.panHandlers}>
                        <Text style={styles.optionText}>{option}</Text>
                    </Animated.View>
                );
            });

            rows.push(
                <View key={i} style={styles.optionRow}>
                    {rowItems}
                </View>
            );
        }
        return <View style={styles.optionsContainer}>{rows}</View>;
    };

    return (
        <View style={styles.container}>
            {questions.length > 0 && questionIndex < questions.length ? (
                <>
                    <Text style={styles.question}>{questions[questionIndex].question.replace("______", isCorrect ? questions[questionIndex].correctAnswer : "______")}</Text>
                    {renderDraggables()}
                    {showFeedback && (
                        <>
                            <Text style={[styles.feedback, { color: isCorrect ? 'green' : 'red' }]}>{feedback}</Text>
                            {!quizComplete && (
                                <View style={styles.buttonContainer}>
                                    <Button title="Next Question" onPress={handleNextQuestion} />
                                </View>
                            )}
                        </>
                    )}
                    <Text style={styles.scoreText}>Score: {score}</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Home Page" onPress={handleNextLevel} />
                    </View>
                </>
            ) : (
                <Text>Loading questions...</Text>
            )}
            {quizComplete && (
                <>
                    <View style={styles.buttonContainer}>
                        <Button title="Restart Quiz" onPress={handleRestartQuiz} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Home Page" onPress={handleNextLevel} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    question: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    optionsContainer: {
        borderWidth: 2,
        borderColor: '#ddd',
        margin: 50,
        padding: 10,
        width: '100%',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    option: {
        width: '48%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
    feedback: {
        fontSize: 16,
        marginTop: 20,
    },
    scoreText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
    },
});

export default Level2;


