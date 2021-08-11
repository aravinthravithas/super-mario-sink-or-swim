let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

let keys = [];

let mario = {
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height,
    width: 33,
    height: 33,
    frameX: 3,
    frameY: 3,
    speed: 5,
    moving: false
}

let marioSprite = new Image();
marioSprite.src = "images/marioGreenFrogSuitSpriteSheet.png";

function drawMario(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
};

window.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
    mario.moving = true;
});

window.addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
    mario.moving = false;
});

// Code block below prevents the clicking of arrows keys from scrolling in active browser window
window.addEventListener("keydown", function(event) {
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
};

function handleMarioFrame() {
    if (mario.frameX < 3 && mario.moving) {
        mario.frameX++;
    }
    else {
        mario.frameX = 0;
    }
};

let blackSpinyCheepCheeps = {};
blackSpinyCheepCheeps.blackSpinyCheepCheep = new Image();
blackSpinyCheepCheeps.blackSpinyCheepCheep.src = "images/blackSpinyCheepCheepSpriteSheet.png"

let blaSCCAction = ["left"];
let numberOfBlaSCCs = 10;
let blaSCCs = [];

class BlaSCC {
    constructor() {
        this.width = 17;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width;
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        // this.y = Math.random() * canvas.height;
        this.speed = (Math.random() * 5) + 5;
        this.action = "left";
    }
    draw() {
        drawBlackSpinyCheepCheep(blackSpinyCheepCheeps.blackSpinyCheepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.frameX < 1) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
    }
    update() {
        if (this.action === "left") {
            if (this.x > 0 - this.width) {
                this.x -= this.speed;
            }
            else {
                this.x = canvas.width + this.width;
                this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
            }
        }
    }
};

for (let i = 0; i < numberOfBlaSCCs; i++) {
    blaSCCs.push(new BlaSCC())
};

function drawBlackSpinyCheepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMario(marioSprite, mario.width * mario.frameX, mario.height * mario.frameY, mario.width, mario.height, mario.x, mario.y, mario.width, mario.height);
        moveMario();
        handleMarioFrame();
        for (let i = 0; i < blaSCCs.length; i++) {
            blaSCCs[i].draw();
            blaSCCs[i].update();
        }
    }
}

startAnimating(10);

// window.onload = function menu() {
//     drawMario(marioSprite, mario.width & mario.frameX, mario.height * mario.frameY, mario.width, mario.height, mario.x, mario.y, mario.width, mario.height);
// };