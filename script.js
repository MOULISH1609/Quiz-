const questions = [
    {
        question: "HTML stands for ",
        answers: [
            { text: "HighText Machine Language", correct: false },
            { text: "HyperText and links Markup Language", correct: false },
            { text: "HyperText Markup Language", correct: true },
            { text: "None of these", correct: false },
        ]
    },
    {
        question: "CSS stands for ",
        answers: [
            { text: "CSS stands for Cascading Style Sheet", correct: true },
            { text: "CSS is used to design HTML tags", correct: false },
            { text: "CSS is a widely used language on the web", correct: false },
            { text: "CSS is used to design JS tags.", correct: false },
        ]
    },
    {
        question: "Javascript is an  language",
        answers: [
            { text: "None of these", correct: false },
            { text: "Object-Based", correct: false },
            { text: "Procedural", correct: false },
            { text: "Object-Oriented", correct: true },
        ]
    },
    {
        question: "Which of the following is the correct name of React.js?",
        answers: [
            { text: "React", correct: false },
            { text: " React.js", correct: true },
            { text: "ReactJS", correct: false },
            { text: "All of the above", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

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

startQuiz();
