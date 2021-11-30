//View > Command Plalet > Open with live server or right click index.html
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;
var gameOver = false;
var gameOverScreenEnabled = false;
var score = 0;

var bird;
var pipes = [];

let frames = [];
let numFrames = 19   ;
let x, y;
let whichFrame = 0;

function preload() {
  for (let i = 0; i < numFrames; i++)
  {
    let filename = 'birdAnimation/' + i + '.png';
    let frame = loadImage(filename);
    frames.push(frame);
  }
}

function setup() {
  
  createCanvas(parentWidth, parentHeight); 
  bird = new Bird();
  pipes.push(new Pipe());
  scoreSound = loadSound('ScoreSoundEffect.mp3');

}

function draw() {
  background(61, 72, 73);

 

  if(whichFrame === frames.length)
  {
    whichFrame = 0;
  }

  if(gameOver)
  {
    make_score_list("game3");
    let score_list = get_score_list("game3");
    add_to_score_list("game3", this.score);

    if(!gameOverScreenEnabled)
    {
      fill(0,0,0,150);
      rect(0, 0, parentWidth, parentHeight);
      gameOverScreenEnabled = true;

      restartButton = createButton('Restart');
      restartButton.position(parentWidth / 2 - 200, parentHeight / 3);
      restartButton.size(400,100);
      restartButton.mousePressed(restartGame)

      mainMenuButton = createButton('Main Menu');
      mainMenuButton.position(parentWidth / 2 - 200, parentHeight / 2);
      mainMenuButton.size(400,100);
      mainMenuButton.mousePressed(returnToMainMenu)
    }
  }
  else
  {
    imageMode(CENTER);
    image(frames[whichFrame], bird.x, bird.y );
    whichFrame += 1;

    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        gameOver = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }

      if (pipes[i].birdPasses(bird))
      {
        this.score = this.score + 1;
        scoreSound.play();
      }
      if (bird.y >= this.parentHeight)
      {
        gameOver = true;
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }
  }
  textSize(100);
  text(this.score, parentWidth - 180, parentHeight / 5);
  fill(0, 102, 153);

}

function restartGame()
{
  window.location.reload();
}
function returnToMainMenu()
{
  window.location.href = "/2021-ASU-Project-FMS/";
}

function keyPressed() {
  if (key == ' ') {
    bird.jump();
    console.log("SPACE");
  }
}

function get_score_list(gameName) {
  return JSON.parse(localStorage.getItem(`${gameName}-scoreList`));
}

function add_to_score_list(gameName, score) {
  let arr = get_score_list(gameName);

  if (!arr.includes(score)) {
    arr.push(score);
    arr.sort((a, b) => b-a);
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify(arr));
  }
}

function make_score_list(gameName) {
  let scoreList = localStorage.getItem(`${gameName}-scoreList`);
  if (scoreList === null) {
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify([]));
  }
}