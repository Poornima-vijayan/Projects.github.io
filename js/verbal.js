const question =[
    {
        question : "Statement: Numbers of students qualified for IITs from state X are comparatively higher than the number of students from state Y. Which of the following may indicate that the result of the state Y is not in line with the general trend?  ",
        answers : [
                {text : "The students of state X are qualitatively better than those of the State Y", correct: false},
                {text : "The school curriculum of state Y is very tough", correct: false},
                {text : "In the past years the share of seats in IITs from state Y were always remained high.", correct: true},
                {text : "Only 1 and 2", correct: false}
        ]
    },

    {
        question : " Statement: Now a day most of the candidates recruited in private companies are directly hired from campuses of various business schools and engineering colleges. Which of the following substantiates the fact stated in the above statement? ",
        answers : [
                {text : "Most of the bright students only preferred campus interview.", correct: false},
                {text : "Now campus interview becomes a trend in hiring process in the private companies", correct: true},
                {text : "Campus interview is the only process to hire talented people", correct: false},
                {text : "Both 1 and 2", correct: false}
        ] 
    },

    {
        question : " Statement: The prices of the onion and other vegetables have substantially increased due to the prolonged drought situation in some part and heavy downpour in some other part of the country during the monsoon season. Which of the following could be a logical course of action to be pursued? ",
        answers : [
                {text : "The government should set up a committee to review the alarming situation ", correct: false},
                {text : "The government should ban on the export of the onion and vegetables", correct: false},
                {text : "Government should import onion and vegetables in adequate amount ", correct: false},
                {text : " Only 1 and 3", correct: true}
        ] 
    },

    {
        question : "Statement: Due to oversupply in global markets, a slump in demand, and OPEC countries’ decision not to curb production, crude oil prices have fallen to a four-year low. Which of the following may be an effect of the above cause? ",
        answers : [
                {text : "Urban People will buy more vehicle as prices of the fuels has fallen.", correct: false},
                {text : "The fall in international oil prices will reduce subsidies that help sustain the domestic prices of oil products", correct: false},
                {text : "Country’s current account deficit will substantially reduce.", correct: false},
                {text : "Both 2 and 3", correct: true}
        ] 
    },

    {
        question : "Statement: Crops acreage in India during the current year has fallen substantially as the encroachment of human habitats over the cropland has increased and this will lead to fall in the production of food grains and vegetables. Which of the following may be the effect of the above statement? ",
        answers : [
                {text : "The prices of food grains and other essential commodities may increase compared to previous years", correct: false},
                {text : "Government will import food grains in huge quantity from abroad", correct: false},
                {text : "Lack of investments in agricultural development has played a crucial role in this levelling of yield decrease. ", correct: false},
                {text : "Only 1 and 2", correct: true}
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
