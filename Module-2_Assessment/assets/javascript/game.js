var acCharacters = ["BLATHERS","TOMNOOK","GULLIVER","FLICK","REDD","LEIF","ISABELLE","CELESTE","DAISYMAE"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // computer will choose which index is chosen
var wordGuessed = [];       // formed during guessing
var guessesLeft = 0;        // guesses left. self explanatory
var finishedGame = false;   // press any key to try again     
var wins = 0;               //wins
var losses = 0;             //losses
var key = new Audio('sounds/key.mp3');

// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the acCharacters array
    computerPick = Math.floor(Math.random() * (acCharacters.length));

    if(acCharacters[computerPick] == acCharacters[0]) {
        $('.clue').html("<img src='assets/images/blathers.png' width='300'/>");
    }else if(acCharacters[computerPick] == acCharacters[1]) {
        $('.clue').html("<img src='assets/images/tomnook.png' width='300'/>");
    }else if(acCharacters[computerPick] == acCharacters[2]) {
        $('.clue').html("<img src='assets/images/gulliver.png' width='300'/>");
    }else if(acCharacters[computerPick] == acCharacters[3]) {
        $('.clue').html("<img src='assets/images/flick.png' width='300'/>");
    }else if(acCharacters[computerPick] == acCharacters[4]) {
        $('.clue').html("<img src='assets/images/redd.png' width='300'/>");  
    }else if(acCharacters[computerPick] == acCharacters[5]) {
        $('.clue').html("<img src='assets/images/leif.png' width='300'/>");  
    }else if(acCharacters[computerPick] == acCharacters[6]) {
        $('.clue').html("<img src='assets/images/isabelle.png' width='300'/>");  
    }else if(acCharacters[computerPick] == acCharacters[7]) {
        $('.clue').html("<img src='assets/images/celeste.png' width='300'/>");  
    }else if(acCharacters[computerPick] == acCharacters[8]) {
        $('.clue').html("<img src='assets/images/daisymae.png' width='300'/>");                                     
    }else($('.clue').text('neither of these')); 

    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //start guessing the word using blanks
    for (var i = 0; i < acCharacters[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    //gamewin, gameover, title 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < acCharacters[computerPick].length; i++) {
        if(acCharacters[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
};

//check if the user is out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(finishedGame) {
        startGame();
        finishedGame = false;

    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            key.play();
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};
