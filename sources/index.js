import { interfaceCanvas } from './modules/state.js';
import { showStartScreen } from './modules/renderer.js';
import { startGame, moveFrog } from './modules/game.js';

interfaceCanvas.addEventListener("click", startGame);
document.addEventListener("keydown", moveFrog);

window.addEventListener("load", showStartScreen);
