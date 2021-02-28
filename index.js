//get the elements we need
const form = document.getElementsByTagName("form")[0];
const maxGuesses = 3
//create a variable that will store the letters guessed into an array
let guessedLetters = []
//another variable to compare it to the actual random word
let guessingWord = []
//the random word generated 
let wordToMatch;
//number of guesses remaining 
let numberOfGuesses;
//set the game
resetGame();

form.addEventListener("submit",function(e){
    e.preventDefault();
    //get the input
    let input = this.children[0],
    //save the value of the input
    savedInput = input.value;
    //set the input value to be an empty string 
    input.value = "";
    //call the function that check the input
    checkForLetter(savedInput)
});

// Game Functions/logic
// Check if letter is in the word 
function checkForLetter(letter) {
    //set it to false and change it if its true later 
    let foundLetter = false;
    // Search string for letter, iterate through the string 
    for (let i = 0, j = wordToMatch.length; i < j; i++) {
        //if the letter is in a letter in the word 
        if (letter === wordToMatch[i]) {
            //then set the letter into an array
            guessingWord[i] = letter
            //change to true
            foundLetter = true
            // if all the letters in the guessing word array matches random word join them
            if (guessingWord.join("") === wordToMatch) {
                //replace the innertext
                updateGame();
            }
        }
    }
    //write the checks if the letter is not in the word
    if (!foundLetter) {
        // if the letter guessed is incorrect and is not already on the list array
        if (!guessedLetters.includes(letter)) {
             // Add incorrect letter to guessed letter list
            guessedLetters.push(letter)
            // Decrement the number of remaining guesses
            numberOfGuesses--
        }
        //if its last guess allow to guess the word 
    
        //if we run out of guesses display the word
        if (numberOfGuesses === 0) {
            // Display word before reseting game
            guessingWord = wordToMatch.split()     
        }
    }
    updateGame()
}

function resetGame() {
    //reset the number of guesses to be the max guesses
    numberOfGuesses = maxGuesses

    // Get a new word by calling the function 
    wordToMatch = getRandomWord();
    // Reset the two word arrays
    guessedLetters = []
    guessingWord = []
    // Reset the guessed word
    for (var i=0, j=wordToMatch.length; i < j; i++){
        guessingWord.push(" _ ")
    }
    // Update the game 
    updateGame()
}

function updateGame() {
    document.getElementById("currentWord").innerText = guessingWord.join("")
    document.getElementById("remainingGuesses").innerText = numberOfGuesses
    document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
};
