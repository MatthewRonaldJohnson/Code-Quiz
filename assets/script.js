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

//stores questions, correct answers, and multiple choice options 
var bank = [
  {
    question: "Q1",
    answer: "answer1",
    options: ["answer1", "x", "x", "x"]
  },
  {
    question: "Q2",
    answer: "answer2",
    options: ["x", "answer2", "x", "x"]
  },
  {
    question: "Q3",
    answer: "answer3",
    options: ["answer3", "x", "x", "x"]
  },
  {
    question: "Q4",
    answer: "answer4",
    options: ["answer4", "x", "x", "x"]
  },
  {
    question: "Q5",
    answer: "answer5",
    options: ["x", "answer5", "x", "x"]
  }
] 

//sets up the click ability of the submit button that is hidden until we reach the results card
document.getElementById("submit-button").addEventListener("click", function () {
    addHighScore(document.getElementById("initials").value);
    showHighScores();
  });

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
      console.log("times up");
      showResults();
    }
  }, 1000);
}

function populateQuestion() {
  //populates question
  $questionCard.firstElementChild.textContent = bank[currentQuestion].question;
  //shuffle the options array
  //populate the options (create li element, append to $optionsList)
  bank[currentQuestion].options.forEach(function(i){
    var $li = document.createElement("li");
    $li.textContent = i;
    $optionsList.appendChild($li);
  })
  //single evenet listener on entire $optionslist
  $optionsList.addEventListener("click", function(event){
    console.log("click")
    var element = event.target;

    if (element.matches("li")){
      checkAnswer(element)
    }
  })
  //logic to call checkAnswer if click on a li


  // $optionsList.children[0].textContent = bank[currentQuestion].options[0];
  // $optionsList.children[1].textContent = bank[currentQuestion].options[1];
  // $optionsList.children[2].textContent = bank[currentQuestion].options[2];
  // $optionsList.children[3].textContent = bank[currentQuestion].options[3];
  // $optionsList.children[0].addEventListener("click", checkAnswer);
  // $optionsList.children[1].addEventListener("click", checkAnswer);
  // $optionsList.children[2].addEventListener("click", checkAnswer);
  // $optionsList.children[3].addEventListener("click", checkAnswer);
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

function addHighScore(burrito){
    if (burrito === "") {
        burrito = "🐱‍👤"; //if no name given, use ninja emoji (sometimes it shows as a cat instead?)
      }
    var newScore = {initials: burrito.slice(0,3), score}
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
  $welcomeCard.style.display = "none";
  $resultsCard.style.display = "none";
  $questionCard.style.display = "none";
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

function removeChildren(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}