var startButton = document.getElementById("start-button");
var welcomeCard = document.getElementById("welcome");
var questionCard = document.getElementById("question");
var timeLeft = 100;
var questionsLeft = 1;
var score = 0;
var clock; // will later be defined as a setInterval, want it on global scale so i can clearInterval outside of the function it lives in
var answersList = document.getElementById("answers")

//when a click is heard on the start button, the welcome card disappears and the question card is displayed
startButton.addEventListener("click", function(){
    welcomeCard.style.display = "none";
    questionCard.style.display = "block";
    stopWatch();
    populateQuestion();
})

function stopWatch() {
    clock = setInterval(function() {
        timeLeft--;
        var timer = document.getElementById("timer");
        timer.textContent = "Timer: " + timeLeft; //This line doesn't work and idk why
        if(timeLeft <= 0){
            clearInterval(clock);
        }
    }, 1000)
}

function populateQuestion() {
    questionsLeft--;
    questionCard.firstElementChild.textContent = "My Question Will Go Here";
    answersList.children[0].textContent = "A";
    answersList.children[1].textContent = "B";
    answersList.children[2].textContent = "C";
    answersList.children[3].textContent = "D";
}