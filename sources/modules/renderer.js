import { backgroundCtx, interfaceCtx, spriteCtx, spritesImage, frog, player } from './state.js';
import { lanes } from './entities.js';

export function showStartScreen() {
    interfaceCtx.fillStyle = "black";
    interfaceCtx.fillRect(0, 0, 400, 565);
    interfaceCtx.drawImage(spritesImage, 0, 0, 340, 50, 105, 130, 200, 100);
    interfaceCtx.fillStyle = "green";
    interfaceCtx.fillRect(155, 280, 100, 50);
    interfaceCtx.fillStyle = "black";
    interfaceCtx.font = "30px serif";
    interfaceCtx.fillText("Start", 175, 315);
}

export function renderBackground() {
    backgroundCtx.fillStyle = "black";
    backgroundCtx.fillRect(0, 0, 400, 565);
    backgroundCtx.fillStyle = "blue";
    backgroundCtx.fillRect(0, 45, 400, 235);
    // Frogger logo
    backgroundCtx.drawImage(spritesImage, 0, 0, 340, 50, 105, -10, 200, 60);
    // Grass
    backgroundCtx.drawImage(spritesImage, 0, 53, 400, 55, -20, 40, 460, 50);
    // Bottom purple strip
    backgroundCtx.drawImage(spritesImage, 0, 118, 400, 35, 0, 480, 400, 30);
    // Top purple strip
    backgroundCtx.drawImage(spritesImage, 0, 118, 400, 35, 0, 275, 400, 15);
}

export function renderFrog() {
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
}

export function renderLives() {
    let x = 7;
    for (let i = 0; i < player.lives; i++) {
        backgroundCtx.drawImage(spritesImage, 0, 335, 40, 30, x, 520, 30, 20);
        x += 20;
    }
}

export function renderScore() {
    backgroundCtx.fillStyle = "yellow";
    backgroundCtx.font = "20px serif";
    backgroundCtx.fillText("Score:", 7, 555);
    backgroundCtx.fillText(`${player.score}`, 65, 555);
}

export function renderTime() {
    backgroundCtx.fillStyle = "yellow";
    backgroundCtx.font = "30px serif";
    backgroundCtx.fillText("Time:", 275, 555);
    backgroundCtx.fillText(`${player.time}`, 350, 555);
}

export function renderSprites() {
    for (let i = 0; i < lanes.length; i++) {
        for (let j = 0; j < lanes[i].sprites.length; j++) {
            let sprite = lanes[i].sprites[j];
            spriteCtx.drawImage(
                spritesImage,
                sprite.ix, sprite.iy, sprite.width, sprite.height,
                sprite.x, lanes[i].y, sprite.width, sprite.height
            );
        }
    }
}
