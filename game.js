var cvs = document.getElementById("iframe");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var flameUp = new Image();
var flameDown = new Image();
var cakepng = new Image();

bird.src = "Spider.png";
bg.src = "bg.png";
fg.src = "fg.png";
flameUp.src = "flameUp.gif";
flameBottom.src = "VflameDown.gif";
cakepng.src = "cake.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "fly.mp3";
score_audio.src = "score.mp3";

var gap = 100;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 25;
 fly.play();
}

// Создание блоков
var flame = [];

flame[0] = {
 x : cvs.width,
 y : 0
}
var cake = [];
cake[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;



function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < flame.length; i++) {
 ctx.drawImage(flameUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(flameBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
 ctx.drawImage(cakepng, pipe[i].x, pipe[i].y+pipeUp.height+30);

 flame[i].x--;

 if(flame[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random(0,10) * flameUp.height) - flameUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= flame[i].x
 && xPos <= flame[i].x + flameeUp.width
 && (yPos <= flame[i].y + flameUp.height
 || yPos + bird.height >= flame[i].y + flameUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 score = 0; // Перезагрузка страницы
 }


 if(flame[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

flameBottom.onload = draw;
