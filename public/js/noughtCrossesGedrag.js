// The boxes for the icons
const boxes = document.getElementsByClassName("box");

// Setting the start icon
let icon = "X";

// toggling between the icons
function toggle() {
    if (icon === "X") {
        icon = "O";
    } else {
        icon = "X";
    }
}

// Fill the clicked box with an icon
function setBox(box) {
    if (box.innerHTML === "") {
        box.innerHTML = icon;
        toggle();
    }
    checkForWinner();
}

// Combo's that win the game:
const winningArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Check board for a winning combo
function checkForWinner() {
    let xArray = [];
    let oArray = [];

    // create arrays of box numbers for Xs and Os
    for (let i = 0; i < 9; i++) {
        if ("" !== boxes[i].innerHTML) {
            if (boxes[i].innerHTML === "X") {
                xArray.push(parseInt(boxes[i].id));
            }
            if (boxes[i].innerHTML === "O") {
                oArray.push(parseInt(boxes[i].id));
            }
        }
    }

    // compare the arrays with the winning combinations
    const entryCount = xArray.length + oArray.length;
    for (let i = 0; i < 8; i++) {
        const winScreen = document.getElementById("winScreen");
        const winText = document.getElementById("winText");
        const maxEntries = 9; // The amount of entries when the game is full

        if (xArray.includes(winningArrays[i][0])) {
            if (xArray.includes(winningArrays[i][1])) {
                if (xArray.includes(winningArrays[i][2])) {
                    winScreen.style.display = "block";
                    winText.innerHTML = "X has won!";
                    break;
                }
            }
        } else if (oArray.includes(winningArrays[i][0])) {
            if (oArray.includes(winningArrays[i][1])) {
                if (oArray.includes(winningArrays[i][2])) {
                    winScreen.style.display = "block";
                    winText.innerHTML = "O has won!";
                    break;
                }
            }
        } 
        if (entryCount === maxEntries) {
            winScreen.style.display = "block";
            winText.innerHTML = "It's a draw!";
        }
    }
}

// Restart the game
function restartGame(game) {
    // The win screen
    let winScreen = document.getElementById("winScreen");
    // Empty the boxes
    for (let n = 0; n < 9; n++) {
        boxes[n].innerHTML = "";
    }
    // Hide winning screen
    if (winScreen.style.display === "block") {
        winScreen.style.display = "none";
    }
    // Set the starting icon to X
    icon = "X";
}