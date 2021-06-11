// Initiialize Player score and time
var score = 0;
var HighScore = [{'score': 3, 'player':'test1'}, {'score': 2, 'player':'test2'}, {'score': 1, 'player':'test3'}];
var highscoreNew = JSON.parse(localStorage.getItem("highScores")) || HighScore;
// console.log(`${HighScore[0].score} by ${HighScore[0].player}`);
var seconds=30;
var timer;
var levelValue = 1;

// localStorage.setItem("highScores", JSON.stringify(HighScore));
document.getElementById('tvalue').innerHTML = seconds;
// console.log(document.getElementById('tvalue').innerHTML);

// Identify DOM elements
const scoreText = document.getElementsByClassName('svalue');
const scoreBar = document.getElementById('scorebar');
const targetWord = document.getElementsByClassName('enemyName');
const highscoreModal = document.getElementById('highscore');
const playerNameprompt = document.getElementById('nameinput');
const playerNameArea = document.getElementById('nameInput'); //Capital I is for the area
const overlay = document.getElementById('overlay');
const currentscore = document.getElementById('currentscore');
const inputText = document.getElementById('inputText');
const level = document.getElementsByClassName('levelCount');

var hscore1 = document.getElementById('score1');
var hscore2 = document.getElementById('score2');
var hscore3 = document.getElementById('score3');

var hplayer1 = document.getElementById('user1');
var hplayer2 = document.getElementById('user2');
var hplayer3 = document.getElementById('user3');
// console.log(inputText);
// console.log(currentscore.innerText);
// updateHighscore();

//Show a random word from wordlist
const wordlistLength = wordlist.length;
changeWord();
markProgress();

// Check for key presses
var wordMatch=false; //Test to see if work types matches the 'enemy' name

inputText.addEventListener('keyup', function (e) {
    searchstring = inputText.value;
    console.log(searchstring);
    matchWord(searchstring);
    setTimer();
});

function matchWord(searchstring) {
    lower_searchstring = searchstring.toLowerCase();

    if (lower_searchstring == targetWord[0].innerText.toLowerCase() && seconds > 0) {
        console.log("success!");
        wordMatch = true;
        updateScore();
        changeWord();
        inputText.value = '';
        markProgress();
    }

}

function updateScore() {
    score = score + 1;
    wordMatch=false;
    scoreText[0].innerText = score;
}

function changeWord() {
    index = Math.floor(Math.random()*wordlistLength);
    targetWord[0].innerText = wordlist[index];
}

function setTimer() {
    if(!timer) {
        timer = window.setInterval(function() { 
            updateTimer();
        }, 1000); // every second
    }
}

function updateTimer() {
    if(seconds < 60) { // I want it to say 1:00, not 60
      document.getElementById('tvalue').innerHTML = seconds;
    }
    if (seconds > 0 ) { // so it doesn't go to -1
       seconds--;
    } else {
       clearInterval(timer);
       testHighscore();
       updateHighscore();
    //    alert("Your score is "+score);
       inputText.disabled = true;
    }
}

function resetTimer() {
    // reset score
    score = 0;
    scoreText[0].innerText = score;
    
    // reset time
    timer=false;
    seconds = 30;
    document.getElementById('tvalue').innerHTML = seconds;
    setTimer();
    
    // reset ProgressBar
    markProgress();
    
    // reset input area
    inputText.disabled = false;
    inputText.value = '';
}

function testHighscore(){
    for (k=0; k < 3; k++) {
        if (score > highscoreNew[k].score) {
            playerName = prompt("High score! What's your name?")
            var newEntry = {'score': score, 'player':playerName};
            highscoreNew.splice(k, 0, newEntry);
            currentscore.innerHTML = "New High Score! Your score is " + score;
            localStorage.setItem("highScores", JSON.stringify(highscoreNew));
            // playerNameprompt.style.display = "block";
            break;
        } else {
            currentscore.innerHTML = `Your score is ${score}. Try again?`;
        }
    }
}

function updateHighscore(){    
    hscore1.innerHTML = highscoreNew[0].score;
    hscore2.innerHTML = highscoreNew[1].score;
    hscore3.innerHTML = highscoreNew[2].score;
    
    hplayer1.innerHTML = highscoreNew[0].player;
    hplayer2.innerHTML = highscoreNew[1].player;
    hplayer3.innerHTML = highscoreNew[2].player;
    // console.log(HighScore);

    highscoreModal.style.display = "block";
    overlay.style.display = "block";
}

// Update progress bar based on score - jQuery
function markProgress(){
    console.log(score);
    progressbarwidth = (score % 10) * 10;
    
    if(score % 10 || score == 0){
        $(".progress-bar").css("width", progressbarwidth + "%");
    } else {
        $(".progress-bar").css("width", "100%");
        levelValue = levelValue + 1;
        level = levelValue;
    }
    // Wait for sometime before running this script again
}

// var inputNameValue;

// playerNameArea.addEventListener('keyup', function(e) {
//     inputNameValue = e.target.value;
//     //listens for you to press the ENTER key, at which point your web address will change to the one you have input in the search box
//     if (e.keyCode == 13) {
//        inputNameValue;
//     }
// })

// Remove highscore overlay
overlay.addEventListener('click', function() {
    playerNameprompt.style.display = "none";
    highscoreModal.style.display = "none";
    overlay.style.display = "none";
})