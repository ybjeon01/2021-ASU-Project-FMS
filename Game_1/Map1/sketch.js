let mapdata, mapping, canvas, backgroundImage, isPlaying, song;
let circles; // array of circles
let active; // array of active circles
const canvasDiv = document.getElementById('myCanvas');
let parentWidth = canvasDiv.offsetWidth; // width of browser window
let parentHeight = canvasDiv.offsetHeight; // height of browser window

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

function preload() {
  song = loadSound('My_Love.mp3');

  backgroundImage = loadImage('cover.jpg');
  backgroundImage.filter(ERODE);
  backgroundImage.filter(BLUR, 10);

  circles = [];
  active = [];
}

function setup() {
  canvas = createCanvas(parentWidth, parentHeight);

  isPlaying = true;

  noCursor();
  frameRate(120);

  console.log(mapdata);
  console.log(mapping);

  temp = new Circle(4, 4, 4, 50, 50, 'red', 1, 5);

  console.log(temp);

  circles.push(temp);
  circles.push(new Circle(4, 4, 4, 150, 250, 'red', 1, 7))

  song.play();
}

function draw() {
  background(backgroundImage);

  let currentTime = song.currentTime();

  for (let i = 0; i < circles.length && i <= 5; i++) {
    if (!circles[i].isActive && currentTime > (circles[i].time - 5)) {
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

  stroke(0);
  fill(255);
  circle(mouseX, mouseY, 30);

  noStroke();
  fill(0);
  text(frameRate().toLocaleString(undefined, { maximumFractionDigits: 0 })
    , 10, 20);
}

function addCircle(x, y, diameter, diameter2) {
  stroke(0, 255, 0);
  fill(0, 0, 255)
  circle(x, y, diameter);

  noFill();
  circle(x, y, diameter2);
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
  console.log('Key Pressed: ' + keyCode);
  if (keyCode === 90) { // z key

  } else if (keyCode === 88) { // x key

  } else if (keyCode === 27) { // escape key
    if (isPlaying) { // pauses
      frameRate(0);
      song.pause();
      cursor(ARROW);
      isPlaying = false;
    } else { // resumes
      frameRate(120);
      song.play();
      noCursor();
      isPlaying = true;
    }
  } else if (keyCode === 70) { // f key
    fullscreen(!fullscreen());
  }
}