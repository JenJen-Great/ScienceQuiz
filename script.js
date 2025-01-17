const questionsAndAnswers = [
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "What is the study of living organisms called?", answer: "biology" },
    { question: "What is the process by which plants convert sunlight into energy called?", answer: "photosynthesis" },
    { question: "What is the smallest unit of an element that retains its chemical properties?", answer: "atom" },
    { question: "What is the basic unit of heredity?", answer: "gene" },
    { question: "What is the process by which liquid water turns into water vapor?", answer: "evaporation" },
    { question: "What is the process of converting a solid directly into a gas called?", answer: "sublimation" },
    { question: "What is the fundamental unit of life?", answer: "cell" },
    { question: "What is the process of a liquid turning into a gas at the surface called?", answer: "vaporization" },
    { question: "Who discovered the law of gravity?", answer: "isaac newton" }
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions() {
    for (let i = questionsAndAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsAndAnswers[i], questionsAndAnswers[j]] = [questionsAndAnswers[j], questionsAndAnswers[i]];
    }
}

function startQuiz() {
    shuffleQuestions(); 
    document.querySelector('button.start').style.display = 'none';  // Hide Start button
    document.getElementById('quiz').style.display = 'block';  // Show quiz
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questionsAndAnswers.length) {
        document.getElementById('question').innerText = 
            `Question ${currentQuestionIndex + 1}: ${questionsAndAnswers[currentQuestionIndex].question}`;
        document.getElementById('answerInput').value = '';
        document.getElementById('feedback').innerText = '';
        document.querySelector('.next').style.display = 'none';
        document.querySelector('.correct').style.display = 'inline-block';
        document.querySelector('.skip').style.display = 'inline-block';
    } else {
        document.querySelector('.next').style.display = 'none';
        document.getElementById('showResultButton').style.display = 'inline-block';  // Show Show Result button
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function submitAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const correctAnswer = questionsAndAnswers[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').innerText = "Correct!";
        document.getElementById('feedback').style.color = "green";
        score++;
    } else {
        document.getElementById('feedback').innerText = 
            `Incorrect! The correct answer was: ${correctAnswer.charAt(0).toUpperCase() + correctAnswer.slice(1)}`;
        document.getElementById('feedback').style.color = "red";
    }
    document.querySelector('.correct').style.display = 'none';
    document.querySelector('.skip').style.display = 'none';
    if (currentQuestionIndex < questionsAndAnswers.length - 1) {
        document.querySelector('.next').style.display = 'inline-block';
    } else {
        document.querySelector('.next').style.display = 'none';
        document.getElementById('showResultButton').style.display = 'inline-block';  // Show Show Result button on last question
    }
}


function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
    document.querySelector('.correct').style.display = 'inline-block';  // Show Submit button
    document.querySelector('.skip').style.display = 'inline-block';    // Show Skip button
    document.querySelector('.next').style.display = 'none';            // Hide Next button
}

function skipQuestion() {
    document.getElementById('feedback').innerText = 
        `Skipped! The correct answer was: ${questionsAndAnswers[currentQuestionIndex].answer}`;
    document.getElementById('feedback').style.color = "orange";
    document.querySelector('.correct').style.display = 'none';  // Hide Submit button
    document.querySelector('.skip').style.display = 'none';    // Hide Skip button
    document.querySelector('.next').style.display = 'inline-block';  // Show Next button
}


function endQuiz() {
    const passMessage = score >= 7 ? "Congratulations, you passed the test!" : "You failed the test, better luck next time!";
    document.getElementById('result').innerHTML = ` 
        <p>${passMessage}</p>
        <p>You got ${score} out of ${questionsAndAnswers.length} questions correct!</p>
        <p>Your Score: ${(score / questionsAndAnswers.length * 100).toFixed(1)}%.</p>
    `;
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
}