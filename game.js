// get canvas and set context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

// get images
const board = new Image();
board.src = "images/ground.png";

const foodImage = new Image();
foodImage.src = "images/food.png";

// get audio files
const up = new Audio("audio/up.mp3");
const down = new Audio("audio/down.mp3");
const left = new Audio("audio/left.mp3");
const right = new Audio("audio/right.mp3");
const eat = new Audio("audio/eat.mp3");
const dead = new Audio("audio/dead.mp3");

// one unit on game board = 32px 
const box = 32;

// score
let score = 0

//snake
let snake = [{
        x: 8 * box,
        y: 10 * box
    },
    {
        x: 7 * box,
        y: 10 * box
    }
];


// food
let food = {};

// function to generate new food randomly 
function generateFood() {
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };
}

// direction
let direction = "right";

// function to upddate snake's position
function updateSnakePosition() {
    let currentSnakeHeadX = snake[0].x;
    let currentSnakeHeadY = snake[0].y;
    switch (direction) {
        case "left":
            snake.unshift({
                x: currentSnakeHeadX - box,
                y: currentSnakeHeadY
            });
            break;
        case "right":
            snake.unshift({
                x: currentSnakeHeadX + box,
                y: currentSnakeHeadY
            });
            break;
        case "up":
            snake.unshift({
                x: currentSnakeHeadX,
                y: currentSnakeHeadY - box
            });
            break;
        case "down":
            snake.unshift({
                x: currentSnakeHeadX,
                y: currentSnakeHeadY + box
            });
            break;
        default:
            break;
    }
}

// function to check collisions and food being eaten
function check() {
    // if snake head lands on food, level up the snake (i.e. change snake position without popping an element)
    if (snake[0].x === food.x && snake[0].y === food.y) {
        updateSnakePosition();
        score++;
        generateFood();
        return;
    }
    if (snake[0].x < box || snake[0].x > 17 * box || snake[0].y < 3 * box || snake[0].y > 17 * box) {
        clearInterval(game);
        let finalScore = score;
        context.font = "30px sans-serif";
        score = `GAME OVER! Final Score: ${finalScore}`;
        return;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game);
            let finalScore = score;
            context.font = "30px sans-serif";
            score = `GAME OVER! Final Score: ${finalScore}`;
            return;
        }
    }
}

// draw function
function draw() {
    // draw the board and food position
    context.drawImage(board, 0, 0);
    context.drawImage(foodImage, food.x, food.y);

    // draw snake
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "red";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // display current score
    context.fillStyle = "white";
    context.font = "40px sans-serif";

    // update snake position and check for collisions or level up
    snake.pop();
    updateSnakePosition();
    check();
    context.fillText(score, 2.25 * box, 1.75 * box);
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        default:
            break;
    }
});

// generate first random apple and start game
generateFood();
let game = setInterval(draw, 100);

/*
canvas.getContext("2d")

context.fillStyle
context.fillRect

context.strokeStyle
context.strokeRect

context.drawImage

context.fillStyle
context.font
context.fillText


*/

/*
LOCAL
    git init
    git config --global user.name 'github-username'
    git config --global user.email 'github-email'
    git add <filename> OR git add . [for all changes]
    git status [to see current working tree i.e. things ready to be committed]
    git commit -m 'commit message'

    git branch <branch-name> [to create a new branch]
    git checkout <branch-name> [to switch from master to another branch named <branch-name>]

    git branch -b <new-branch-name> [shorthand for above two commands. use this for creating a new branch and going there simultaneously]


REMOTE
    git remote add origin -u https://...
    git remote show origin
    git push -u origin <branch-name> [branch-name would be master if pushing directly to master branch]
    git pull origin --rebase [use this to pull files from remote repository if it is not in sync with local repository]
*/