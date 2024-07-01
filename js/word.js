const question =[
    {
        question : "12 men can do a piece of work in 6 days working 4 hours each day. Then in how many days 6 women can complete the same work working 8 hours a day if efficiency of 4 women can do the same work as single men ?  ",
        answers : [
                {text : "12 days", correct: false},
                {text : "16 days", correct: false},
                {text : "18 days", correct: false},
                {text : "24 days", correct: true}
        ]
    },

    {
        question : "Arjun can complete a work alone in 12 days and with the help Tanya in 8 days. Find the number of days Tanya need to complete 75% of the work. ",
        answers : [
                {text : "10 days", correct: false},
                {text : "12 days", correct: false},
                {text : "18 days", correct: true},
                {text : "36 days", correct: false}
        ] 
    },

    {
        question : "A two digit number when increase by 75% then its digits gets interchanged. If difference between both digits is 3 then find the original number? ",
        answers : [
                {text : "63", correct: false},
                {text : "58", correct: false},
                {text : "47", correct: false},
                {text : "36", correct: true}
        ] 
    },

    {
        question : "Sum of a two digit number and reverse of it is 22 times the difference of the digits of the number.Find the two digit number. ",
        answers : [
                {text : "26", correct: false},
                {text : "13", correct: false},
                {text : "39", correct: false},
                {text : "All of the above", correct: true}
        ] 
    },

    {
        question : "A bag contains X red balls & 5 green balls. If two balls taken out probability of being red is 1/6, then find value of X?",
        answers : [
                {text : "4", correct: true},
                {text : "6", correct: false},
                {text : "8", correct: false},
                {text : "10", correct: false}
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
