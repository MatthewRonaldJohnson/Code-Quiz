var $startButton = document.getElementById("start-button");
var $welcomeCard = document.getElementById("welcomeCard");
var $questionCard = document.getElementById("questionCard");
var $resultsCard = document.getElementById("resultsCard");
var $highScoreCard = document.getElementById("highScoreCard");
var $optionsList = document.getElementById("options");
var $prevResult = document.getElementById("prevResult");
var $leaderBoard = document.getElementById("leaderBoard");
var $highScoreLink = document.getElementById("highScoreLink");
var currentQuestion = 0;
var score = 0;
var clock; // will later be defined as a setInterval, want it on global scale so i can clearInterval outside of the function it lives in
var timeLeft = 100;
var highScores = JSON.parse(localStorage.getItem("highScoresArray")) || []; // sets highScores to what is saved in local storage, if nothing is in local storage, set it to store an empty array

var emojiBank = ["😷", "😍", "🤑", "🥵", "🤠", "🧐", "🥶", "😎", "👻", "👾", "🤖"];
//stores questions, correct answers, and multiple choice options 
//options array will be shuffled before before being presented so keeping the corrct answer at index 0 each time is fine 
//options array can contain as many options as you want (generally 4)
var bank = [
  {
    question: "Q1",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q2",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q3",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q4",
    answer: "answer",
    options: ["answer", "wrong", "wrong"]
  },
  {
    question: "Q5",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q6",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q7",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q8",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  },
  {
    question: "Q9",
    answer: "answer",
    options: ["answer", "wrong", "wrong"]
  },
  {
    question: "Q10",
    answer: "answer",
    options: ["answer", "wrong", "wrong", "wrong"]
  }
] 

//sets up the click ability of the submit button that is hidden until we reach the results card
document.getElementById("submit-button").addEventListener("click", function () {
    addHighScore(document.getElementById("initials").value);
    showHighScores();
  });

//sets up click ability on multiple choice sections that is hidden until we reach the questions card
//if statement before ensures we only do something if you click on a li in the list 
$optionsList.addEventListener("click", function(event){
    var element = event.target;

    if (element.matches("li")){
      checkAnswer(element)
    }
  })

//when a click is heard on the start button, the welcome card disappears and the question card is displayed
$startButton.addEventListener("click", function () {
  $welcomeCard.style.display = "none";
  $questionCard.style.display = "block";
  stopWatch();
  populateQuestion();
});

$highScoreLink.addEventListener("click", showHighScores);

function stopWatch() {
  clock = setInterval(function () {
    timeLeft--;
    var timer = document.getElementById("timer");
    timer.textContent = "Timer: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(clock);
      showResults();
    }
  }, 1000);
}

function populateQuestion() {
  //populates question
  $questionCard.firstElementChild.textContent = bank[currentQuestion].question;
  //shuffle the options array
  var currentOptions = shuffle(bank[currentQuestion].options);
  //populate the options (create li element, append to $optionsList)
  currentOptions.forEach(function(i){
    var $li = document.createElement("li");
    $li.textContent = i;
    $optionsList.appendChild($li);
  })
}

function checkAnswer(event){
  removeChildren($optionsList); //removes the previous lis created for last question
  if (event.textContent === bank[currentQuestion].answer){
    correctAnswer();
  } else {
    incorrectAnswer();
  }
}

function correctAnswer() {
  score++;
  $prevResult.textContent = "Correct";
  $prevResult.style.display = "block";
  $prevResult.style.backgroundColor = "#79E862"
  setTimeout(function () {
    $prevResult.style.display = "none";
  }, 1000);
  nextQuestion();
}

function incorrectAnswer() {
  timeLeft -= 5;
  $prevResult.textContent = "Incorrect";
  $prevResult.style.display = "block";
  $prevResult.style.backgroundColor = "#F05048"
  setTimeout(function () {
    $prevResult.style.display = "none";
  }, 1000);
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion === bank.length) {
    showResults();
  } else {
    populateQuestion();
  }
}

function showResults() {
  clearInterval(clock);
  $questionCard.style.display = "none";
  $resultsCard.style.display = "block";
  document.getElementById("resultsDesc").textContent =
    "You got " + score + " of " + bank.length + " correct!";
}

function addHighScore(name){
    if (name === "") {
        name = emojiBank[(Math.floor(Math.random()*emojiBank.length))]; //if no name given, give random emoji
      }
    var newScore = {initials: name.slice(0,3), score}
    highScores.push(newScore);
    highScores.sort(function(a,b){
      return b.score - a.score;
    })
    localStorage.setItem("highScoresArray", JSON.stringify(highScores))
}

function showHighScores(burrito) {
  $leaderBoard.innerHTML = "";
  highScores = highScores.slice(0,5); //limits leaderboard to 5 entries 
  highScores.forEach(function(i){
    var placeholder = document.createElement("li");
    placeholder.textContent = i.initials + " " + i.score;
    $leaderBoard.appendChild(placeholder);
  })
  $welcomeCard.style.display = "none"; //hides all other displays as you can reach high scores screen from anywhere
  $resultsCard.style.display = "none";
  $questionCard.style.display = "none";
  removeChildren($optionsList); //clears out options list in case you opened high scores during a question
  clearInterval(clock);
  $highScoreCard.style.display = "block";
  document.getElementById("goBack-button").addEventListener("click", welcomeScreen);
  document.getElementById("reset-button").addEventListener("click", resetScores);
}

function welcomeScreen(){
    $highScoreCard.style.display = "none";
    $welcomeCard.style.display = "block";
    timeLeft = 100;
    currentQuestion = 0;
    score = 0;
}

function resetScores(){
    $leaderBoard.innerHTML = "";
    highScores.length = 0;
    localStorage.setItem("highScoresArray", JSON.stringify(highScores));
}

//function gotten from JavaScript Tutorial page linked in resources
function removeChildren(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

//function taken from stackoverflow page linked in resources 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}