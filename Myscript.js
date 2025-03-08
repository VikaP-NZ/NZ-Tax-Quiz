let filteredQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// 🚀 Shuffle Questions Function (Fisher-Yates Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 🚀 Load Questions (Using questions.js Instead of JSON)
function loadQuestions() {
    if (!questions || questions.length === 0) {
        console.error("Error: Questions not loaded.");
        alert("Questions not found. Please check your file.");
        return;
    }
    shuffleArray(questions);
    updateTotalQuestionsCount();
}

// 🚀 Update Total Questions Count
function updateTotalQuestionsCount() {
    document.getElementById("total-questions").innerText = `Total Questions: ${questions.length}`;
}

// 🚀 Set Difficulty Level & Show Tax Aspects
function setDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    document.getElementById("aspect-buttons").classList.remove("hidden");
    document.getElementById("aspect-title").classList.remove("hidden");
    displayAspects();
}

// 🚀 Display Available Aspects
function displayAspects() {
    const aspectButtonsDiv = document.getElementById("aspect-buttons");
    aspectButtonsDiv.innerHTML = "";

    const aspects = [...new Set(questions.map(q => q.aspect))];

    aspects.forEach(aspect => {
        let count = questions.filter(q => q.aspect === aspect && q.difficulty === selectedDifficulty).length;
        const button = document.createElement("button");
        button.innerText = `${aspect} - ${count} questions`;

        if (count > 0) {
            button.onclick = () => startQuiz(aspect);
        } else {
            button.onclick = () => alert("No questions available.");
        }

        aspectButtonsDiv.appendChild(button);
    });
}

// 🚀 Start Quiz
function startQuiz(aspect) {
    selectedAspect = aspect;
    switchPage("quiz-container");

    filteredQuestions = questions.filter(q => q.aspect === selectedAspect && q.difficulty === selectedDifficulty);
    shuffleArray(filteredQuestions);
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

// 🚀 Display Question
function displayQuestion() {
    if (currentQuestionIndex >= filteredQuestions.length) {
        finishQuiz();
        return;
    }

    const questionObj = filteredQuestions[currentQuestionIndex];
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("finish-btn").classList.add("hidden");
    document.getElementById("back-btn").classList.toggle("hidden", currentQuestionIndex === 0);
    
    document.getElementById("question-number").innerText = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
    document.getElementById("question-text").innerText = questionObj.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    questionObj.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });

    if (currentQuestionIndex === filteredQuestions.length - 1) {
        document.getElementById("finish-btn").classList.remove("hidden");
    } else {
        document.getElementById("next-btn").classList.remove("hidden");
    }
}

// 🚀 Check Answer
function checkAnswer(selectedIndex) {
    const questionObj = filteredQuestions[currentQuestionIndex];
    document.getElementById("feedback").innerHTML = selectedIndex === questionObj.correct
        ? `<span class='correct'>Correct!</span> ${questionObj.explanation}`
        : `<span class='incorrect'>Incorrect.</span> ${questionObj.explanation}`;
}

// 🚀 Navigation Functions
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}
function finishQuiz() {
    alert(`Quiz Completed! Your score: ${score} / ${filteredQuestions.length}`);
    goBackToMainMenu();
}

// 🚀 Switch Page
function switchPage(pageId) {
    document.querySelectorAll(".quiz-container").forEach(el => el.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// 🚀 Initialize
loadQuestions();
