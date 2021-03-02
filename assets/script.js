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

var questionBank = [
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "Q5",
  "Q6",
  "Q7",
  "Q8",
  "Q9",
  "Q10",
];
var answerBank = [
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
  ["right", "wrong", "wrong", "wrong"],
];

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
    }
  }, 1000);
}

function populateQuestion() {
  $questionCard.firstElementChild.textContent = questionBank[currentQuestion];
  $optionsList.children[0].textContent = answerBank[currentQuestion][0];
  $optionsList.children[1].textContent = answerBank[currentQuestion][1];
  $optionsList.children[2].textContent = answerBank[currentQuestion][2];
  $optionsList.children[3].textContent = answerBank[currentQuestion][3];
  $optionsList.children[0].addEventListener("click", correctAnswer);
  $optionsList.children[1].addEventListener("click", incorrectAnswer);
  $optionsList.children[2].addEventListener("click", incorrectAnswer);
  $optionsList.children[3].addEventListener("click", incorrectAnswer);
}

function correctAnswer() {
  score++;
  $prevResult.textContent = "Correct";
  $prevResult.style.display = "block";
  setTimeout(function () {
    $prevResult.style.display = "none";
  }, 1000);
  nextQuestion();
}

function incorrectAnswer() {
  timeLeft -= 5;
  $prevResult.textContent = "Incorrect";
  $prevResult.style.display = "block";
  setTimeout(function () {
    $prevResult.style.display = "none";
  }, 1000);
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion === questionBank.length) {
    showResults();
  } else {
    populateQuestion();
  }
}

// function clearEventListeners(){
//   $optionsList.children[0].removeEventListener("click", correctAnswer)
//   $optionsList.children[1].removeEventListener("click", incorrectAnswer)
//   $optionsList.children[2].removeEventListener("click", incorrectAnswer)
//   $optionsList.children[3].removeEventListener("click", incorrectAnswer)
// }

function showResults() {
  clearInterval(clock);
  $questionCard.style.display = "none";
  $resultsCard.style.display = "block";
  document.getElementById("resultsDesc").textContent =
    "You got " + score + " of " + questionBank.length + " correct!";
  document.getElementById("submit-button").addEventListener("click", function () {
      addHighScore(document.getElementById("initials").value);
      showHighScores();
    });
}

function addHighScore(burrito){
    if (burrito === "") {
        burrito = "🐱‍👤"; //if no name given, use ninja emoji
      }
    newScore = document.createElement("li");
    newScore.textContent = burrito + " " + score;
    $leaderBoard.append(newScore);
}

function showHighScores(burrito) {
  $welcomeCard.style.display = "none";
  $resultsCard.style.display = "none";
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
    while ($leaderBoard.firstChild){
        $leaderBoard.removeChild($leaderBoard.firstChild);
    }
}