const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord, correctLetters , wrongGuessCount ;
const maxGuesses = 6;

const resestGame = () => {
    //on clicking play again resetting game variables and UI elements
    correctLetters =[];
    wrongGuessCount = 0;
    hangmanImage.src = `assets/hangman-${wrongGuessCount}.svg`        
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");

}

const getRandomWord = () => {
    //Random word and hint from wordList 
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resestGame();
    // wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) => {
    //showing modal with  relevant details after 300ms of game complete
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `assets/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame  = (button , clickedLetter) => {
    // console.log(button, clickedLetter);
    if(currentWord.includes(clickedLetter)) {
        // console.log(clickedLetter, "exists in the word")
        //Showing correct letters on screen
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
            // console.log(clickedLetter, "doesn't exist in the word")
            //updating wrongGuessCount and hangman image if clicked letter doesnt exist
            wrongGuessCount++;
            hangmanImage.src = `assets/hangman-${wrongGuessCount}.svg`        
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

//call gameOver func if any cond meets

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//Keyboard buttons
for (let i = 97; i<=122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target , String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
