const questionSets = [
    [
        {
            question: "Who was the first Prime Minister of India?",
            answers: [
                { text: "Jawaharlal Nehru", correct: true },
                { text: "Gulzarilal Nanda", correct: false },
                { text: "Lal Bahadur Shastri", correct: false },
                { text: "Indira Gandhi", correct: false }
            ]
        },
        {
            question: "What is the capital of India?",
            answers: [
                { text: "Delhi", correct: true },
                { text: "Mumbai", correct: false },
                { text: "Kolkata", correct: false },
                { text: "Chennai", correct: false }
            ]
        },
        {
            question: "Which river is known as the 'Ganga of the South'?",
            answers: [
                { text: "Krishna", correct: false },
                { text: "Godavari", correct: true },
                { text: "Cauvery", correct: false },
                { text: "Tungabhadra", correct: false }
            ]
        },
        // Add more questions here...
    ],
    // Add more sets...
];

// Initialize variables
let currentSetIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');
const emoji = document.getElementById('emoji');

// Start the quiz
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentSetIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    showSet();
}

function showSet() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentSet = questionSets[currentSetIndex];
    const currentQuestion = currentSet[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    emoji.classList.add('hide');
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        emoji.innerHTML = '🎉'; // Update the emoji for a correct answer
    } else {
        emoji.innerHTML = '❌'; // Update the emoji for an incorrect answer
    }
    emoji.classList.remove('hide'); // Show the emoji
    scoreDisplay.innerText = `Score: ${score}`;
    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    const currentSet = questionSets[currentSetIndex];
    if (currentQuestionIndex < currentSet.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else if (currentSetIndex < questionSets.length - 1) {
        currentSetIndex++;
        showSet();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    questionContainer.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.innerText = 'Restart Quiz';
    scoreDisplay.innerText = `Final Score: ${score}`;
    emoji.classList.add('hide'); // Hide the emoji after finishing the quiz
}

// Function to create random emojis in the background
function createBackgroundEmojis() {
    const emojiContainer = document.querySelector('.emoji-container');
    const emojis = ['😀', '😄', '😅', '😇', '😍', '🥳', '😜', '😁', '😆', '😋'];

    for (let i = 0; i < 20; i++) { // Create 20 emojis
        const emojiDiv = document.createElement('div');
        emojiDiv.classList.add('emoji');
        emojiDiv.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random position and animation duration
        emojiDiv.style.left = `${Math.random() * 100}vw`;
        emojiDiv.style.top = `${Math.random() * 100}vh`;
        emojiDiv.style.animationDuration = `${Math.random() * 4 + 4}s`; // Duration between 4s to 8s
        
        emojiContainer.appendChild(emojiDiv);
    }
}

// Start creating background emojis
createBackgroundEmojis();
// Add event listener for back button
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', showPreviousQuestion);

// Function to show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Ensure the back button is shown/hidden correctly
function showQuestion() {
    resetState();
    const currentSet = questionSets[currentSetIndex];
    const currentQuestion = currentSet[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });

    // Show or hide buttons
    backButton.classList.toggle('hide', currentQuestionIndex === 0);
    nextButton.classList.remove('hide');
}
