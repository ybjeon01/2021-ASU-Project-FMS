let mapdata, mapping, canvas, backgroundImage, isPlaying, song;
let circles; // array of circles
let active; // array of active circles
const canvasDiv = document.getElementById('myCanvas');
let parentWidth = canvasDiv.offsetWidth; // width of browser window
let parentHeight = canvasDiv.offsetHeight; // height of browser window

let cursorImg, cursorMiddleImg, cursorTrail, cursorTrailArray, particleImg, particleImg2, particleArray;

let gameScore, gameDisplayedScore;

let previousX, previousY;

let approachCircleImg, circleImg, circleOverlayImg;

let temp;

fetch("mapdata.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    mapdata = data;
  });

fetch("mapping.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    mapping = data;
  });


// disable right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
}, false);

function createParticle() {
  xVel = 0;
  if (keyIsDown(88)) {
    xVel = 5;
  } else if (keyIsDown(90)) {
    xVel = -5;
  }
  xVel *= Math.random() * 2;
  transparency = Math.floor(Math.random() * 127) + 63;
  yVel = 5 + (Math.random() * 2 - 1);
  return { mouseX, mouseY, xVel, yVel, lifetime: 60, transparency };
}

function addCircle(x, y, diameter, diameter2) {
  imageMode(CENTER);
  image(circleImg, x, y, diameter, diameter);
  image(circleOverlayImg, x, y, diameter, diameter);
  image(approachCircleImg, x, y, diameter2, diameter2)
}

function difference(x1, y1, x2, y2) {
  xDiff = Math.abs(x2 - x1);
  yDiff = Math.abs(y2 - y1);
  return xDiff + yDiff;
}

function preload() {
  song = loadSound('My_Love.mp3');

  backgroundImage = loadImage('cover.jpg');

  cursorImg = loadImage('/Game_1/Game_Components/assets/cursor.png');
  cursorMiddleImg = loadImage('/Game_1/Game_Components/assets/cursormiddle.png');
  cursorTrail = loadImage('/Game_1/Game_Components/assets/cursortrail.png');
  particleImg = loadImage('/Game_1/Game_Components/assets/star.png');
  particleImg2 = loadImage('/Game_1/Game_Components/assets/star2.png');
  approachCircleImg = loadImage('/Game_1/Game_Components/assets/approachcircle.png');
  circleImg = loadImage('/Game_1/Game_Components/assets/hitcircle.png');
  circleOverlayImg = loadImage('/Game_1/Game_Components/assets/hitcircleoverlay.png')

  particleArray = [];
  cursorTrailArray = [];
  circles = [];
  active = [];
}

function setup() {
  canvas = createCanvas(parentWidth, parentHeight);

  isPlaying = true;

  frameRate(120);

  console.log(mapdata);
  console.log(mapping);

  gameScore = 0;
  gameDisplayedScore = 0;

  temp = new Circle(4, 4, 4, 50, 50, 'red', 1, 5);

  console.log(temp);

  circles.push(temp);
  circles.push(new Circle(4, 4, 4, 150, 250, 'red', 1, 7))

  previousX = mouseX;
  previousY = mouseY;

  noCursor();
  song.play();
}

function draw() {
  imageMode(CORNER);
  background(backgroundImage);

  if (gameScore < 1000) {
    gameScore += 100;
  }

  let currentTime = song.currentTime();

  for (let i = 0; i < circles.length; i++) {
    if (!circles[i].isActive && currentTime > (circles[i].time - 1)) {
      active.push(circles[i]);
      circles[i].isActive = true;
      circles.splice(i, 1);
    }
  }

  for (let i = active.length - 1; i >= 0; i--) {
    let response = active[i].update(currentTime);
    if (response === -1) {
      active.splice(i, 1);
    }
  }

  // Cursor
  imageMode(CENTER);
  while (cursorTrailArray.length >= 10) {
    cursorTrailArray.shift();
  }

  let newX = mouseX + (Math.random() * 4 - 2);
  cursorTrailArray.push({ mouseX: newX, mouseY, visibility: 255 });

  cursorTrailArray.forEach(element => {
    tint(255, Math.floor(element.visibility));
    image(cursorTrail, element.mouseX, element.mouseY);
    element.visibility -= 8.5;
  });

  if (Math.floor(Math.random() * 4) === 1) {
    particleArray.push(createParticle());
  }
  particleArray.forEach(element => {
    element.mouseX += element.xVel;
    tint(255, element.transparency);
    image(particleImg, element.mouseX, element.mouseY);
    image(particleImg2, element.mouseX, element.mouseY);
    element.mouseY += yVel;
    element.xVel /= 1.04;
    element.lifetime--;
    if (element.lifetime === 0) {
      index = particleArray.indexOf(element);
      if (index > -1) {
        particleArray.splice(index, 1);
      }
    }
  });

  tint(255, 255);
  image(cursorImg, mouseX, mouseY);
  image(cursorMiddleImg, mouseX, mouseY);

  // FPS
  textAlign(LEFT);
  noStroke();
  fill(0);
  text(frameRate().toLocaleString(undefined, { maximumFractionDigits: 0 })
    , 10, 20);

  // Score
  textAlign(RIGHT);
  if (gameDisplayedScore < gameScore) {
    gameDisplayedScore += 5;
  }
  text(gameDisplayedScore, parentWidth - 10, 20);

  previousX = mouseX;
  previousY = mouseY;
}

function onResize() {
  parentWidth = canvasDiv.offsetWidth; // width of browser window
  parentHeight = canvasDiv.offsetHeight; // height of browser window

  resizeCanvas(parentWidth, parentHeight); // resize the window
}

function mouseClicked() {
  for (let i = 0; i < active.length; i++) {
    let clickData = active[i].click(mouseX, mouseY, song.currentTime());
    if (clickData === -1) { // fail
      break;
    } else if (clickData === 1) { // success
      break;
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case 90: // z

      particleArray.push(createParticle());
      break;

    case 88: // x

      particleArray.push(createParticle());
      break;

    case 27: // escape
      if (isPlaying) { // pauses
        song.pause();
        frameRate(0);
        cursor(ARROW);
        isPlaying = false;
      } else { // resumes
        frameRate(120);
        song.play();
        noCursor();
        isPlaying = true;
      }
      break;

    case 70: // f
      fullscreen(!fullscreen());
      break;

    default:
      console.log('Key Pressed: ' + keyCode);
      break;
  }
}