//View > Command Plalet > Open with live server or right click index.html
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;



function setup() {
  createCanvas(parentWidth, parentHeight);
}

var bird;
var pipes = [];

function setup() {
  createCanvas(parentWidth, parentHeight);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(50);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
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

function keyPressed() {
  if (key == ' ') {
    bird.jump();
    console.log("SPACE");
  }
}
