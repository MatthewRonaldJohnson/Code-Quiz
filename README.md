# Code-Quiz
Homework #4 Code Quiz

Goal: Make a quiz game website using HTML, CSS, and Javascript. The page should store high scores that persits between session using local storage. 

The deployed webpage can be found [here](https://matthewronaldjohnson.github.io/Code-Quiz/).

## Funactionality
Upon loading the page the user will see

![welcome card](./assets/img/welcome-card.png)

From here the user can click on the High Scores button to view stored High Scores or the Start button to begin the game.

![question card](./assets/img/questions-card.png)

Question are presented as such (some questions have 4 options and some are True/False). The user will click on what they believe the correct answer is and the page will present the next question. When presenting the next question the page will add a footer to question for 1 second displaying the result of the previous question. If the user misses a question 5 secodns will be subtracted from their timer.

During the quiz the high scores button is disable to prevent exiting the quiz.

![question card w/ result](./assets/img/questions-card-result.png)

Once all questions are answered or the timer runs out, the results screeen will display.

![results card](./assets/img/results-card.png)

Here the user can submit their initials to have their score saved and be taken to the leaderboard. If they do not wish to they can use the high score link to bypass this section. 

![high scores card](./assets/img/high-scores-card.png)

High Scores are displayed highest to lowest (in case of a tie the older score keeps the higher spot). Only the top 5 scores recorded will be displayed. (If score was submitted without initials an emoji from a list is randomly selected as a placeholder.)

From here the user can use the go back button to return to the start screen or the reset scores screen to clear the high score leaderboard. 

## Resources
Stackoverflow post on shuffling arrays [link](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

JavaScript Tutorial page on removing child nodes [link](https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/)

MDN Doc on forEach() method for arrays [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

MDN Doc on sort method for arrays [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)