var currentQuestionIndex = 0;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initialsform');
var feedbackEl = document.getElementById('feedback');
var startScreen = document.getElementById('start-screen');
var endScreen =document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var listHighScores = document.getElementById('highscores');


var score = 0;
var timeleft;
var gameover



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
    questionsEl.innerHTML = index.title
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i]
        answerbutton.classList.add('btn')
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click", answerCheck)
        choicesEl.appendChild(answerbutton)
        }
    questionsEl.appendChild(choicesEl)
    };
    // propagate event listener. use google
    var answerCheck = function(event) {
        var selectedAnswer = event.target
        feedbackEl.classList.remove('hide');
            if (arrayShuffledQuestions[QuestionIndex].answer === selectedAnswer.innerText){
                feedbackEl.innerText = "CORRECT!"
                score = score + 5
                sfxRight.play();
            }

            else {
              feedbackEl.innerText = "INCORRECT"
              score = score - 1;
              timeleft = timeleft - 10;
              sfxWrong.play();
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
              alert("Enter your initials!");
              return;
            }
        

        var HighScore = {
        initials: initials,
        score: score
        } 

    
         
        HighScores.push(HighScore);
        HighScores.sort((a, b) => {return b.score-a.score});

       

        for (var i = 0; i < HighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "listscores";
            highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
            //listHighScores.appendChild(highscoreEl);
        }
      
            saveHighScore();

        }
      
        var saveHighScore = function () {
                localStorage.setItem("HighScores", JSON.stringify(HighScores))
        }
        
            //load values/ called on page load
            var loadHighScore = function () {
                var LoadedHighScores = localStorage.getItem("HighScores")
                    if (!LoadedHighScores) {
                    return false;
                }
    
            LoadedHighScores = JSON.parse(LoadedHighScores);
            LoadedHighScores.sort((a, b) => {return b.score-a.score})
     
    
            for (var i = 0; i < LoadedHighScores.length; i++) {
                var highscoreEl = document.createElement("li");
                highscoreEl.ClassName = "listscores";
                highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
                //listHighScores.appendChild(highscoreEl);
                HighScores.push(LoadedHighScores[i]);
            
        }



    }
    loadHighScore();

        initialsEl.addEventListener("submit", createScore)
        startBtn.addEventListener("click", startGame);
       
