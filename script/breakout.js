//var vts = vts();
let params = new URLSearchParams(document.location.search);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var vts = params.get('mode')
var dx = vts; // Ball x direction 
var dy = -vts; // Ball y direction
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var leftPressed = false;
var rightPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var bricks = [];
var maxHitPoints = 1;
var colours = ['red'];
if (vts == 1){
  var colours = ['red', 'orange', 'yellow'];
  maxHitPoints = 3;
}
else if (vts == 2){
    var colours = ['red', 'orange', 'yellow', 'green', 'blue'];
    maxHitPoints = 5;
}
else if (vts ==4){
  var colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  maxHitPoints = 7;
}
var colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
initBricks();

function initBricks() {
  for (var brickCol = 0; brickCol < brickColumnCount; brickCol++) {
    bricks[brickCol] = [];
    for (var brickRow = 0; brickRow < brickRowCount; brickRow++) {
      bricks[brickCol][brickRow] = {
        x: 0,
        y: 0,
        hitPoints: maxHitPoints
      };
    }
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
  if (paddleX > canvas.width - paddleWidth) {
    paddleX = canvas.width - paddleWidth;
  } else if (paddleX < 0) {
    paddleX = 0;
  }
}

function collisionDetection() {
  for (var brickCol = 0; brickCol < brickColumnCount; brickCol++) {
    for (var brickRow = 0; brickRow < brickRowCount; brickRow++) {
      var brick = bricks[brickCol][brickRow];
      if (brick.hitPoints > 0) {
        if (x > brick.x && x - 10 < (brick.x + brickWidth) &&
          y> brick.y && y - 4 < (brick.y + brickHeight)) {
          dy = -dy;
          brick.hitPoints--;
          score++;
          if(score >= brickRowCount*brickColumnCount *maxHitPoints) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}


function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}



function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBat() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBrick(x, y, colour) {
  ctx.beginPath();
  ctx.rect(x, y, brickWidth, brickHeight);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  var brickHP;
  var brickColour;
  for (var brickCol = 0; brickCol < brickColumnCount; brickCol++) {
    for (var brickRow = 0; brickRow < brickRowCount; brickRow++) {
      if (bricks[brickCol][brickRow].hitPoints > 0) {
        var brickX =  brickRow * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY =  brickCol * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[brickCol][brickRow].x = brickX;
        bricks[brickCol][brickRow].y = brickY;
        brickHP = bricks[brickCol][brickRow].hitPoints
        brickColour = colours[brickHP - 1];
        drawBrick(brickX, brickY, brickColour);
      }
    }
  }
}

function endGame(message) {
  alert(message);
  document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawBat();
  drawScore();
  collisionDetection();
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);