let turnedCardsCount = 0;
let turnedCards = [];
let matchedCards = 0;
const totalPlayingCardMatches = 6;

// Turns the card around
function turnCard(card) {
    const back = card.firstElementChild;
    const front = card.lastElementChild;
    let classNameFront = front.className;

    // Turn the clicked card when there are less than two cards turned
    // and it isn't a matched card
    if (turnedCardsCount < 2 && classNameFront !== "card front matched"){
        if (back.style.display === "none") {
            back.style.display = "inline";
            front.style.display = "none";
            turnedCards.push(card);
            // Subtract a card of the amount of turned cards
            turnedCardsCount -= 1;
        } else {
            back.style.display = "none";
            front.style.display = "inline";
            // Add the card to the array
            turnedCards.push(card);
            // Add a card of the amount of to the turned cards
            turnedCardsCount += 1;
        }
    }

    // When two cards are selected they are automatically turned after two seconds
    if (turnedCardsCount === 2){

        if (turnedCards[0].lastElementChild.src === turnedCards[1].lastElementChild.src){
            // Make the cards invisible
            turnedCards[0].lastElementChild.className = "card front matched";
            turnedCards[1].lastElementChild.className = "card front matched";

            turnedCards = [];
            turnedCardsCount = 0;
            matchedCards += 1;
        }else {
            const timeToWait = 1500; // 1500ms = 1,5 seconds
            setTimeout(function(){
                turnedCards.forEach(card => turnToBack(card));
                turnedCards = [];
                turnedCardsCount = 0;
            }, timeToWait);
        }
    }

    console.log(totalPlayingCardMatches + " " + matchedCards);
    // See werther all the cards are matched
    if (matchedCards === totalPlayingCardMatches){
        const winScreen = document.getElementById("winScreen");
        winScreen.style.display = "block";
        matchedCards = 0;
    }
}

// shows the back of a card
function turnToBack(card) {
    const back = card.firstElementChild;
    const front = card.lastElementChild;

    back.style.display = "inline";
    front.style.display = "none";
}

// Generate random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// List of playing card names
const cardList = ["Kaarten_Eiffeltoren.jpg", "Kaarten_Sagrada_familia.jpg", "Kaarten_Sydney_opera_house.jpg", "Atomium.jpg", "Pyramids_of_Giza.jpg", "Tower_of_Pisa.jpg"];

//@https://bost.ocks.org/mike/shuffle/ <-- Source of this function
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// shuffles the cards and places them on the page
function shuffleCards() {
    const choiceCount = cardList.length;
    const cardCouples = 6;
    let numberList = [];

    // The win screen
    let winScreen = document.getElementById("winScreen");
    // Hide winning screen
    if (winScreen.style.display === "block") {
        winScreen.style.display = "none";
    }

    // Form an array with the amount of choices
    for (let n = 0; numberList.length < choiceCount; n++) {
        numberList.push(n);
    }
    // Shuffle these numbers to get a random first 6 numbers
    numberList = shuffle(numberList);
    // Take the first 6 numbers, double them and shuffle again
    numberList = numberList.splice(numberList.length - cardCouples);
    numberList = shuffle(numberList.concat(numberList));

    // Replace the indexes of the cards with the filenames
    let realCards = [];
    for (let n = 0; n < numberList.length ; n++) {
        realCards[n] = cardList[numberList[n]];
    }
    placeCards(realCards);
}

// Replace the fronts of the cards with cards in the array
function placeCards (cardNamesArray) {
    let frontCards = document.getElementsByClassName("card front");
    let game = document.getElementById("Game").children;
    let card = document.getElementsByClassName("cardHolder");
    let count = 0;
    for (let i = 0 ; i < cardNamesArray.length ; i++) {

        frontCards[count].src = "../../../assets/images/gamesImages/memory/" + cardNamesArray[count];
        // Set the class name to "card front" for a restart
        frontCards[count].className = "card front";
        // hide the front for all the cards
        turnToBack(game[count]);
        count += 1;
    }
}
