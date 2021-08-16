let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

let mouseX;
let mouseY;

let gameState;

let startScreenClick = new Audio("audio/startScreenClick.mp3");
let menuHover = new Audio("audio/menuHover.mp3");
let menuSelection = new Audio("audio/menuSelection.mp3");
let menuMusic = new Audio("audio/menuMusic.mp3");
 
canvas.addEventListener("mousemove", checkPos);

function checkPos(mouseEvent) {
    if (mouseEvent.pageX || mouseEvent.pageY == 0) {
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    }  
    else if (mouseEvent.offsetX || mouseEvent.offsetY == 0) {
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }
    if (gameState === "mainMenu") {
        for (i = 0; i < mainMenuButtonX.length; i++) {
            if (mouseX > mainMenuButtonX[i] && mouseX < mainMenuButtonX[i] + mainMenuButtonWidth[i]) {
                if (mouseY > mainMenuButtonY[i] && mouseY < mainMenuButtonY[i] + mainMenuButtonHeight[i]) {
                    menuHover.play();
                    menuMarioVisible = true;
                    menuMarioX[0] = mainMenuButtonX[i] - (menuMarioWidth/2) - 2;
                    menuMarioY[0] = mainMenuButtonY[i] + 2;
                    menuMarioX[1] = mainMenuButtonX[i] + mainMenuButtonWidth[i] + (menuMarioWidth/2); 
                    menuMarioY[1] = mainMenuButtonY[i] + 2;
                }
            }
            else {
                menuMarioVisible = false;
            }
        }
    }
    if (gameState === "selectGameMode") {
        for (i = 0; i < gameMenuButtonX.length; i++) {
            console.log(i);
            console.log(`gameMenuButtonX[i]: ${gameMenuButtonX[i]}, mouseX: ${mouseX}, maxX: ${gameMenuButtonX[i] + gameMenuButtonWidth[i]}`);
            console.log(`gameMenuButtonY[i]: ${gameMenuButtonY[i]}, mouseY: ${mouseY}, maxY: ${gameMenuButtonY[i] + gameMenuButtonHeight[i]}`);
            if (mouseX > gameMenuButtonX[i] && mouseX < gameMenuButtonX[i] + gameMenuButtonWidth[i]) {
                if (mouseY > gameMenuButtonY[i] && mouseY < gameMenuButtonY[i] + gameMenuButtonHeight[i]) {
                    // menuHover.play();
                    console.log("in if statement");
                    menuMarioVisible = true;
                    menuMarioX[0] = gameMenuButtonX[i] - (menuMarioWidth/2) - 2;
                    menuMarioY[0] = gameMenuButtonY[i] + 2;
                    menuMarioX[1] = gameMenuButtonX[i] + gameMenuButtonWidth[i] + (menuMarioWidth/2); 
                    menuMarioY[1] = gameMenuButtonY[i] + 2;
                }
            }
            else {
                menuMarioVisible = false;
            }
        }
    }
};

canvas.addEventListener("mouseup", checkStartScreenClick);

function checkStartScreenClick() {
    if (mouseX > 0 && mouseX < canvas.width) {
        if (mouseY > 0 && mouseY < canvas.height) {
            startScreenClick.play();
            canvas.removeEventListener("mouseup", checkStartScreenClick);
            setTimeout(
                function() { 
                    gameState = "mainMenu"; 
                }, 900
            );
        }
    }
}

function checkMainMenuClick() {
    if (gameState === "mainMenu") {
        for (i = 0; i < mainMenuButtonX.length; i++) {
            if (mouseX > mainMenuButtonX[i] && mouseX < mainMenuButtonX[i] + mainMenuButtonWidth[i]) {
                if (mouseY > mainMenuButtonY[i] && mouseY < mainMenuButtonY[i] + mainMenuButtonHeight[i]) {
                    menuSelection.play();
                    canvas.removeEventListener("mousemove", checkPos);
                    canvas.removeEventListener("mouseup", checkMainMenuClick);
                    menuMarioVisible = false;
                    if (i === 0) {
                        play.src = "images/playActive.png";
                        setTimeout(
                            function() { 
                                gameState = "selectGameMode"; 
                            }, 300
                        );
                    }
                    if (i === 1) {
                        controls.src = "images/controlsActive.png";
                        setTimeout(
                            function() { 
                                gameState = "controls"; 
                            }, 300
                        );
                    }
                    if (i === 2) {
                        credits.src = "images/creditsActive.png";
                        setTimeout(
                            function() { 
                                gameState = "credits"; 
                            }, 300
                        );
                    }
                }
            }
        }
    }
};

function checkGameMenuClick() {
    if (gameState === "selectGameMode") {
        for (i = 0; i < gameMenuButtonX.length; i++) {
            if (mouseX > gameMenuButtonX[i] && mouseX < gameMenuButtonX[i] + gameMenuButtonWidth[i]) {
                if (mouseY > gameMenuButtonY[i] && mouseY < gameMenuButtonY[i] + gameMenuButtonHeight[i]) {
                    // menuSelection.play(); <--- PLAY THE RIGHT SOUND HERE
                    canvas.removeEventListener("mousemove", checkPos);
                    canvas.removeEventListener("mouseup", checkGameMenuClick);
                    if (i === 0) {
                        classic.src = "images/classicActive.png";
                        // setTimeout(
                        //     function() { 
                        //         gameState = "selectGameMode"; 
                        //     }, 300
                        // );
                    }
                    if (i === 1) {
                        survival.src = "images/survivalActive.png";
                        // setTimeout(
                        //     function() { 
                        //         gameState = "controls"; 
                        //     }, 300
                        // );
                    }
                    if (i === 2) {
                        domination.src = "images/dominationActive.png";
                        // setTimeout(
                        //     function() { 
                        //         gameState = "credits"; 
                        //     }, 300
                        // );
                    }
                }
            }
        }
    }
};

let keys = [];

let background = new Image();
background.src = ""

let mario = {
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height,
    width: 25,
    height: 30,
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
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
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
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 7;
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

let blueSpinyCheepCheeps = {};
blueSpinyCheepCheeps.blueSpinyCheepCheep = new Image();
blueSpinyCheepCheeps.blueSpinyCheepCheep.src = "images/blueSpinyCheepCheepSpriteSheet.png"

let bluSCCAction = ["left"];
let numberOfBluSCCs = 10;
let bluSCCs = [];

class BluSCC {
    constructor() {
        this.width = 17;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 8;
        this.action = "left";
    }
    draw() {
        drawBlueSpinyCheepCheep(blueSpinyCheepCheeps.blueSpinyCheepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
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

for (let i = 0; i < numberOfBluSCCs; i++) {
    bluSCCs.push(new BluSCC())
};

function drawBlueSpinyCheepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let bossBasses = {};
bossBasses.bossBass = new Image();
bossBasses.bossBass.src = "images/bossBassSpriteSheet.png"

let bBAction = ["left"];
let numberOfBBs = 10;
let bBs = [];

class BB {
    constructor() {
        this.width = 25;
        this.height = 32;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 1;
        this.action = "left";
    }
    draw() {
        drawBossBass(bossBasses.bossBass, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.frameX < 3) {
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

for (let i = 0; i < numberOfBBs; i++) {
    bBs.push(new BB())
};

function drawBossBass (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let cheepCheeps = {};
cheepCheeps.cheepCheep = new Image();
cheepCheeps.cheepCheep.src = "images/cheepCheepSpriteSheet.png"

let cCAction = ["left"];
let numberOfCCs = 15;
let cCs = [];

class CC {
    constructor() {
        this.width = 18;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 4;
        this.action = "left";
    }
    draw() {
        drawCheepCheep(cheepCheeps.cheepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
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

for (let i = 0; i < numberOfCCs; i++) {
    cCs.push(new CC())
};

function drawCheepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let deepCheeps = {};
deepCheeps.deepCheep = new Image();
deepCheeps.deepCheep.src = "images/deepCheepSpriteSheet.png"

let dCAction = ["left"];
let numberOfDCs = 15;
let dCs = [];

class DC {
    constructor() {
        this.width = 18;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 5;
        this.action = "left";
    }
    draw() {
        drawDeepCheep(deepCheeps.deepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
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

for (let i = 0; i < numberOfDCs; i++) {
    dCs.push(new DC())
};

function drawDeepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let eepCheeps = {};
eepCheeps.eepCheep = new Image();
eepCheeps.eepCheep.src = "images/eepCheepSpriteSheet.png"

let eCAction = ["left"];
let numberOfECs = 30;
let eCs = [];

class EC {
    constructor() {
        this.width = 18;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 3;
        this.action = "left";
    }
    draw() {
        drawEepCheep(eepCheeps.eepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
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

for (let i = 0; i < numberOfECs; i++) {
    eCs.push(new EC())
};

function drawEepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let goldSpinyCheepCheeps = {};
goldSpinyCheepCheeps.goldSpinyCheepCheep = new Image();
goldSpinyCheepCheeps.goldSpinyCheepCheep.src = "images/goldSpinyCheepCheepSpriteSheet.png"

let gSCCAction = ["left"];
let numberOfGSCCs = 5;
let gSCCs = [];

class GSCC {
    constructor() {
        this.width = 17;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = canvas.width + (Math.random() * 200);
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
        this.speed = (Math.random() * 5) + 10;
        this.action = "left";
    }
    draw() {
        drawGoldSpinyCheepCheep(goldSpinyCheepCheeps.goldSpinyCheepCheep, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
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

for (let i = 0; i < numberOfGSCCs; i++) {
    gSCCs.push(new GSCC())
};

function drawGoldSpinyCheepCheep (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let goldCoins = {};
goldCoins.goldCoin = new Image();
goldCoins.goldCoin.src = "images/goldCoinSpriteSheet.png"

let numberOfGCs = 1;
let gCs = [];

class GC {
    constructor() {
        this.width = 16;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.x = Math.random() * ((canvas.width - this.height) - 0) + 0;
        this.y = Math.random() * ((canvas.height - this.height) - 0) + 0;
    }
    draw() {
        drawGoldCoin(goldCoins.goldCoin, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.frameX < 3) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
    }
};

for (let i = 0; i < numberOfGCs; i++) {
    gCs.push(new GC())
};

function drawGoldCoin (img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage (img, sX, sY, sW, sH, dX, dY, dW, dH)
};

let collision1 = new Image();
collision1.src = "images/collision1.png"

let collision2 = new Image();
collision2.src = "images/collision2.png"

function collisionBetweenMarioAndObject(first, second) {
    return! ( 
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )
};

let objectData = [
    {objectArray: blaSCCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 13, yAxisOffset: 14, destinationWidth: 55, destinationHeight: 55, objectClass: BlaSCC},
    {objectArray: bluSCCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 13, yAxisOffset: 13, destinationWidth: 55, destinationHeight: 55, objectClass: BluSCC},
    {objectArray: bBs, sourceWidth: 75, sourceHeight: 76, xAxisOffset: 20, yAxisOffset: 23, destinationWidth: 75, destinationHeight: 76, objectClass: BB},
    {objectArray: cCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 12, yAxisOffset: 14, destinationWidth: 55, destinationHeight: 55, objectClass: CC},
    {objectArray: dCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 11, yAxisOffset: 16, destinationWidth: 55, destinationHeight: 55, objectClass: DC},
    {objectArray: eCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 11, yAxisOffset: 17, destinationWidth: 55, destinationHeight: 55, objectClass: EC},
    {objectArray: gCs},
    {objectArray: gSCCs, sourceWidth: 55, sourceHeight: 55, xAxisOffset: 13, yAxisOffset: 14, destinationWidth: 55, destinationHeight: 55, objectClass: GSCC},
];

function drawAndOrUpdateObjects(objectArray, sourceWidth, sourceHeight, xAxisOffset, yAxisOffset, destinationWidth, destinationHeight, objectClass) {
    for (let i = 0; i < objectArray.length; i++) {
        if (objectArray === gCs) {
            if (collisionBetweenMarioAndObject(mario, gCs[i])) {
                gCs.splice(i, 1);
                gCs.push(new GC());
            }
            gCs[i].draw();
        }
        else {
            if (collisionBetweenMarioAndObject(mario, objectArray[i])) {
                context.drawImage(collision1, 0, 0, sourceWidth, sourceHeight, objectArray[i].x - xAxisOffset, objectArray[i].y - yAxisOffset, destinationWidth, destinationHeight);
                objectArray.splice(i, 1);
                objectArray.push(new objectClass());
            }
            objectArray[i].draw();
            objectArray[i].update();
        }
    }
};

// if (collisionBetweenMarioAndObject(mario, objectArray[i])) {
//     context.drawImage(collision1, 0, 0, sourceWidth, sourceHeight, objectArray[i].x - xAxisOffset, objectArray[i].y - yAxisOffset, destinationWidth, destinationHeight);
//     objectArray.splice(i, 1);
//     objectArray.push(new objectClass());
// }
// objectArray[i].draw();
// objectArray[i].update();

let startLogo = new Image();
startLogo.src = "images/startLogo.png";

let clickAnywhere = new Image();
clickAnywhere.src = "images/clickAnywhere.png";

let menuMario = new Image();
menuMario.src = "images/menuMario.png"

let menuLogo = new Image();
menuLogo.src = "images/menuLogo.png";

let play = new Image();
play.src = "images/play.png";

let controls = new Image();
controls.src = "images/controls.png";

let credits = new Image();
credits.src = "images/credits.png";

let classic = new Image();
classic.src = "images/classic.png";

let survival = new Image();
survival.src = "images/survival.png";

let domination = new Image();
domination.src = "images/domination.png";

let menuMarioX = [0, 0];
let menuMarioY = [0, 0];
let menuMarioWidth = 18;
let menuMarioHeight = 33;
 
let menuMarioVisible = false;
let menuMarioSize = menuMarioWidth;
// let menuMarioRotate = 0;

let mainMenuButtonX = [(0.5 * canvas.width) - 75, (0.5 * canvas.width) - 140, (0.5 * canvas.width) - 115];
let mainMenuButtonY = [(0.5 * canvas.height) + 80, (0.5 * canvas.height) + 135, (0.5 * canvas.height) + 190];
let mainMenuButtonWidth = [137, 273, 221];
let mainMenuButtonHeight = [36, 36, 36];

let gameMenuButtonX = [(0.5 * canvas.width) - 513, (0.5 * canvas.width) - 130, (0.5 * canvas.width) + 246];
let gameMenuButtonY = [(0.5 * canvas.height) + 150, (0.5 * canvas.height) + 150, (0.5 * canvas.height) + 150];
let gameMenuButtonWidth = [221, 255, 305];
let gameMenuButtonHeight = [36, 36, 36];

let selectAGameMode = new Image();
selectAGameMode.src = "images/selectAGameMode.png"

let blockCoin = new Image();
blockCoin.src = "images/blockCoin.png"

let blockFrog = new Image();
blockFrog.src = "images/blockFrog.png"

let blockStar = new Image();
blockStar.src = "images/blockStar.png"

function startScreen() {
    context.drawImage(startLogo, 0, 0, 600, 356, (0.5 * canvas.width) - 310, (0.5 * canvas.height) - 260, 600, 356);
    context.drawImage(clickAnywhere, 0, 0, 820, 29, (0.5 * canvas.width) - 400, (0.5 * canvas.height) + 155, 820, 29);
}

function mainMenu() {
    menuMusic.play();
    canvas.addEventListener("mouseup", checkMainMenuClick);
    context.drawImage(menuLogo, 0, 0, 502, 297, (0.5 * canvas.width) - 255, (0.5 * canvas.height) - 260, 502, 297);
    context.drawImage(play, 0, 0, 137, 36, (0.5 * canvas.width) - 75, (0.5 * canvas.height) + 80, 137, 36);
    context.drawImage(controls, 0, 0, 273, 36, (0.5 * canvas.width) - 140, (0.5 * canvas.height) + 135, 273, 36);
    context.drawImage(credits, 0, 0, 221, 36, (0.5 * canvas.width) - 115, (0.5 * canvas.height) + 190, 221, 36);
    if (menuMarioVisible === true) {
        context.drawImage(menuMario, menuMarioX[0] - menuMarioSize, menuMarioY[0], menuMarioSize, menuMarioHeight);
        context.drawImage(menuMario, menuMarioX[1] + (menuMarioSize / 11), menuMarioY[1], menuMarioSize, menuMarioHeight);
    }
};

function selectGameMode() {
    canvas.addEventListener("mousemove", checkPos);
    canvas.addEventListener("mouseup", checkGameMenuClick);
    context.drawImage(selectAGameMode, 0, 0, 725, 52, (0.5 * canvas.width) - 365, (0.5 * canvas.height) - 260, 725, 52);
    context.drawImage(blockCoin, 0, 0, 256, 256, (0.5 * canvas.width) - 530, (0.5 * canvas.height) - 150, 256, 256);
    context.drawImage(blockFrog, 0, 0, 256, 256, (0.5 * canvas.width) - 130, (0.5 * canvas.height) - 150, 256, 256);
    context.drawImage(blockStar, 0, 0, 256, 256, (0.5 * canvas.width) + 270, (0.5 * canvas.height) - 150, 256, 256);
    context.drawImage(classic, 0, 0, 221, 36, (0.5 * canvas.width) - 513, (0.5 * canvas.height) + 150, 221, 36);
    context.drawImage(survival, 0, 0, 255, 36, (0.5 * canvas.width) - 130, (0.5 * canvas.height) + 150, 255, 36);
    context.drawImage(domination, 0, 0, 305, 36, (0.5 * canvas.width) + 246, (0.5 * canvas.height) + 150, 305, 36);
    if (menuMarioVisible === true) {
        context.drawImage(menuMario, menuMarioX[0] - menuMarioSize, menuMarioY[0], menuMarioSize, menuMarioHeight);
        context.drawImage(menuMario, menuMarioX[1] + (menuMarioSize / 11), menuMarioY[1], menuMarioSize, menuMarioHeight);
        console.log(`The variable menuMarioVisible is set to true`);
    }
};

function startGame() {
    drawMario(marioSprite, mario.width * mario.frameX, mario.height * mario.frameY, mario.width, mario.height, mario.x, mario.y, mario.width, mario.height);
    moveMario();
    handleMarioFrame();
    objectData.forEach(function(object) {
        drawAndOrUpdateObjects(object.objectArray, object.sourceWidth, object.sourceHeight, object.xAxisOffset, object.yAxisOffset, object.destinationWidth, object.destinationHeight, object.objectClass)
    });
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
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        // context.drawImage(menuLogo, 0, 0, 502, 297, (0.5 * canvas.width) - 255, (0.5 * canvas.height) - 260, 502, 297);
        // context.drawImage(play, 0, 0, 137, 36, (0.5 * canvas.width) - 75, (0.5 * canvas.height) + 80, 137, 36);
        // context.drawImage(controls, 0, 0, 273, 36, (0.5 * canvas.width) - 140, (0.5 * canvas.height) + 135, 273, 36);
        // context.drawImage(credits, 0, 0, 221, 36, (0.5 * canvas.width) - 115, (0.5 * canvas.height) + 190, 221, 36);
        // if (menuMarioVisible === true) {
        //     context.drawImage(menuMario, menuMarioX[0] - menuMarioSize, menuMarioY[0], menuMarioSize, menuMarioHeight);
        //     context.drawImage(menuMario, menuMarioX[1] + (menuMarioSize / 11), menuMarioY[1], menuMarioSize, menuMarioHeight);
        // }

        if (gameState === undefined) {
            startScreen()
        }

        if (gameState === "mainMenu") {
            mainMenu()
        }

        if (gameState === "selectGameMode") {
            selectGameMode()
        }

        // if (gameState === "Classic") {
        //     startGame();
        // }

        // drawMario(marioSprite, mario.width * mario.frameX, mario.height * mario.frameY, mario.width, mario.height, mario.x, mario.y, mario.width, mario.height);
        // moveMario();
        // handleMarioFrame();
        // objectData.forEach(function(object) {
        //     drawAndOrUpdateObjects(object.objectArray, object.sourceWidth, object.sourceHeight, object.xAxisOffset, object.yAxisOffset, object.destinationWidth, object.destinationHeight, object.objectClass)
        // });

        // for (let i = 0; i < gCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, gCs[i])) {
        //         gCs.splice(i, 1);
        //         gCs.push(new GC());
        //     }
        //     gCs[i].draw();
        // }

        // for (let i = 0; i < blaSCCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, blaSCCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, blaSCCs[i].x - 13, blaSCCs[i].y - 14, 55, 55);
        //         blaSCCs.splice(i, 1);
        //         blaSCCs.push(new BlaSCC());
        //     }
        //     blaSCCs[i].draw();
        //     blaSCCs[i].update();
        // }

        // drawAndOrUpdateObjects(blaSCCs, 55, 55, 13, 14, 55, 55, BlaSCC);

        // for (let i = 0; i < bluSCCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, bluSCCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, bluSCCs[i].x - 13, bluSCCs[i].y - 13, 55, 55);
        //         bluSCCs.splice(i, 1);
        //         bluSCCs.push(new BluSCC());
        //     }
        //     bluSCCs[i].draw();
        //     bluSCCs[i].update();
        // }

        // drawAndOrUpdateObjects(bluSCCs, 55, 55, 13, 13, 55, 55, BluSCC);

        // for (let i = 0; i < bBs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, bBs[i])) {
        //         context.drawImage(collision2, 0, 0, 75, 76, bBs[i].x - 20, bBs[i].y - 23, 75, 76);
        //         bBs.splice(i, 1);
        //         bBs.push(new BB());
        //     }
        //     bBs[i].draw();
        //     bBs[i].update();
        // }

        // drawAndOrUpdateObjects(bBs, 75, 76, 20, 23, 75, 76, BB);

        // for (let i = 0; i < cCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, cCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, cCs[i].x - 12, cCs[i].y - 14, 55, 55);
        //         cCs.splice(i, 1);
        //         cCs.push(new CC());
        //     }
        //     cCs[i].draw();
        //     cCs[i].update();
        // }

        // drawAndOrUpdateObjects(cCs, 55, 55, 12, 14, 55, 55, CC);

        // for (let i = 0; i < dCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, dCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, dCs[i].x - 11, dCs[i].y - 16, 55, 55);
        //         dCs.splice(i, 1);
        //         dCs.push(new DC());
        //     }
        //     dCs[i].draw();
        //     dCs[i].update();
        // }

        // drawAndOrUpdateObjects(dCs, 55, 55, 11, 16, 55, 55, DC);

        // for (let i = 0; i < eCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, eCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, eCs[i].x - 11, eCs[i].y - 17, 55, 55);
        //         eCs.splice(i, 1);
        //         eCs.push(new EC());
        //     }
        //     eCs[i].draw();
        //     eCs[i].update();
        // }

        // drawAndOrUpdateObjects(eCs, 55, 55, 11, 17, 55, 55, EC);

        // for (let i = 0; i < gSCCs.length; i++) {
        //     if (collisionBetweenMarioAndObject(mario, gSCCs[i])) {
        //         context.drawImage(collision1, 0, 0, 55, 55, gSCCs[i].x - 13, gSCCs[i].y - 14, 55, 55);
        //         gSCCs.splice(i, 1);
        //         gSCCs.push(new GSCC());
        //     }
        //     gSCCs[i].draw();
        //     gSCCs[i].update();
        // }

        // drawAndOrUpdateObjects(gSCCs, 55, 55, 13, 14, 55, 55, GSCC);
    }
}

startAnimating(10);

// window.onload = function menu() {
//     drawMario(marioSprite, mario.width & mario.frameX, mario.height * mario.frameY, mario.width, mario.height, mario.x, mario.y, mario.width, mario.height);
// };