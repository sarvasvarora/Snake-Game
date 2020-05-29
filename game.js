// get canvas and set context
let canvas = document.getElementById("board");
let context = canvas.getContext("2d");

// get images
let board = new Image();
board.src = "images/ground.png";

let food = new Image();
food.src = "images/food.png";

// get audio files
let up = new Audio("audio/up.mp3");
let down = new Audio("audio/down.mp3");
let left = new Audio("audio/left.mp3");
let right = new Audio("audio/right.mp3");
let eat = new Audio("audio/eat.mp3");
let dead = new Audio("audio/dead.mp3");

// one unit on game board = 32px 
let box = 32;

// score
let score = 0

// draw function
function draw(){
    context.drawImage(board, 0, 0);
    context.

}

setInterval(draw, 100);

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