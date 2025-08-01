 //DOM elements
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quize-screen')
const resultScreen = document.getElementById('result-screen')
const startButton = document.getElementById('start-btn')
const questionText = document.getElementById('question-text')
const answerContainer = document.getElementById('answers-container')
const currentQuestionSpan = document.getElementById('current-question')
const totalQuestionsSpan = document.getElementById('total-questions')
const scoreSpan = document.getElementById('score')
const finalScoreSpan = document.getElementById('final-score')
const maxScoreSpan = document.getElementById('max-score')
const resultMessage = document.getElementById('result-message')
const restartButton = document.getElementById('restart-btn')
const progressBar = document.getElementById('progress')

// console.log("currentQuestionSpan", currentQuestionSpan);

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0; 
let answersDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


//event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz)


function startQuiz() {
    // reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    // console.log("currentQuestionsSpan", currentQuestionSpan);

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercentage = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        
        //what is dataset ?
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answerContainer.appendChild(button);
    })
}

function selectAnswer(event) {
  //optimization: prevent multiple clicks
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';
  
  /* Here Array.from() is used to convert the NodeList  returned by
  answerContainer.children into an array, this is because the NodeList is
  not an array and we need to use the forEach method which is available on arrays.
  */
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }else if (button === selectedButton){
      button.classList.add('incorrect')
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    }else {
      showResult();
    }
  }, 1000)
}


function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect Score! Well done!";
  }else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  }else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  }else if (percentage >= 40) {
    resultMessage.textContent = "Not bad, but there's room for improvement!";
  }else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
    resultScreen.classList.remove('active');

    startQuiz();
}