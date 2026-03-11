export let interfaceCanvas = document.getElementById("interfaceCanvas");
export let spriteCanvas = document.getElementById("spriteCanvas");
export let backgroundCanvas = document.getElementById("backgroundCanvas");

export let interfaceCtx = interfaceCanvas.getContext("2d");
export let spriteCtx = spriteCanvas.getContext("2d");
export let backgroundCtx = backgroundCanvas.getContext("2d");

export let spritesImage = new Image();
spritesImage.src = "assets/sprites.png";

export let deadImage = new Image();
deadImage.src = "assets/dead.png";

export let frog = {
    x: 165,
    y: 480,
    direction: "up",
    speed: 30,
    width: 40,
    height: 30,
};

export let player = {
    time: 60,
    lives: 5,
    state: "start",
    score: 0,
    safeHomes: [true, true, true, true],
};
