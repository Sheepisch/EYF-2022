// board
const blockSize = 20;
const rows = 20;
const cols = 20;
const context = board.getContext('2d');

// snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

// snakebody
let snakeBody = [];

let gameOver = false;

window.onload = function() {
    const board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    placeFood();
    document.addEventListener("keydown", changeDirection);

    setInterval(update, 100);
}

function update() {
    if (gameOver) {
        return;
    }
    // fill the canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodx, foody, blockSize, blockSize);

    if(snakeX == foodx && snakeY == foody) {
        snakeBody.push([foodx, foody]);
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
         snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // gameover conditions
    if (snakeX < 0 || snakeX > board.width - blockSize || snakeY < 0 || snakeY > board.height - blockSize) {
        gameOver = true;
        alert("game Over");
    }

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("game Over");
        }
    }
}

function changeDirection(e) {
    // change direction of snake
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == 'ArrowLeft' && velocityX != 1) { 
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    // place food randomly on board
    foodx = Math.floor(Math.random() * rows) * blockSize;
    foody = Math.floor(Math.random() * cols) * blockSize;
}