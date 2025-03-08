let questions = [];

// 🚀 Fetch Questions from JSON File
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        shuffleQuestions();
    })
    .catch(error => console.error("Error loading questions:", error));

// 🚀 Function to Shuffle Questions (Fisher-Yates Algorithm)
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 🚀 Function to Filter Questions by Difficulty
function getQuestionsByDifficulty(level) {
    return questions.filter(q => q.difficulty === level);
}
