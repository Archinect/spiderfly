var cvs = document.getElementById("iframe");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "Spider.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeUp.src = "VetkaUp.png";
pipeBottom.src = "VetkaDown.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "fly.mp3";
score_audio.src = "score.mp3";

var gap = 200;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 25;
 fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function intersectRect(r1, r2) { 
return !(r2.left > r1.right || 
r2.right < r1.left || 
r2.top > r1.bottom || 
r2.bottom < r1.top); 
}

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 intersectRect(bird, pipe[i])


 if(pipe[i].x == 5) {
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

pipeBottom.onload = draw;
