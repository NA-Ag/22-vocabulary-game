const jeopardyData = [
    // Category: Vocabulary
    {
        category: "Vocabulary",
        questions: [
            { points: 100, question: "What is the term for a risky or daring journey or undertaking?", answer: "venture" },
            { points: 200, question: "What word means a lack of knowledge or information?", answer: "ignorance" },
            { points: 300, question: "How would you describe the act of spreading or scattering widely?", answer: "disperse" },
        ],
    },
    // Category: Synonyms
    {
        category: "Synonyms",
        questions: [
            { points: 100, question: "What is another word for 'ruler'?", answer: "sovereign" },
            { points: 200, question: "In a way that is widely known, she is known as what?", answer: "famously" },
            { points: 300, question: "What word means 'related to the countryside'?", answer: "provincial" },
        ],
    },
    // Category: Antonyms
    {
        category: "Antonyms",
        questions: [
            { points: 100, question: "What is the opposite of 'wealthy'?", answer: "impoverished" },
            { points: 200, question: "What is the antonym of 'obvious'?", answer: "subtle" },
            { points: 300, question: "What is the opposite of 'essential'?", answer: "intrinsic" },
        ],
    },
    // Category: Definitions
    {
        category: "Definitions",
        questions: [
            { points: 100, question: "What does it mean to 'examine closely'?", answer: "scrutinize" },
            { points: 200, question: "How would you describe something that is 'quick and light in movement'?", answer: "nimble" },
            { points: 300, question: "What is a 'flat, level surface' called?", answer: "plane" },
        ],
    },
];

const jeopardyBoard = document.querySelector('.jeopardy-board');
const questionModal = document.querySelector('.question-modal');
const categoryElement = document.getElementById('category');
const questionElement = document.getElementById('question');
const userAnswerElement = document.getElementById('user-answer');
const resultElement = document.getElementById('result');
const nextQuestionButton = document.getElementById('next-question');
const team1ScoreElement = document.getElementById('team-1-score');
const team2ScoreElement = document.getElementById('team-2-score');
const whoseTurnElement = document.getElementById('whose-turn');

let currentCategoryIndex;
let currentQuestionIndex;
let team1Score = 0;
let team2Score = 0;
let currentPlayer = 1;

// Function to reset the question modal
function resetQuestionModal() {
    categoryElement.textContent = '';
    questionElement.textContent = '';
    userAnswerElement.value = '';
    resultElement.textContent = '';
    userAnswerElement.removeAttribute('disabled');
    nextQuestionButton.style.display = 'none';
}

// Function to display a question in the modal
function displayQuestion(categoryIndex, questionIndex) {
    const question = jeopardyData[categoryIndex].questions[questionIndex];
    categoryElement.textContent = question.category;
    questionElement.textContent = `For ${question.points} points: ${question.question}`;
    questionModal.style.display = 'block';
    currentCategoryIndex = categoryIndex;
    currentQuestionIndex = questionIndex;
}

// Function to remove a card from the board
function removeCard(categoryIndex, questionIndex) {
    const cell = document.querySelector(`[data-category="${jeopardyData[categoryIndex].category}"][data-points="${jeopardyData[categoryIndex].questions[questionIndex].points}"]`);
    cell.parentNode.removeChild(cell);
}

// Event listener for cell clicks
jeopardyBoard.addEventListener('click', (event) => {
    const cell = event.target;
    const category = cell.getAttribute('data-category');
    const points = parseInt(cell.getAttribute('data-points'), 10);
    if (!isNaN(points) && category) {
        const categoryIndex = jeopardyData.findIndex((cat) => cat.category === category);
        if (categoryIndex !== -1) {
            const questionIndex = jeopardyData[categoryIndex].questions.findIndex((q) => q.points === points);
            if (questionIndex !== -1) {
                displayQuestion(categoryIndex, questionIndex);
            }
        }
    }
});

// Event listener for checking the answer
document.getElementById('check-answer').addEventListener('click', () => {
    const userAnswer = userAnswerElement.value.trim().toLowerCase();
    const correctAnswer = jeopardyData[currentCategoryIndex].questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        if (currentPlayer === 1) {
            team1Score += jeopardyData[currentCategoryIndex].questions[currentQuestionIndex].points;
            team1ScoreElement.textContent = `Team 1 Score: ${team1Score}`;
        } else {
            team2Score += jeopardyData[currentCategoryIndex].questions[currentQuestionIndex].points;
            team2ScoreElement.textContent = `Team 2 Score: ${team2Score}`;
        }
        removeCard(currentCategoryIndex, currentQuestionIndex);
    } else {
        resultElement.textContent = 'Incorrect. Try again.';
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        whoseTurnElement.textContent = `Team ${currentPlayer}'s Turn`;
    }

    userAnswerElement.value = '';
    userAnswerElement.focus();
});

// Event listener for moving to the next question
nextQuestionButton.addEventListener('click', () => {
    resetQuestionModal();
    questionModal.style.display = 'none';
});

// Event listener to close the question modal if the user clicks outside of it
questionModal.addEventListener('click', (event) => {
    if (event.target === questionModal) {
        resetQuestionModal();
        questionModal.style.display = 'none';
    }
});
