let mapdata, mapping, canvas, backgroundImage, isPlaying, song;
let circles; // array of circles
let active; // array of active circles
const canvasDiv = document.getElementById('myCanvas');
let parentWidth = canvasDiv.offsetWidth; // width of browser window
let parentHeight = canvasDiv.offsetHeight; // height of browser window

let cursorImg, cursorMiddleImg, cursorTrail, cursorTrailArray, particleImg, particleImg2, particleArray;

let gameScore, gameDisplayedScore, combo;

let previousX, previousY;

let approachCircleImg, circleImg, circleOverlayImg;

let successSound, missSound;

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
  newX = mouseX + (Math.random() * 10 - 5);
  xVel = 0;
  if (keyIsDown(88) || mouseButton === RIGHT) {
    xVel = 5;
  } else if (keyIsDown(90) || mouseButton === LEFT) {
    xVel = -5;
  }
  xVel *= Math.random() * 2;
  transparency = Math.floor(Math.random() * 127);
  yVel = 5 + (Math.random() * 2 - 1);
  return { mouseX: newX, mouseY, xVel, yVel, lifetime: 50, transparency };
}

function addCircle(x, y, diameter, diameter2, color, number) {
  imageMode(CENTER);
  tint(color.r, color.g, color.b);
  image(circleImg, x, y, diameter, diameter);
  tint(255,255,255);
  image(circleOverlayImg, x, y, diameter, diameter);
  tint(color.r, color.g, color.b);
  image(approachCircleImg, x, y, diameter2, diameter2);
  tint(255,255,255);
  textAlign(CENTER, CENTER);
  strokeWeight(3);
  stroke(0);
  fill(255);
  textSize(diameter / 2);
  text(number, x, y);
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
  circleOverlayImg = loadImage('/Game_1/Game_Components/assets/hitcircleoverlay.png');

  successSound = loadSound('/Game_1/Game_Components/assets/drum-hitnormal.wav');
  missSound = loadSound('/Game_1/Game_Components/assets/combobreak.mp3');

  particleArray = [];
  cursorTrailArray = [];
  circles = [];
  active = [];
}

function setup() {
  canvas = createCanvas(parentWidth, parentHeight);

  isPlaying = true;

  frameRate(60);

  console.log(mapdata);
  console.log(mapping);

  gameScore = 0;
  gameDisplayedScore = 0;
  combo = 1;

  temp = new Circle(4, 4, 4, 50, 50, {r:77,g:139,b:217}, 1, 5);

  console.log(temp);

  circles.push(temp);
  circles.push(new Circle(4, 4, 4, 150, 250, {r:255,g:0,b:0}, 1, 7))

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

  // Circles
  for (let i = 0; i < circles.length; i++) {
    if (currentTime > (circles[i].time - 2)) {
      active.push(circles[i]);
      circles.splice(i, 1);
    }
  }

  for (let i = active.length - 1; i >= 0; i--) {
    let response = active[i].update(currentTime);
    if (response === -1) {
      active.splice(i, 1);
      missSound.play();
    }
  }

  // Cursor
  imageMode(CENTER);
  while (cursorTrailArray.length >= 20) {
    cursorTrailArray.shift();
  }

  cursorTrailArray.push({ mouseX, mouseY, visibility: 255 });

  cursorTrailArray.forEach(element => {
    tint(255, Math.floor(element.visibility));
    image(cursorTrail, element.mouseX, element.mouseY);
    element.visibility -= 10;
  });

  if (Math.floor(Math.random() * 4) === 0) {
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
  textAlign(LEFT,TOP);
  strokeWeight(2);
  stroke(0);
  fill(255);
  textSize(26);
  text(frameRate().toLocaleString(undefined, { maximumFractionDigits: 0 })
    , 10, 10);

  // Score
  textAlign(RIGHT,TOP);
  if (gameDisplayedScore < gameScore) {
    gameDisplayedScore += 5;
  }
  text("SCORE " + gameDisplayedScore, parentWidth - 10, 10);

  // Combo
  textAlign(LEFT,BOTTOM);
  text("COMBO " + combo + "X", 10, parentHeight - 10);

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
      active.splice(i, 1);
      missSound.play();
      combo = 1;
      break;
    } else if (clickData === 1) { // success
      active.splice(i, 1);
      successSound.play();
      gameScore += 300 * combo;
      combo++;
      break;
    }
  }

  particleArray.push(createParticle());
}

function keyPressed() {
  switch (keyCode) {
    case 90: // z
      for (let i = 0; i < active.length; i++) {
        let clickData = active[i].click(mouseX, mouseY, song.currentTime());
        if (clickData === -1) { // fail
          active.splice(i, 1);
          missSound.play();
          combo = 1;
          break;
        } else if (clickData === 1) { // success
          active.splice(i, 1);
          successSound.play();
          gameScore += 300 * combo;
          combo++;
          break;
        }
      }
      particleArray.push(createParticle());
      break;

    case 88: // x
      for (let i = 0; i < active.length; i++) {
        let clickData = active[i].click(mouseX, mouseY, song.currentTime());
        if (clickData === -1) { // fail
          active.splice(i, 1);
          missSound.play();
          combo = 1;
          break;
        } else if (clickData === 1) { // success
          active.splice(i, 1);
          successSound.play();
          gameScore += 300 * combo;
          combo++;
          break;
        }
      }
      particleArray.push(createParticle());
      break;

    case 27: // escape
      if (isPlaying) { // pauses
        song.pause();
        frameRate(0);
        cursor(ARROW);
        isPlaying = false;
      } else { // resumes
        frameRate(60);
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