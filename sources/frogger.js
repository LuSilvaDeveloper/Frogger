let interfaceCanvas = document.getElementById("interfaceCanvas");
let spriteCanvas = document.getElementById("spriteCanvas");
let backgroundCanvas = document.getElementById("backgroundCanvas");
class Sprite {
    constructor(width, height, ix, iy, x) {
        this.width = width;
        this.height = height;
        this.ix = ix;
        this.iy = iy;
        this.x = x;
    }
}

function Lane(direction, speed, sprites, y, isInRiver) {
    this.direction = direction;
    this.speed = speed;
    this.sprites = sprites;
    this.y = y;
    this.isInRiver = isInRiver;
}

let pink1 = new Sprite(31, 22, 8, 266, 200);
let pink2 = new Sprite(31, 22, 8, 266, 200);
let pink3 = new Sprite(31, 22, 8, 266, 200);
let pink4 = new Sprite(31, 22, 8, 266, 200);
let yellow1 = new Sprite(27, 30, 80, 262, 0);
let yellow2 = new Sprite(27, 30, 80, 262, 0);
let truck1 = new Sprite(46, 20, 105, 301, 10);
let truck2 = new Sprite(46, 20, 105, 301, 100);
let truck3 = new Sprite(46, 20, 105, 301, 200);
let truck4 = new Sprite(46, 20, 105, 301, 350);
let tractor1 = new Sprite(28, 26, 43, 264, 120);
let shipWheel = new Sprite(25, 23, 10, 300, 200);

// biggest trunk
let trunk1 = new Sprite(180, 21, 7, 166, 30);
let trunk2 = new Sprite(180, 21, 7, 166, 15);
let trunk3 = new Sprite(180, 21, 7, 166, 210);
// medium trunk
let trunk4 = new Sprite(117, 20, 6, 199, 30);
let trunk5 = new Sprite(117, 20, 6, 199, 200);
let trunk6 = new Sprite(117, 20, 6, 199, 30);
let trunk7 = new Sprite(117, 20, 6, 199, 180);
// smallest trunk
let trunk8 = new Sprite(85, 19, 6, 230, 10);
let trunk9 = new Sprite(85, 19, 6, 230, 130);
let trunk10 = new Sprite(85, 19, 6, 230, 240);
let trunk11 = new Sprite(85, 19, 6, 230, 30);
let trunk12 = new Sprite(85, 19, 6, 230, 150);
let trunk13 = new Sprite(85, 19, 6, 230, 260);

let roadLine1 = new Lane(-1, 5, [pink1, pink2, pink3], 450, false);
let roadLine2 = new Lane(1, 2, [shipWheel], 420, false);
let roadLine3 = new Lane(-1, 15, [yellow1, yellow2], 390, false);
let roadLine4 = new Lane(1, 7, [tractor1], 360, false);
let roadLine5 = new Lane(-1, 7, [truck1, truck2, truck3, truck4], 330, false);
let roadLine6 = new Lane(-1, 2, [pink4], 300, false);

let riverLine1 = new Lane(-1, 5, [trunk1], 240, true);
let riverLine2 = new Lane(-1, 10, [trunk4, trunk5], 210, true);
let riverLine3 = new Lane(1, 7, [trunk8, trunk9, trunk10], 180, true);
let riverLine4 = new Lane(-1, 15, [trunk2, trunk3], 150, true);
let riverLine5 = new Lane(1, 3, [trunk11, trunk12, trunk13], 120, true);
let riverLine6 = new Lane(1, 20, [trunk6, trunk7], 90, true);

let lanes = [roadLine1, roadLine2, roadLine3, roadLine4, roadLine5, roadLine6, riverLine1, riverLine2, riverLine3, riverLine4, riverLine5, riverLine6];


let spritesImage = new Image();
spritesImage.src = "../assets/sprites.png";

let deadImage = new Image();
deadImage.src = "../assets/dead.png"

let interfaceCtx = interfaceCanvas.getContext("2d");
let spriteCtx = spriteCanvas.getContext("2d");
let backgroundCtx = backgroundCanvas.getContext("2d");

interfaceCanvas.addEventListener("click", startGame);

function isPointCollision(px, py, bx, by, bw, bh) {
    let left = bx;
    let right = bx + bw;
    let top = by;
    let bottom = by + bh;
    if (px > left && px < right && py > top && py < bottom) {
        return true;
    } else {
        return false;
    }
};

function isBoxCollision(b1x, b1y, b1w, b1h, b2x, b2y, b2w, b2h) {

    let distCenter = Math.sqrt(((b1x + b1w / 2) - (b2x + b2w / 2)) ** 2 + ((b1y + b1h / 2) - (b2y + b2h / 2)) ** 2);

    if (distCenter < (b1w / 2 + b2w / 2) && distCenter < (b1h / 2 + b2h / 2)) {
        return true;
    } else
        return false;
};

function showStartScreen() {
    interfaceCtx.fillStyle = "black";
    interfaceCtx.fillRect(0, 0, 400, 565);
    interfaceCtx.drawImage(spritesImage, 0, 0, 340, 50, 105, 130, 200, 100);
    interfaceCtx.fillStyle = "green";
    interfaceCtx.fillRect(155, 280, 100, 50);
    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "30px serif";
    interfaceCtx.fillText("Start", 175, 315);


}

let interval1;
let interval2;

function startGame(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (player.state == "start" || player.state == "end") {
        let clickStart = isPointCollision(x, y, 155, 280, 100, 50);
        if (clickStart) {
            player.score = 0;
            player.safeHomes = [true, true, true, true]
            player.time = 60;
            player.lives = 5;
            interfaceCtx.clearRect(0, 0, 400, 565);
            player.state = "playing";
            renderBackground();
            renderFrog();
            renderLives();
            renderScore();
            renderTime();
            renderSprites();
            // should be 50
            interval1 = setInterval(rendersTheGame, 50)
            interval2 = setInterval(renderTimeFunction, 1000)

        }
    }
}

let frog = {
    x: 165,
    y: 480,
    direction: "up",
    speed: 30,
    width: 40,
    height: 30
};

let player = {
    time: 60,
    lives: 5,
    state: "start",
    score: 0,
    safeHomes: [true, true, true, true]
}

function renderBackground() {
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0, 0, 400, 565);
    backgroundCtx.fillStyle = "blue";
    backgroundCtx.fillRect(0, 45, 400, 235);
    // Frogger
    backgroundCtx.drawImage(spritesImage, 0, 0, 340, 50, 105, -10, 200, 60);
    // Grass
    backgroundCtx.drawImage(spritesImage, 0, 53, 400, 55, -20, 40, 460, 50);
    // Bottom purple
    backgroundCtx.drawImage(spritesImage, 0, 118, 400, 35, 0, 480, 400, 30);
    // Top Purple
    backgroundCtx.drawImage(spritesImage, 0, 118, 400, 35, 0, 275, 400, 15);
};

function renderFrog() {

    switch (frog.direction) {
        case "up":
            interfaceCtx.drawImage(spritesImage, 0, 365, 40, 25, frog.x, frog.y, frog.width, frog.height);
            break;
        case "down":
            interfaceCtx.drawImage(spritesImage, 78, 365, 35, 25, frog.x, frog.y, frog.width, frog.height);
            break;
        case "right":
            interfaceCtx.drawImage(spritesImage, 0, 333, 30, 25, frog.x, frog.y, frog.width, frog.height);
            break;
        case "left":
            interfaceCtx.drawImage(spritesImage, 78, 333, 30, 25, frog.x, frog.y, frog.width, frog.height);
            break;
    }
};

function renderLives() {
    let x = 7;
    for (let i = 0; i < player.lives; i++) {
        backgroundCtx.drawImage(spritesImage, 0, 335, 40, 30, x, 520, 30, 20);
        x += 20;
    }
};

function renderScore() {
    backgroundCtx.fillStyle = "yellow";
    backgroundCtx.font = "20px serif";
    backgroundCtx.fillText("Score:", 7, 555);
    backgroundCtx.fillText(`${player.score}`, 65, 555);
};

function renderTime() {
    backgroundCtx.fillStyle = "yellow";
    backgroundCtx.font = "30px serif";
    backgroundCtx.fillText("Time:", 275, 555);
    backgroundCtx.fillText(`${player.time}`, 350, 555);

};

document.addEventListener("keydown", moveFrog)

function moveFrog(event) {
    if (event.key == "ArrowUp") {
        frog.direction = "up";
        if (frog.y >= 85) {
            frog.y = frog.y - frog.speed;
        }
    }
    if (event.key == "ArrowDown") {
        frog.direction = "down";
        if (frog.y <= 450) {
            frog.y = frog.y + frog.speed;
        }

    }
    if (event.key == "ArrowRight") {
        frog.direction = "right";
        if (frog.x <= 360) {
            frog.x = frog.x + frog.speed;
        }

    }
    if (event.key == "ArrowLeft") {
        frog.direction = "left";
        if (frog.x >= 10) {
            frog.x = frog.x - frog.speed;
        }

    }
    interfaceCtx.clearRect(0, 0, 400, 565);
    renderFrog();
}

function renderSprites() {
    for (let i = 0; i < lanes.length; i++) {
        for (let j = 0; j < lanes[i].sprites.length; j++) {
            spriteCtx.drawImage(spritesImage, (lanes[i].sprites)[j].ix, (lanes[i].sprites)[j].iy, (lanes[i].sprites)[j].width, (lanes[i].sprites)[j].height, (lanes[i].sprites)[j].x, lanes[i].y, (lanes[i].sprites)[j].width, (lanes[i].sprites)[j].height);

        }
    }

}

function rendersTheGame() {
    for (let i = 0; i < lanes.length; i++) {
        for (let j = 0; j < lanes[i].sprites.length; j++) {
            if (lanes[i].direction == -1) {
                if ((lanes[i].sprites)[j].x > 0 - (lanes[i].sprites)[j].width) {
                    (lanes[i].sprites)[j].x = (lanes[i].sprites)[j].x - lanes[i].speed;
                } else {
                    (lanes[i].sprites)[j].x = 400;
                }
            } else {
                if (lanes[i].sprites[j].x < 400) {
                    (lanes[i].sprites)[j].x = (lanes[i].sprites)[j].x + lanes[i].speed;
                } else {
                    (lanes[i].sprites)[j].x = 0 - (lanes[i].sprites)[j].width;
                }
            }
        }
    }
    // check collision on the road
    if (frog.y <= 480 && frog.y >= 270) {
        for (let i = 0; i < lanes.length; i++) {
            for (let j = 0; j < lanes[i].sprites.length; j++) {
                if (isBoxCollision(frog.x, frog.y, frog.width, frog.height, (lanes[i].sprites)[j].x, lanes[i].y, (lanes[i].sprites)[j].width, (lanes[i].sprites)[j].height) == true) {
                    killFrog();
                }
            }
        }
    }

    // // // check if the frog is on the log

    if (frog.y == 240) {
        if (!(frog.x >= trunk1.x && frog.x <= trunk1.x + trunk1.width)) {
            killFrog();
        }
    }

    if (frog.y == 210) {
        if (!(frog.x >= trunk4.x && frog.x <= trunk4.x + trunk4.width || frog.x >= trunk5.x && frog.x <= trunk5.x + trunk5.width)) {
            killFrog();
        }
        // if (!(frog.x >= trunk5.x && frog.x <= trunk5.x + trunk5.width)) {
        //     console.log("euuu")
        // }
    }

    if (frog.y == 180) {
        if (!(frog.x >= trunk8.x && frog.x <= trunk8.x + trunk8.width || frog.x >= trunk9.x && frog.x <= trunk9.x + trunk9.width || frog.x >= trunk10.x && frog.x <= trunk10.x + trunk10.width)) {
            killFrog();
        }
        // if (!(frog.x >= trunk9.x && frog.x <= trunk9.x + trunk9.width)) {
        //     console.log("euuu")
        // }
        // if (!(frog.x >= trunk10.x && frog.x <= trunk10.x + trunk10.width)) {
        //     console.log("euuu")
        // }
    }

    if (frog.y == 150) {
        if (!(frog.x >= trunk2.x && frog.x <= trunk2.x + trunk2.width || frog.x >= trunk3.x && frog.x <= trunk3.x + trunk3.width)) {
            killFrog();
        }
        // if (!(frog.x >= trunk3.x && frog.x <= trunk3.x + trunk3.width)) {
        //     console.log("euuu")
        // }
    }

    if (frog.y == 120) {
        if (!(frog.x >= trunk11.x && frog.x <= trunk11.x + trunk11.width || frog.x >= trunk12.x && frog.x <= trunk12.x + trunk12.width || frog.x >= trunk13.x && frog.x <= trunk13.x + trunk13.width)) {
            killFrog();
        }
        // if (!(frog.x >= trunk12.x && frog.x <= trunk12.x + trunk12.width)) {
        //     console.log("euuu")
        // }
        // if (!(frog.x >= trunk13.x && frog.x <= trunk13.x + trunk13.width)) {
        //     console.log("euuu")
        // }
    }

    if (frog.y == 90) {
        if (!(frog.x >= trunk6.x && frog.x <= trunk6.x + trunk6.width || frog.x >= trunk7.x && frog.x <= trunk7.x + trunk7.width)) {
            killFrog();
        }
        // if (!(frog.x >= trunk7.x && frog.x <= trunk7.x + trunk7.width)) {
        //     console.log("euuu")
        // }
    }

    // check safe home
    if (frog.y == 60) {
        if (frog.x >= 15 && frog.x <= 45) {
            if (player.safeHomes[0] == true) {
                console.log("deubom")
                player.safeHomes[0] = false;
                frogPlaced();
            } else {
                interfaceCtx.clearRect(0, 0, 400, 565);
                interfaceCtx.drawImage(deadImage, frog.x, frog.y);
                player.lives = player.lives - 1;
                frog.x = 165;
                frog.y = 480;
                backgroundCtx.clearRect(0, 510, 120, 30);
                backgroundCtx.fillStyle = "black";
                backgroundCtx.fillRect(0, 510, 120, 30);
                renderLives();
            }

        }
        if (frog.x == 135) {
            if (player.safeHomes[1] == true) {
                player.safeHomes[1] = false;
                frogPlaced();
            } else {
                killFrog();
            }
        }
        if (frog.x >= 225 && frog.x <= 255) {
            if (player.safeHomes[2] == true) {
                player.safeHomes[2] = false;
                frogPlaced();
            } else {
                interfaceCtx.clearRect(0, 0, 400, 565);
                interfaceCtx.drawImage(deadImage, frog.x, frog.y);
                player.lives = player.lives - 1;
                frog.x = 165;
                frog.y = 480;
                backgroundCtx.clearRect(0, 510, 120, 30);
                backgroundCtx.fillStyle = "black";
                backgroundCtx.fillRect(0, 510, 120, 30);
                renderLives();
            }

        }
        if (frog.x >= 315 && frog.x <= 345) {
            if (player.safeHomes[3] == true) {
                player.safeHomes[3] = false;
                frogPlaced();
            } else {
                interfaceCtx.clearRect(0, 0, 400, 565);
                interfaceCtx.drawImage(deadImage, frog.x, frog.y);
                player.lives = player.lives - 1;
                frog.x = 165;
                frog.y = 480;
                backgroundCtx.clearRect(0, 510, 120, 30);
                backgroundCtx.fillStyle = "black";
                backgroundCtx.fillRect(0, 510, 120, 30);
                renderLives();
            }

        }
    }

    spriteCtx.clearRect(0, 0, 400, 565);
    renderSprites();

    if (timeOver() || isFrogDead()) {
        endGame();
    }

  
    if (isFrogsSafe()) {
        endGame();
    }
}

function renderTimeFunction() {
    backgroundCtx.clearRect(200, 530, 200, 35);
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(200, 530, 200, 35);
    player.time -= 1;
    renderTime();
}

function endGame() {
    clearInterval(interval1);
    clearInterval(interval2);
    player.state = "end";
    interfaceCtx.fillStyle = "black";
    interfaceCtx.fillRect(0, 0, 400, 565);
    interfaceCtx.fillStyle = "red";
    interfaceCtx.font = "60px serif";
    // if frogs save fill Text = you win
    if (isFrogsSafe()) {
        interfaceCtx.fillText("YOU WIN", 35, 130);
    } else {
        interfaceCtx.fillText("GAME OVER", 35, 130);
    }
    
    interfaceCtx.fillRect(155, 280, 100, 50);
    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "20px serif";
    interfaceCtx.fillText("Play Again", 160, 315);
    interfaceCtx.fillStyle = "yellow";
    interfaceCtx.font = "30px serif";
    interfaceCtx.fillText("Score:", 160, 400);
    interfaceCtx.fillText(`${player.score}`, 245, 400);

}

function killFrog() {
    interfaceCtx.clearRect(0, 0, 400, 565);
    interfaceCtx.drawImage(deadImage, frog.x, frog.y);
    player.lives = player.lives - 1;
    frog.x = 165;
    frog.y = 480;
    backgroundCtx.clearRect(0, 510, 120, 30);
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0, 510, 120, 30);
    renderLives();
}

function timeOver() {
    if (player.time == 0) {
        return true;
    } else {
        return false;
    }
}

function isFrogDead() {
    if (player.lives == 0) {
        return true;
    } else {
        return false;
    }
}

function isFrogsSafe() {
    if ((player.safeHomes[0] === false) && (player.safeHomes[1] === false) && (player.safeHomes[2] === false) && (player.safeHomes[3] === false)) {
        return true;
    } else {
        return false;
    }

}

function frogPlaced(){
    backgroundCtx.drawImage(spritesImage, 0, 365, 40, 25, frog.x, frog.y, frog.width, frog.height);
    player.score += 100;
    frog.x = 165;
    frog.y = 480;
    renderFrog();
}