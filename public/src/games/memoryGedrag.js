// Turns the card around
function turnCard(card) {
    const back = card.firstElementChild;
    const front = card.lastElementChild;

    if (back.style.display === "none") {
        back.style.display = "inline";
        front.style.display = "none";
    } else {
        back.style.display = "none";
        front.style.display = "inline";
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
    let count = 0;
    for (let i = 0 ; i < cardNamesArray.length ; i++) {

        frontCards[count].src = "../../assets/images/gamesImages/memory/" + cardNamesArray[count];
        // hide the front for all the cards
        turnToBack(game[count]);
        count += 1;
    }
}
