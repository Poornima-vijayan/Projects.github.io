const question =[
    {
        question : "17, 81, 131, 169, 197, ? ",
        answers : [
                {text : "206", correct: false},
                {text : "229", correct: false},
                {text : "217", correct: true},
                {text : "218", correct: false}
        ]
    },

    {
        question : " 15 , 18 , 16 , 19 , 17 , 20 , ? ",
        answers : [
                {text : "23", correct: false},
                {text : "22", correct: false},
                {text : "18", correct: true},
                {text : "17", correct: false}
        ] 
    },

    {
        question : "5, 12, 9, 9, 13, ?, 17 ",
        answers : [
                {text : "13", correct: false},
                {text : "6", correct: true},
                {text : "15", correct: false},
                {text : "5", correct: false}
        ] 
    },

    {
        question : "26, 40, 56, 74, 94, ? ",
        answers : [
                {text : "106", correct: false},
                {text : "116", correct: true},
                {text : "110", correct: false},
                {text : "120", correct: false}
        ] 
    },

    {
        question : "11, 36, 65, 98, ?, 176",
        answers : [
                {text : "118", correct: false},
                {text : "120", correct: false},
                {text : "130", correct: false},
                {text : "135", correct: true}
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
    questionElement.innerHTML = questionNumber + ") " + currentQuestion.question;
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
