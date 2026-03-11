export function isPointCollision(px, py, bx, by, bw, bh) {
    let left = bx;
    let right = bx + bw;
    let top = by;
    let bottom = by + bh;
    if (px > left && px < right && py > top && py < bottom) {
        return true;
    } else {
        return false;
    }
}

export function isBoxCollision(b1x, b1y, b1w, b1h, b2x, b2y, b2w, b2h) {
    let distCenter = Math.sqrt(
        ((b1x + b1w / 2) - (b2x + b2w / 2)) ** 2 +
        ((b1y + b1h / 2) - (b2y + b2h / 2)) ** 2
    );

    if (distCenter < (b1w / 2 + b2w / 2) && distCenter < (b1h / 2 + b2h / 2)) {
        return true;
    } else {
        return false;
    }
}
