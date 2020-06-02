enum Buttons {
    a,
    b,
    left,
    right,
    up,
    down
}

function IsDown(button: any) {
    if (button == Buttons.a && controller.A.isPressed()) {
        return true;
    }
    if (button == Buttons.b && controller.B.isPressed()) {
        return true;
    }
    if (button == Buttons.left && controller.left.isPressed()) {
        return true;
    }
    if (button == Buttons.right && controller.right.isPressed()) {
        return true;
    }
    if (button == Buttons.up && controller.up.isPressed()) {
        return true;
    }
    if (button == Buttons.down && controller.down.isPressed()) {
        return true;
    }
    return false;
}

function Clamp(a: number, b: number, c: number) {
    if (a < b || a > c) {
        if (a < b) {
            a = b;
        }
        else {
            a = c;
        }
    }
    return a;
}

function RandomInt(num: number) {
    return Math.floor(Math.random() * num);
}

function DistanceBetween(a : Sprite, b : Sprite) {
    return Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)))
}
function Collision(a : Sprite, b : Sprite, s : number) {
    s = Clamp(s, 0, 1);
    if(DistanceBetween(a, b) < (a.width + b.width) * s)
    {
        return a.x - a.width / 2 < b.x + b.width / 2 &&
            a.x + a.width / 2 > b.x - b.width / 2 &&
            a.y - a.height / 2 < b.y + b.height / 2 &&
            a.y + a.height / 2 > b.y - b.height / 2;
    }
    return false;
}