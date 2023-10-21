const questions = [
    {
         question: "What did Joey buy for Chandler because they're best friends?",
         answers : [
            { text: "A pizza" , correct: false },
            { text: "A sandwich" , correct: false },
            { text: "A watch" , correct: false },
            { text: "A bracelet" , correct: true },
         ]
    },
    {
        question: "Whose apartment has a picture frame hanging on the door?",
        answers : [
           { text: "Ross" , correct: false },
           { text: "Monica" , correct: true },
           { text: "Phoebe" , correct: false },
           { text: "Chandler and Joey" , correct: false },
        ]
    },
    {
        question: "Monica organises her towels into several categories. But how many?",
        answers : [
           { text: "4" , correct: false },
           { text: "6" , correct: false },
           { text: "11" , correct: true },
           { text: "9" , correct: false },
        ]
    },
    {
        question: "What's the first thing Ross says at the beginning of the opening episode?",
        answers : [
           { text: "Has anyone seen my fossil collection?" , correct: false },
           { text: "How are you?" , correct: false },
           { text: "Could I be wearing any more clothes?" , correct: false },
           { text: "Hi..." , correct: true },
        ]
    },
    {
        question: "Chandler and Ross were a band while they were at college. Can you remember the band's name?",
        answers : [
           { text: "Flock of Birds" , correct: false },
           { text: "Way, No Way" , correct: true },
           { text: "Wyld Stallyns" , correct: false },
           { text: "Mosh Bros" , correct: false },
        ]
    },
    {
        question: "Who was the youngest person in the Friends gang?",
        answers : [
           { text: "Rachel" , correct: true },
           { text: "Joey" , correct: false },
           { text: "Phoebe" , correct: false },
           { text: "Chandler" , correct: false },
        ]
    },
    {
        question: "When the Friends gang went to London for Ross' wedding, which member of the Royal Family did they bump into?",
        answers : [
           { text: "Prince Harry" , correct: false },
           { text: "Princess Anne" , correct: false },
           { text: "The Duchess of York, Sarah Ferguson" , correct: true },
           { text: "The Queen" , correct: false },
        ]
    },
    {
        question: "Ross had a son called Ben. What was Ben's first word?",
        answers : [
           { text: "Dinosaur" , correct: false },
           { text: "Coffee" , correct: false },
           { text: "Hi" , correct: true },
           { text: "Daddy" , correct: false },
        ]
    },
    {
        question: "Which of the following was a working title for the show before they settled on Friends?",
        answers : [
           { text: "That Goofy Paleontologist" , correct: false },
           { text: "Six of One" , correct: true },
           { text: "Mates" , correct: false },
           { text: "Squad Goals" , correct: false },
        ]
    },
    {
        question: "What is Chandler's middle name?",
        answers : [
           { text: "Muriel" , correct: true },
           { text: "Jason" , correct: false },
           { text: "Kim" , correct: false },
           { text: "Zachary" , correct: false },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
}

function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        })
}
function resetState(){
        nextButton.style.display = "none";
        while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild)
        }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");            
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz()
    }
})


startQuiz();