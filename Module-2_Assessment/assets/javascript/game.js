
var acwords = ["BLATHERS","TOMNOOK","GULLIVER","FLICK","REDD","LEIF","ISABELLE","CELESTE","DAISYMAE"];
var totalGuesses = 8; //number of tries
var userGuesses = []   //letters guessed by user
var wordpick;          //what word will be chosen by computer
var wordGuessed = []   //word that is being built
var guessesLeft = 0;   //how many more attempts the user gets
var finishedGame = false; //will allow for restart
var wins = 0;           //wins
var losses = 0;         //losses

//audio keypress, win, loss
var keypress = new Audio('./assets/sounds/key.mp3');
var winsound = new Audio('./assets/sounds/win.mp3');
var losesound = new Audio('./assets/sounds/loss.mp3');

//start the game
function startGame () {
    guessesLeft = totalGuesses;

    //choose random index which will determine word
    wordpick = Math.floor(Math.random() * (acwords.length));

    //will place picture based on what word is chosen

    if (acwords[wordpick] == acwords[0])
        $('.acpic').html("<img src='assets/images/blathers.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[1]) {
        $('.acpic').html("<img src='assets/images/tomnook.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[2]) {
        $('.acpic').html("<img src='assets/images/gulliver.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[3]) {
        $('.acpic').html("<img src='assets/images/fl{ck.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[4]) {
        $('.acpic').html("<img src='assets/images/redd.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[5]) {
        $('.acpic').html("<img src='assets/images/leif.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[6]) {
        $('.acpic').html("<img src='assets/images/isabelle.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[7]) {
        $('.acpic').html("<img src='assets/images/celeste.png' width='250'/>");
    }else if(acwords[wordpick] == acwords[8]) {
        $('.acpic').html("<img src='assets/images/daisymae.png' width='250'/>");
    }else($('.acpic').text('none'));

    userGuesses =[];
    wordGuessed =[];

    //start guessing word with blanks
    for (var i = 0; i < acwords[wordpick].length, i++) {
        wordGuessed.push("_");
    }

    //win, lose, try again
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("youwin").style.cssText = "display: none";

    refreshscreen();
};

//update display on HTML
function refreshscreen() {
    document.getElementById("gamewins").innertext = wins;
    document.getElementById("gamelosses").innertext = losses;

    var guessing = "";
    for (var i=0;i<wordGuessed.length; i++) {
        guessing += wordGuessed[i];
    }

    //update what was entered - guesses, word, letters
    document.getElementById("currentword").innertext = guessing;
    document.getElementById("guessesLeft").innertext = guessesLeft;
    document.getElementById("userGuesses").innertext = userGuesses;
};
//compare letter entered and word
function evaluateguess(letter) {
    var positions = [];

    for (var i = 0; i < acnames[wordpick].length; i++) {
        if (acwords[wordpick][i] === letter) {
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

//check if word was guessed
function didyouwin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin").style.csstext = "display: block";
        document.getElementById("presskeytryagain").style.csstext = "display: block";
        winsound.play()
        wins++;
        finishedGame = true;
    }
};

//run out of guesses
function didyoulose() {
    if(guessesLeft <= 0) {
        document.getElementById("gameover").style.csstext = "display:block";
        document.getElementById("presskeytryagain").style.csstext = "display:block";
        losesound.play()
        losses++;
        finishedGame = true;
    }
}
//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        if(userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateguess(letter);
        }
    }
};

//Event listener
document.onkeydown = function(event) {
    //restart game when done
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        //check if letter was pressed
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keypress.play()
            makeGuess(event.key.toUpperCase());
            refreshscreen();
            didyouwin();
            didyoulose();
        }
    }
};
    
