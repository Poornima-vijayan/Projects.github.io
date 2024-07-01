const question =[
    {
        question : "4 feet, 5(1/4) inches + 30 feet, 6 inches + 10 feet, 2 inches + 3(1/4) inches ",
        answers : [
                {text : "44 feet, 11 inches", correct: false},
                {text : "45 feet, 5 inches", correct: true},
                {text : "46 feet, 2 inches", correct: false},
                {text : "47 feet, 1 inches", correct: false}
        ]
    },

    {
        question : "246 x 132 ",
        answers : [
                {text : "32,472", correct: true},
                {text : "34,272", correct: false},
                {text : "435,242", correct: false},
                {text : "36,422", correct: false}
        ] 
    },

    {
        question : "45 + .9 + 436.005 + 1168 + .64532 ",
        answers : [
                {text : "1648.55063", correct: false},
                {text : "1649.63082", correct: false},
                {text : "1650.55032", correct: true},
                {text : "1750.60232", correct: false}
        ] 
    },

    {
        question : "9/10 - 3/20 ",
        answers : [
                {text : "3/4", correct: true},
                {text : "4/5", correct: false},
                {text : "4/15", correct: false},
                {text : "5/15", correct: false}
        ] 
    },

    {
        question : "9 days, 18 hours, 37 minutes + 5 days, 16 hours, 16 minutes + 2 days, 15 hours, 13 minutes + 10 hours, 11 minutes",
        answers : [
                {text : "17 days, 30 hours, 16 minutes", correct: false},
                {text : "18 days, 12 hours, 17 minutes", correct: true},
                {text : "18 days, 15 hours, 27 minutes", correct: false},
                {text : "19 days, 20 hours, 57 minutes", correct: false}
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer_button");
const nextBtn = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

/*To start the Quiz*/
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML="Next"
    showQuestion();
}

/*To display Quiz*/
function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn1");
        answerButton.appendChild(button);
        if(answer.correct){
            /* console.log(button.dataset); */
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

/*To reset the quiz*/
function resetState(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

/* To validate correct answer*/
function selectAnswer(e){
    const selectedBtn = e.target;
    if(selectedBtn.dataset.correct === "true")
        {
            selectedBtn.classList.add("correct");
            score++;
        }
        else
        {
            selectedBtn.classList.add("incorrect");
        }

    /*If selected answer is wrong display correct answer and disable the other answer to select further*/
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true")
            {
                /*To display which is correct answer*/
                button.classList.add("correct");
            }
             /*disabling other answers to avoid another selection*/
            button.disabled=true;
        });
            nextBtn.style.display="block";
    }

    nextBtn.addEventListener("click", ()=>{
        if(currentQuestionIndex < question.length)
            {
                handleNextbtn();
            }
            else
            {
                startQuiz();
            }
    })

    function handleNextbtn(){
        currentQuestionIndex++;
        if(currentQuestionIndex < question.length)
            {
                showQuestion();
            }
            else
            {
                showScore();
            }
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `Your score is ${score} out of ${question.length}`;
        nextBtn.innerHTML = "Start Quiz Again"
        nextBtn.style.display="block";
        }
startQuiz();
