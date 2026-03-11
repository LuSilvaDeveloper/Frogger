import { Sprite } from './Sprite.js';
import { Lane } from './Lane.js';

// --- Vehicles ---
export let pink1 = new Sprite(31, 22, 8, 266, 200);
export let pink2 = new Sprite(31, 22, 8, 266, 200);
export let pink3 = new Sprite(31, 22, 8, 266, 200);
export let pink4 = new Sprite(31, 22, 8, 266, 200);
export let yellow1 = new Sprite(27, 30, 80, 262, 0);
export let yellow2 = new Sprite(27, 30, 80, 262, 0);
export let truck1 = new Sprite(46, 20, 105, 301, 10);
export let truck2 = new Sprite(46, 20, 105, 301, 100);
export let truck3 = new Sprite(46, 20, 105, 301, 200);
export let truck4 = new Sprite(46, 20, 105, 301, 350);
export let tractor1 = new Sprite(28, 26, 43, 264, 120);
export let shipWheel = new Sprite(25, 23, 10, 300, 200);

// --- Logs (biggest) ---
export let trunk1 = new Sprite(180, 21, 7, 166, 30);
export let trunk2 = new Sprite(180, 21, 7, 166, 15);
export let trunk3 = new Sprite(180, 21, 7, 166, 210);
// --- Logs (medium) ---
export let trunk4 = new Sprite(117, 20, 6, 199, 30);
export let trunk5 = new Sprite(117, 20, 6, 199, 200);
export let trunk6 = new Sprite(117, 20, 6, 199, 30);
export let trunk7 = new Sprite(117, 20, 6, 199, 180);
// --- Logs (small) ---
export let trunk8 = new Sprite(85, 19, 6, 230, 10);
export let trunk9 = new Sprite(85, 19, 6, 230, 130);
export let trunk10 = new Sprite(85, 19, 6, 230, 240);
export let trunk11 = new Sprite(85, 19, 6, 230, 30);
export let trunk12 = new Sprite(85, 19, 6, 230, 150);
export let trunk13 = new Sprite(85, 19, 6, 230, 260);

// --- Road lanes ---
export let roadLine1 = new Lane(-1, 5, [pink1, pink2, pink3], 450, false);
export let roadLine2 = new Lane(1, 2, [shipWheel], 420, false);
export let roadLine3 = new Lane(-1, 15, [yellow1, yellow2], 390, false);
export let roadLine4 = new Lane(1, 7, [tractor1], 360, false);
export let roadLine5 = new Lane(-1, 7, [truck1, truck2, truck3, truck4], 330, false);
export let roadLine6 = new Lane(-1, 2, [pink4], 300, false);

// --- River lanes ---
export let riverLine1 = new Lane(-1, 5, [trunk1], 240, true);
export let riverLine2 = new Lane(-1, 10, [trunk4, trunk5], 210, true);
export let riverLine3 = new Lane(1, 7, [trunk8, trunk9, trunk10], 180, true);
export let riverLine4 = new Lane(-1, 15, [trunk2, trunk3], 150, true);
export let riverLine5 = new Lane(1, 3, [trunk11, trunk12, trunk13], 120, true);
export let riverLine6 = new Lane(1, 20, [trunk6, trunk7], 90, true);

export let lanes = [
    roadLine1, roadLine2, roadLine3, roadLine4, roadLine5, roadLine6,
    riverLine1, riverLine2, riverLine3, riverLine4, riverLine5, riverLine6,
];
