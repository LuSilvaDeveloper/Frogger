import { interfaceCtx, backgroundCtx, spriteCtx, spritesImage, deadImage, frog, player } from './state.js';
import {
    lanes,
    trunk1, trunk2, trunk3,
    trunk4, trunk5, trunk6, trunk7,
    trunk8, trunk9, trunk10,
    trunk11, trunk12, trunk13,
} from './entities.js';
import { isPointCollision, isBoxCollision } from './collision.js';
import {
    renderBackground,
    renderFrog,
    renderLives,
    renderScore,
    renderTime,
    renderSprites,
} from './renderer.js';

let interval1;
let interval2;

export function startGame(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (player.state == "start" || player.state == "end") {
        let clickStart = isPointCollision(x, y, 155, 280, 100, 50);
        if (clickStart) {
            player.score = 0;
            player.safeHomes = [true, true, true, true];
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
            interval1 = setInterval(rendersTheGame, 50);
            interval2 = setInterval(renderTimeFunction, 1000);
        }
    }
}

export function moveFrog(event) {
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

function rendersTheGame() {
    // Move all sprites along their lanes
    for (let i = 0; i < lanes.length; i++) {
        for (let j = 0; j < lanes[i].sprites.length; j++) {
            if (lanes[i].direction == -1) {
                if (lanes[i].sprites[j].x > 0 - lanes[i].sprites[j].width) {
                    lanes[i].sprites[j].x -= lanes[i].speed;
                } else {
                    lanes[i].sprites[j].x = 400;
                }
            } else {
                if (lanes[i].sprites[j].x < 400) {
                    lanes[i].sprites[j].x += lanes[i].speed;
                } else {
                    lanes[i].sprites[j].x = 0 - lanes[i].sprites[j].width;
                }
            }
        }
    }

    // Check collision on the road
    if (frog.y <= 480 && frog.y >= 270) {
        for (let i = 0; i < lanes.length; i++) {
            for (let j = 0; j < lanes[i].sprites.length; j++) {
                if (isBoxCollision(
                    frog.x, frog.y, frog.width, frog.height,
                    lanes[i].sprites[j].x, lanes[i].y,
                    lanes[i].sprites[j].width, lanes[i].sprites[j].height
                )) {
                    killFrog();
                }
            }
        }
    }

    // Check if the frog is on a log in the river
    if (frog.y == 240) {
        if (!(frog.x >= trunk1.x && frog.x <= trunk1.x + trunk1.width)) {
            killFrog();
        }
    }

    if (frog.y == 210) {
        if (!(
            (frog.x >= trunk4.x && frog.x <= trunk4.x + trunk4.width) ||
            (frog.x >= trunk5.x && frog.x <= trunk5.x + trunk5.width)
        )) {
            killFrog();
        }
    }

    if (frog.y == 180) {
        if (!(
            (frog.x >= trunk8.x && frog.x <= trunk8.x + trunk8.width) ||
            (frog.x >= trunk9.x && frog.x <= trunk9.x + trunk9.width) ||
            (frog.x >= trunk10.x && frog.x <= trunk10.x + trunk10.width)
        )) {
            killFrog();
        }
    }

    if (frog.y == 150) {
        if (!(
            (frog.x >= trunk2.x && frog.x <= trunk2.x + trunk2.width) ||
            (frog.x >= trunk3.x && frog.x <= trunk3.x + trunk3.width)
        )) {
            killFrog();
        }
    }

    if (frog.y == 120) {
        if (!(
            (frog.x >= trunk11.x && frog.x <= trunk11.x + trunk11.width) ||
            (frog.x >= trunk12.x && frog.x <= trunk12.x + trunk12.width) ||
            (frog.x >= trunk13.x && frog.x <= trunk13.x + trunk13.width)
        )) {
            killFrog();
        }
    }

    if (frog.y == 90) {
        if (!(
            (frog.x >= trunk6.x && frog.x <= trunk6.x + trunk6.width) ||
            (frog.x >= trunk7.x && frog.x <= trunk7.x + trunk7.width)
        )) {
            killFrog();
        }
    }

    // Check safe home positions
    if (frog.y == 60) {
        if (frog.x >= 15 && frog.x <= 45) {
            if (player.safeHomes[0] == true) {
                player.safeHomes[0] = false;
                frogPlaced();
            } else {
                killFrog();
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
                killFrog();
            }
        }
        if (frog.x >= 315 && frog.x <= 345) {
            if (player.safeHomes[3] == true) {
                player.safeHomes[3] = false;
                frogPlaced();
            } else {
                killFrog();
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
    player.lives -= 1;
    frog.x = 165;
    frog.y = 480;
    backgroundCtx.clearRect(0, 510, 120, 30);
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0, 510, 120, 30);
    renderLives();
}

function timeOver() {
    return player.time == 0;
}

function isFrogDead() {
    return player.lives == 0;
}

function isFrogsSafe() {
    return (
        player.safeHomes[0] === false &&
        player.safeHomes[1] === false &&
        player.safeHomes[2] === false &&
        player.safeHomes[3] === false
    );
}

function frogPlaced() {
    backgroundCtx.drawImage(spritesImage, 0, 365, 40, 25, frog.x, frog.y, frog.width, frog.height);
    player.score += 100;
    frog.x = 165;
    frog.y = 480;
    renderFrog();
}
