// QUESTIONS
const questions = [
    {
        question: "Which language is primarily used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false },
        ]
    },

    {
        question: "Which data structure uses FIFO (First In, First Out)?",
        answers: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: true },
            { text: "Tree", correct: false },
            { text: "Graph", correct: false },
        ]
    },

    {
        question: "What does 'JSON' stand for?",
        answers: [
            { text: "Java Source Object Notation", correct: false },
            { text: "JavaScript Object Notation", correct: true },
            { text: "Java Standard Output Name", correct: false },
            { text: "Joint System of Numbers", correct: false },
        ]
    },

    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "static", correct: false },
        ]
    },

    {
        question: "Which of the following is a backend JavaScript runtime?",
        answers: [
            { text: "npm", correct: false },
            { text: "Node.js", correct: true },
            { text: "React", correct: false },
            { text: "Angular", correct: false },
        ]
    },

    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/*", correct: false },
            { text: "#", correct: false },
            { text: "<!--", correct: false },
        ]
    },

    {
        question: "Which HTML tag is used to link a JavaScript file?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<code>", correct: false },
        ]
    },

    {
        question: "Which of the following is NOT a programming paradigm?",
        answers: [
            { text: "Object-oriented", correct: false },
            { text: "Functional", correct: false },
            { text: "Procedural", correct: false },
            { text: "Mechanical", correct: true },
        ]
    },

    {
        question: "Which SQL command is used to remove a table?",
        answers: [
            { text: "DELETE TABLE", correct: false },
            { text: "DROP TABLE", correct: true },
            { text: "REMOVE TABLE", correct: false },
            { text: "ERASE TABLE", correct: false },
        ]
    },

    {
        question: "What does 'DOM' stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Oriented Method", correct: false },
            { text: "Digital Operation Mode", correct: false },
            { text: "Dynamic Output Module", correct: false },
        ]
    },

    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Ruby", correct: false },
            { text: "Swift", correct: false },
            { text: "Cobra", correct: false },
            { text: "Discord", correct: true },
        ]
    },

    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false },
            { text: "<=>", correct: false },
        ]
    },

    {
        question: "Which of the following is a version control system?",
        answers: [
            { text: "Visual Studio", correct: false },
            { text: "Git", correct: true },
            { text: "Firebase", correct: false },
            { text: "MySQL", correct: false },
        ]
    },

    {
        question: "Which of these is a valid Python data type?",
        answers: [
            { text: "tuple", correct: true },
            { text: "triple", correct: false },
            { text: "listset", correct: false },
            { text: "chain", correct: false },
        ]
    },

    {
        question: "In programming, what does 'API' stand for?",
        answers: [
            { text: "Advanced Program Interaction", correct: false },
            { text: "Application Program Interface", correct: false },
            { text: "Application Programming Interface", correct: true },
            { text: "Applied Programming Instruction", correct: false },
        ]
    }
];


const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// START QUIZ
function startQuiz() {
    currentQuestionIndex = 0; // reset global values (not local!)
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// SHOW QUESTION
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    // Title format: Question 1 of 15: TEXT
    questionElement.innerHTML = `Question ${questionNo} of ${questions.length}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}


// RESET UI
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// HANDLE ANSWER SELECTION
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        selectedBtn.innerHTML = `<i class="fas fa-check"></i> ${selectedBtn.textContent}`;// add check mark
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
         selectedBtn.innerHTML = `<i class="fas fa-times"></i> ${selectedBtn.textContent}`;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");

             if (!button.innerHTML.includes('fa-check')) {
                button.innerHTML = `<i class="fas fa-check"></i> ${button.textContent}`;
            }
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// SHOW SCORE
function showScore() {
     resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    questionElement.classList.add('scored'); // Add scored style
    nextButton.innerHTML = 'Play Again';
    nextButton.classList.add('scored'); // Style play again button
    nextButton.style.display = 'block';
}

// HANDLE NEXT
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// INITIAL START
startQuiz();
