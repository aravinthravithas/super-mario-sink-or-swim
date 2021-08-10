let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

let keys = [];

let mario = {
    x: 0.5 * canvas.width - 20,
    y: 0.5 * canvas.width - 35,
    width: 50,
    height: 50,
    frameX: 0,
    frameY: 0,
    speed: 20,
    moving: false
}

let marioSprite = new Image();
marioSprite.src = "images/marioGreenFrogSuitSpiteSheet";

function drawMario(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
};

window.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
    mario.moving = true;
});

// Code block below prevents the clicking of arrows keys from scrolling in active browser window
window.addEventListener("keyup", function(event) {
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
}, false);

function moveMario() {
    if (keys[38] && mario.y > 0) {
        mario.y -= mario.speed;
        mario.frameY = 1;
        mario.moving = true;
    }
    if (keys[37] && mario.x > 0) {
        mario.x -= mario.speed;
        mario.frameY = 2;
        mario.moving = true;
    }
    if (keys[40] && mario.y < canvas.height - mario.height) {
        mario.y += mario.speed;
        mario.frameY = 0;
        mario.moving = true;
    }
    if (keys[39] && mario.x < canvas.width - mario.width) {
        mario.x += mario.speed;
        mario.frameY = 3;
        mario.moving = true;
    }
}