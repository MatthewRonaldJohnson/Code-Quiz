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
var emojiBank = ["😷", "😍", "🤑", "🥵", "🤠", "🧐", "🥶", "😎", "👻", "👾", "🤖"]; //used to grab a random character to store high scores when user does not give initials 

//stores questions, correct answers, and multiple choice options 
//options array will be shuffled before before being presented, except in the case of there only being 2 options (so that True/False questions can display in expected way)
//options array can contain as many options as you want (generally 4 or 2)
var bank = [
  {
    question: "Which three languages make up the backbone of the web?",
    answer: "HTML, CSS, Javascript",
    options: ["HTML, CSS, Javascript", "Markup, Java, Python", "C++, CSS, C#", "English, French, Spanish"]
  },
  {
    question: "What does CSS stand for",
    answer: "Cascading Style Sheets",
    options: ["Cascading Style Sheets", "Chip Set Super", "Computer Storage System", "Computed Style Segments"]
  },
  {
    question: "Which of these would you use to around an array in Javascript",
    answer: "[]",
    options: ["[]", "{}", "()", "<>"]
  },
  {
    question: "True or False: Javascript uses the exact same syntax as Java",
    answer: "False",
    options: ["True", "False"]
  },
  {
    question: "10 % 2 = ",
    answer: "0",
    options: ["0", "5", "20", "102"]
  },
  {
    question: "You can access the first item in an array with which peice of code?",
    answer: "array[0]",
    options: ["array[0]", "array[1]", "array.0", "array.1"]
  },
  {
    question: "Given arry['1','2','3'] : What would arry.length return",
    answer: "3",
    options: ["3", "2", "undefined", "4"]
  },
  {
    question: "What measurement of time do SetInterval() and setTimeout() use in their second argument?",
    answer: "miliseconds",
    options: ["miliseconds", "seconds", "minutes", "nanoseconds"]
  },
  {
    question: "True or False: DOM stands for Document Object Model.",
    answer: "True",
    options: ["True", "False"]
  },
  {
    question: "What is the difference between == and === operators?",
    answer: "== compares value but not data type, === compares both value and data type",
    options: ["== compares value but not data type, === compares both value and data type", "no difference", "== is the assignment operator, === is used for comparison", "=== is not a valid javascript operator"]
  }
] 
var shuffledBank; //on start bank with be shuffled and stored here for current quiz

//when a click is heard on the start button, the welcome card disappears and the question card is displayed
$startButton.addEventListener("click", function () {
  shuffledBank = shuffle(bank);
  startTimer();
  populateQuestion();
});

//sets up click ability on multiple choice sections that is hidden until we reach the questions card
//using event delegation, listens for the click event on entire list but only does something if the click is registered on a li
$optionsList.addEventListener("click", function(event){
  var element = event.target;
  if (element.matches("li")){
    checkAnswer(element)
  }
})

//sets up the click ability of the submit button that is hidden until we reach the results card
document.getElementById("submit-button").addEventListener("click", function () {
    addHighScore(document.getElementById("initials").value);
    showHighScores();
  });

//sets up click ability on high scores button 
$highScoreLink.addEventListener("click", showHighScores);

//begins countdown, if timeLeft reaches 0 before the interval is cleared it will end the game
function startTimer() {
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

//displays the welcome card and shows the questions card
//fills out current question based on the shuffled bank
//shuffles the options of that question (unless it is a True/False question), then presents them to the user
function populateQuestion() {
  $highScoreLink.disabled = true;
  $welcomeCard.style.display = "none";
  $questionCard.style.display = "block";
  $questionCard.firstElementChild.textContent = bank[currentQuestion].question;
  if(shuffledBank[currentQuestion].options.length === 2){
    var currentOptions = shuffledBank[currentQuestion].options;
  } else{
    var currentOptions = shuffle(shuffledBank[currentQuestion].options);
  }
  currentOptions.forEach(function(i){
    var $li = document.createElement("li");
    $li.textContent = i;
    $optionsList.appendChild($li);
  })
}

//removes previous options from questions ard
//compares what the user clicked on to the stored correct answer
function checkAnswer(event){
  $optionsList.innerHTML = ""; //removes the previous lis created for last question
  if (event.textContent === shuffledBank[currentQuestion].answer){
    correctAnswer();
  } else {
    incorrectAnswer();
  }
}


//after each answer on of these two functions will run, either incrementing the score or reducing the time left
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

//interates the currentQuestion and checks if the quiz is over
//if not populates the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion === shuffledBank.length) {
    showResults();
  } else {
    populateQuestion();
  }
}

//hides the question card and shows the results card, stops the timer, and reanbles the link to the high score page
function showResults() {
  $highScoreLink.disabled = false;
  clearInterval(clock);
  $questionCard.style.display = "none";
  $resultsCard.style.display = "block";
  document.getElementById("resultsDesc").textContent =
    "You got " + score + " of " + shuffledBank.length + " correct!";
}

//adds the new score (which is an object made up of initals as key and score as value) to the high scores array
//slices to only take in max of 3 characters for initials
//sorts the high score array, so that the highest scores have the lowest index
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

//clears out any list items currently on the leaderboard, slices the high score array to have only 5 items, then displays those starting with the lowest index
function showHighScores(burrito) {
  $leaderBoard.innerHTML = "";
  highScores = highScores.slice(0,5); //limits leaderboard to 5 entries 
  highScores.forEach(function(i){
    var placeholder = document.createElement("li");
    placeholder.textContent = i.initials + " " + i.score;
    $leaderBoard.appendChild(placeholder);
  })
  $welcomeCard.style.display = "none"; //hides both welcome and results cards as you can reach this card from either
  $resultsCard.style.display = "none";
  $highScoreCard.style.display = "block";
  document.getElementById("goBack-button").addEventListener("click", welcomeScreen);
  document.getElementById("reset-button").addEventListener("click", resetScores);
}

//resets the game pieces of timeLeft, currentQuestion, and score
function welcomeScreen(){
    $highScoreCard.style.display = "none";
    $welcomeCard.style.display = "block";
    timeLeft = 100;
    currentQuestion = 0;
    score = 0;
}

//clears out currently displayed leaderboard, highscores array, and the local storage 
function resetScores(){
    $leaderBoard.innerHTML = "";
    highScores.length = 0;
    localStorage.setItem("highScoresArray", JSON.stringify(highScores));
}

//function taken from stackoverflow page linked in resources 
function shuffle(array) {
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}