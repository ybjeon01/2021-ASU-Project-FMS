let mapdata, mapping, canvas, backgroundImage, isPlaying, song, isRightClick, isLeftClick;
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

let circlesNum, clickedCircles, mapAcc, displayedMapAcc;

let isMuted = false;

let isDataProcessed = false;

async function getData() {
  await fetch("mapdata.json")
    .then(response => {
      return response.json();
    }).then(data => {
      circleSize = data.circleSize;
      accuracy = data.accuracy;
      approachRate = data.approachRate;
    });

  await fetch("mapping.json")
    .then(response => {
      return response.json();
    }).then(data => {
      let mapping = data;
      for (let i = 0; i < mapping.map.length; i++) {
        let circle = new Circle(circleSize, accuracy, approachRate, mapping.map[i].X, mapping.map[i].Y, {
          "r": mapping.map[i].Color.r,
          "g": mapping.map[i].Color.g,
          "b": mapping.map[i].Color.b
        }, mapping.map[i].Number, mapping.map[i].Time, parentWidth);
        circles.push(circle);
      }
    });

  isDataProcessed = true;
}

// disable right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
}, false);

function createParticle() {
  newX = mouseX + (Math.random() * 10 - 5);
  xVel = 0;
  if (keyIsDown(88) || isRightClick) {
    xVel = 5;
  } else if (keyIsDown(90) || isLeftClick) {
    xVel = -5;
  }
  xVel *= Math.random() * 2;
  transparency = Math.floor(Math.random() * 127);
  yVel = 5 + (Math.random() * 2 - 1);
  return {
    mouseX: newX,
    mouseY,
    xVel,
    yVel,
    lifetime: 50,
    transparency
  };
}

function addCircle(x, y, diameter, diameter2, color, number) {
  imageMode(CENTER);
  tint(color.r, color.g, color.b);
  image(approachCircleImg, x * parentWidth / 1920, y * parentHeight / 1080, diameter2 * 2, diameter2 * 2);
  image(circleImg, x * parentWidth / 1920, y * parentHeight / 1080, diameter * 2, diameter * 2);
  tint(255, 255, 255);
  image(circleOverlayImg, x * parentWidth / 1920, y * parentHeight / 1080, diameter * 2, diameter * 2);
  textAlign(CENTER, CENTER);
  strokeWeight(3);
  stroke(0);
  fill(255);
  textSize(diameter);
  text(number, x * parentWidth / 1920, y * parentHeight / 1080);
}

function difference(x1, y1, x2, y2) {
  xDiff = Math.abs(x2 - x1);
  yDiff = Math.abs(y2 - y1);
  return xDiff + yDiff;
}

function preload() {

  song = loadSound('tutorial.ogg');
  backgroundImage = createVideo('background.webm');

  // remove video from the top of the screen, happens when you call createVideo()
  backgroundImage.hide();

  cursorImg = loadImage('../Game_Components/assets/cursor.png');
  cursorMiddleImg = loadImage('../Game_Components/assets/cursormiddle.png');
  cursorTrail = loadImage('../Game_Components/assets/cursortrail.png');
  particleImg = loadImage('../Game_Components/assets/star.png');
  particleImg2 = loadImage('../Game_Components/assets/star2.png');
  approachCircleImg = loadImage('../Game_Components/assets/approachcircle.png');
  circleImg = loadImage('../Game_Components/assets/hitcircle.png');
  circleOverlayImg = loadImage('../Game_Components/assets/hitcircleoverlay.png');

  successSound = loadSound('../Game_Components/assets/drum-hitnormal.wav');
  missSound = loadSound('../Game_Components/assets/combobreak.mp3');

  particleArray = [];
  cursorTrailArray = [];
  circles = [];
  active = [];

  getData();
}

function setup() {

  while (!isDataProcessed) {
    console.log("waiting for data");
  }

  canvas = createCanvas(parentWidth, parentHeight);

  isPlaying = true;

  frameRate(60);

  gameScore = 0;
  gameDisplayedScore = 0;
  combo = 0;

  previousX = mouseX;
  previousY = mouseY;

  circlesNum = 0;
  clickedCircles = 0;
  displayedMapAcc = 100;

  backgroundImage.onended(onSongEnd);

  backgroundImage.volume(1);

  noCursor();
  backgroundImage.play();
  //song.play();
}

function draw() {
  imageMode(CORNER);
  image(backgroundImage, 0, 0, parentWidth, parentHeight);

  let currentTime = backgroundImage.time();

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
      combo = 0;
      circlesNum++;
    }
  }

  // Cursor
  imageMode(CENTER);
  while (cursorTrailArray.length >= 20) {
    cursorTrailArray.shift();
  }

  cursorTrailArray.push({
    mouseX,
    mouseY,
    visibility: 255
  });

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
    image(particleImg, element.mouseX, element.mouseY, 30, 30);
    image(particleImg2, element.mouseX, element.mouseY, 30, 30);
    element.mouseY += yVel;
    element.xVel /= 1.04;
    element.lifetime--;
    if (element.lifetime <= 0) {
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
  textAlign(LEFT, TOP);
  strokeWeight(2);
  stroke(0);
  fill(255);
  textSize(26);
  text(frameRate().toLocaleString(undefined, {
    maximumFractionDigits: 0
  }), 10, 10);

  // Score
  textAlign(RIGHT, TOP);
  if (gameDisplayedScore < gameScore) {
    gameDisplayedScore += Math.floor(Math.random() * (gameScore - gameDisplayedScore) + 1);
  }

  if (gameDisplayedScore >= gameScore) {
    gameDisplayedScore = gameScore;
  }
  text("SCORE " + gameDisplayedScore.toLocaleString(undefined), parentWidth - 10, 10);

  // Accuracy
  if (circlesNum > 0) {
    mapAcc = Math.floor((clickedCircles / circlesNum) * 10000) / 100;
  } else {
    mapAcc = 100;
  }

  if (displayedMapAcc < mapAcc) {
    displayedMapAcc += 0.2 * (mapAcc - displayedMapAcc);
  } else if (displayedMapAcc > mapAcc) {
    displayedMapAcc -= 0.2 * (displayedMapAcc - mapAcc);
  }

  text(displayedMapAcc.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }) + "%", parentWidth - 10, 40);

  // Combo
  textAlign(LEFT, BOTTOM);
  text("COMBO " + combo + "X", 10, parentHeight - 10);

  previousX = mouseX;
  previousY = mouseY;
}

function onResize() {
  parentWidth = canvasDiv.offsetWidth; // width of browser window
  parentHeight = canvasDiv.offsetHeight; // height of browser window

  resizeCanvas(parentWidth, parentHeight); // resize the window
}

function onSongEnd() {
  frameRate(0);
  backgroundImage.stop();
  isPlaying = false;

  document.getElementById("defaultCanvas0").style.display = "none";
  document.getElementById("result_screen").style.display = "grid";
  document.getElementById("result_score").innerHTML = gameScore.toLocaleString(undefined) + " points";
  document.getElementById("result_accuracy").innerHTML = mapAcc + "%";
  document.getElementById("result_combo").innerHTML = combo + "X";
}

function mousePressed(event) {
  for (let i = 0; i < active.length; i++) {
    let clickData = active[i].click(mouseX, mouseY, backgroundImage.time());
    if (clickData === -1) { // fail
      active.splice(i, 1);
      missSound.play();
      combo = 0;
      circlesNum++;
      break;
    } else if (clickData === 1) { // success
      active.splice(i, 1);
      successSound.play();
      gameScore += 300 * (combo + 1);
      combo++;
      clickedCircles++;
      circlesNum++;
      break;
    }
  }

  if (event.button === 0) {
    isLeftClick = true;
  } else if (event.button === 2) {
    isRightClick = true;
  }
  particleArray.push(createParticle());
}

function mouseReleased(event) {
  if (event.button === 0) {
    isLeftClick = false;
  } else if (event.button === 2) {
    isRightClick = false;
  }
}

function keyPressed() {
  switch (keyCode) {
    case 90: // z
      for (let i = 0; i < active.length; i++) {
        let clickData = active[i].click(mouseX, mouseY, backgroundImage.time());
        if (clickData === -1) { // fail
          active.splice(i, 1);
          missSound.play();
          combo = 0;
          circlesNum++;
          break;
        } else if (clickData === 1) { // success
          active.splice(i, 1);
          successSound.play();
          gameScore += 300 * (combo + 1);
          combo++;
          clickedCircles++;
          circlesNum++;
          break;
        }
      }
      particleArray.push(createParticle());
      break;

    case 88: // x
      for (let i = 0; i < active.length; i++) {
        let clickData = active[i].click(mouseX, mouseY, backgroundImage.time());
        if (clickData === -1) { // fail
          active.splice(i, 1);
          missSound.play();
          combo = 0;
          break;
        } else if (clickData === 1) { // success
          active.splice(i, 1);
          successSound.play();
          gameScore += 300 * (combo + 1);
          combo++;
          clickedCircles++;
          break;
        }
      }
      particleArray.push(createParticle());
      break;

    case 27: // escape
      if (isPlaying) { // pauses
        backgroundImage.pause();
        frameRate(0);
        cursor(ARROW);
        isPlaying = false;
      } else { // resumes
        frameRate(60);
        backgroundImage.play();
        noCursor();
        isPlaying = true;
      }
      break;

    case 70: // f
      fullscreen(!fullscreen());
      break;

    case 80: // p
      if (isPlaying) { // pauses
        backgroundImage.pause();
        frameRate(0);
        cursor(ARROW);
        isPlaying = false;
      } else { // resumes
        frameRate(60);
        backgroundImage.play();
        noCursor();
        isPlaying = true;
      }
      break;

    case 77: // m
      if (isMuted) { // unmutes
        backgroundImage.volume(1);
        isMuted = false;
      } else { // mutes
        backgroundImage.volume(0);
        isMuted = true;
      }
      break;

    case 81: // q
      backgroundImage.stop(); // exit map
      break;

    default:
      console.log('Key Pressed: ' + keyCode);
      break;
  }
}