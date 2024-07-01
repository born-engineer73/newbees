// // const fetch = require('node-fetch')

// async function fetchQuizQuestions() {
//     const response = await fetch('https://questions-quiz.s3.amazonaws.com/questions.json');
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
// }

// function getRandomQuestions(questions, numQuestions) {
//     if (numQuestions > questions.length) {
//         throw new Error(`Number of questions requested (${numQuestions}) exceeds available questions (${questions.length})`);
//     }
//     const shuffled = questions.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, numQuestions);
// }

// fetchQuizQuestions()
//     .then(data => {
//         const numQuestionsPerLevel =5; // Define how many questions you want to select from each level

//         const pcodLevel1Questions = getRandomQuestions(data.PCOD.Level1, numQuestionsPerLevel);
//         console.log('Selected PCOD Level 1 Questions:', pcodLevel1Questions);
//         const pcodLevel2Questions = getRandomQuestions(data.PCOD.Level2, numQuestionsPerLevel);
//         console.log('Selected PCOD Level 2 Questions:', pcodLevel2Questions);
//     })
//     .catch(error => console.error('Error fetching the quiz questions:', error));

// const fetch = require('node-fetch');
const prompt = require('prompt-sync')({ sigint: true });

async function fetchQuizQuestions() {
    const response = await fetch('https://questions-quiz.s3.amazonaws.com/questions.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

function getRandomQuestions(questions, numQuestions) {
    if (numQuestions > questions.length) {
        throw new Error(`Number of questions requested (${numQuestions}) exceeds available questions (${questions.length})`);
    }
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

async function main() {
    const data = await fetchQuizQuestions();
    
    const category = prompt('Enter the category (e.g., PCOD, Diabetics): ');
    const numQuestionsPerLevel = parseInt(prompt('Enter the number of questions per level: '), 10);

    if (!data[category]) {
        console.error(`Category "${category}" not found in the data.`);
        return;
    }

    for (const level of ['Level1', 'Level2']) {
        try {
            const questions = getRandomQuestions(data[category][level], numQuestionsPerLevel);
            console.log(`Selected ${category} ${level} Questions:`, questions);
        } catch (error) {
            console.error(`Error for ${category} ${level}:`, error.message);
        }
    }
}

main().catch(error => console.error('Error:', error));



