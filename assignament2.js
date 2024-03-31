

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Monaco", correct: false},
            {text: "Madrid", correct: false},
        ]
    },
    {
        question: "How many planets are in our Solar System?",
        answers: [
            {text: "7", correct: false},
            {text: "8", correct: true},
            {text: "9", correct: false},
            {text: "10", correct: false},
        ]
    },
    {
        question: "What gas do plants primarily take in for photosynthesis?",
        answers: [
            {text: "Hydrogen", correct: false},
            {text: "Nitrogen", correct: false},
            {text: "Oxygen", correct: false},
            {text: "Carbon Dioxide", correct: true},
        ]
    },
    {
        question: "Which is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
            {text: "Indian Ocean", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide'); // Make sure to hide the Next button at the start
    questionElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === 'true';
    if (correct) {
        score++;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('wrong');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true; // Disable all buttons after one is clicked
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'View Results';
        nextButton.classList.remove('hide');
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
});

function showResults() {
    const resultsSection = document.createElement('div');
    resultsSection.setAttribute('id', 'results');
    resultsSection.innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <button id="restart-btn" class="btn">Restart Quiz</button>
    `;
    document.body.append(resultsSection);
    nextButton.classList.add('hide');
    questionElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    
    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', () => {
        resultsSection.remove();
        startQuiz();
    });
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

