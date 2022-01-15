let dima, bg, fg, up, botton, defGap, block, pizda;

const canvas = document.getElementById('app');
const context = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

dima = new Image(); // Dima Xyesos
bg = new Image();
fg = new Image();
up = new Image();
botton = new Image();
pizda = new Audio();

dima.src    = "resources/dima.png";
bg.src      = "resources/bgg.png";
up.src      = "resources/up.png";
botton.src  = "resources/down.png";
pizda.src   = "resources/dima_pizda.mp3";

defGap = 90;

let bX, bY, gravity;

bX = 10;
bY = 150;
gravity = 1;

document.addEventListener("keydown", mUp);

function mUp() {
    bY -= 25;
}

block = [
    {
        x: canvas.width,
        y: 0
    }
];
block[0] = {
    x: 150,
    y: 0
}

function drawStaff() {
    pizda.play();

    context.drawImage(bg, 0, 0);
    
    context.drawImage(dima, bX, bY);

    for (let i = 0; i < block.length; i++) {
        context.drawImage(up, block[i].x, block[i].y);
        context.drawImage(botton, block[i].x, block[i].y + up.height + defGap);

        block[i].x--;

        if (block[i].x === -30) {
            block.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 90) - 90
            })
        }

        if(bX + dima.width >= block[i].x
            && bX <= block[i].x + up.width
            && (bY <= block[i].y + up.height)
            && (bY <= block[i].y + up.height
            || bY + dima.height >= block[i].y + up.height + defGap)) {
                location.reload();
        }
    }

    bY += gravity;

    requestAnimationFrame(drawStaff);
}

botton.onload = drawStaff();