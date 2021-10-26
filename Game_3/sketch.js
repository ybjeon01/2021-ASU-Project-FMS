//View > Command Plalet > Open with live server or right click index.html
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;
var gameOver = false;
var gameOverScreenEnabled = false;


var bird;
var pipes = [];

function setup() {
  createCanvas(parentWidth, parentHeight);
  bird = new Bird();
  pipes.push(new Pipe());

}

function draw() {

  if(gameOver)
  {
    if(!gameOverScreenEnabled)
    {
      fill(0,0,0,150);
      rect(0, 0, parentWidth, parentHeight);
      gameOverScreenEnabled = true;
      button = createButton('Restart');
      button.position(parentWidth / 2 - 100, parentHeight / 2);
      button.size(200,50);
      button.mousePressed(restartGame)
    }

  }
  else
  {
    background(50);

    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        gameOver = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }
  }

}

function restartGame()
{
  window.location.reload();
}

function keyPressed() {
  if (key == ' ') {
    bird.jump();
    console.log("SPACE");
  }
}
