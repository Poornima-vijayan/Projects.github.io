const question =[
    {
        question : "decrease : increase ",
        answers : [
                {text : "stretch : enlarge ", correct: false},
                {text : "beauty : ugliness", correct: true},
                {text : "sitting: walking", correct: false},
                {text : "square: triangle", correct: false}
        ]
    },

    {
        question : "team : coach  ",
        answers : [
                {text : "car : mechanic", correct: false},
                {text : "cooking : chef", correct: false},
                {text : "musicians : conductor", correct: true},
                {text : "fruit : grocer ", correct: false}
        ] 
    },

    {
        question : "flower : bouquet ",
        answers : [
                {text : "soldier : company", correct: true},
                {text : "5bread : cookies", correct: false},
                {text : "magazine : cover", correct: false},
                {text : "tap : water", correct: false}
        ] 
    },

    {
        question : " sand : glass ",
        answers : [
                {text : "cotton : wool", correct: false},
                {text : "tree : paper", correct: true},
                {text : "seed : flower", correct: false},
                {text : "stove : oven", correct: false}
        ] 
    },

   /*  {
        question : "A bag contains X red balls & 5 green balls. If two balls taken out probability of being red is 1/6, then find value of X?",
        answers : [
                {text : "4", correct: true},
                {text : "6", correct: false},
                {text : "8", correct: false},
                {text : "10", correct: false}
        ] 
    } */
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
