var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var startScreen = document.getElementById('start-screen')
var endScreen =document.getElementById('end-screen')
var finalScore = document.getElementById('final-score')
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

 //array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0


var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');




var setTime = function () {
    timeleft = 75;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}



startBtn.addEventListener("click", startGame);


function startGame() {
    startScreen.classList.add('hide');
    startScreen.classList.remove('show');
    questionsEl.classList.remove('hide');
    questionsEl.classList.add('show');
  
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

var setQuestion = function() {
    resetAnswers();
    displayQuestion(arrayShuffledQuestions[QuestionIndex]);
}


var resetAnswers = function() {
    while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild)
    };
};


var displayQuestion = function(index) {
    
    choicesEl.innerText = index.choices
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i]
        answerbutton.classList.add('btn')
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click", answerCheck)
        choicesEl.appendChild(answerbutton)
        }
    
    };

    var answerCheck = function(event) {
        var selectedAnswer = event.target
        feedbackEl.classList.remove('hide');
            if (arrayShuffledQuestions[QuestionIndex].answer === selectedAnswer.innerText){
                feedbackEl.innerText = "CORRECT!"
                score = score + 5
            }

            else {
              feedbackEl.innerText = "INCORRECT"
              score = score - 1;
              timeleft = timeleft - 10;
          }

        

        QuestionIndex++
        if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }   
        else {
           gameover = "true";
           showScore();
            }

        };
      
        var showScore = function () {
            questionsEl.classList.add("hide");
            endScreen.classList.remove("hide");
            endScreen.classList.add("show");
    
            var scoreDisplay = document.createElement("p");
            scoreDisplay.innerText = (score + "!");
            finalScore.appendChild(scoreDisplay);
        }       
        
        //create high score values
        var createScore = function(event) { 
            event.preventDefault() 
            var initials = document.querySelector("#initials").value;
            if (!initials) {
              alert("Enter your intials!");
              return;
            }
        }

        initialsEl.reset();

        var highScore = {
            initials: initials,
            score: score
        }

        initialsEl.addEventListener("submit", createScore)