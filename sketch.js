var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth; // width of browser window
var parentHeight = canvasDiv.offsetHeight; // height of browser window
var description;
var descriptionText = 'Game Description';

function setup() {
  canvas = createCanvas(parentWidth, parentHeight);

  textAlign(CENTER,CENTER);
  description = text(descriptionText, parentWidth / 2, parentHeight - 25)

  rect(0, 0, width / 2, (height - 50) / 2);
  rect(width / 2, 0, width / 2, (height - 50) / 2);
  rect(0, (height - 50) / 2, width / 2, (height - 50) / 2);
  rect(width / 2, (height - 50) / 2, width / 2, (height - 50) / 2);
}

function draw() {
  stroke('black');
  fill('red');
  rect(0, 0, width / 2, (height - 50) / 2);
  fill('blue');
  rect(width / 2, 0, width / 2, (height - 50) / 2);
  fill('green');
  rect(0, (height - 50) / 2, width / 2, (height - 50) / 2);
  fill('yellow');
  rect(width / 2, (height - 50) / 2, width / 2, (height - 50) / 2);

  fill('white');
  noStroke();
  rect(0, height - 50, width, 50);

  if (mouseY < height - 50) { // hand is in menus
    if (mouseY < (height - 50) / 2) { // top half
      if (mouseX < width / 2) { // left half
        descriptionText = 'Osu! - Aidan Labourdette\nA game where you click the circles';
      } else {
        descriptionText = 'Game 2';
      }
    } else if (mouseY < (height - 50)) { // bottom half
      if (mouseX < width / 2) { // left half
        descriptionText = 'Game 3';
      } else {
        descriptionText = 'Game 4';
      }
    } else {
      descriptionText = 'Game Description';
    }
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  fill('black');
  textSize(20);
  text(descriptionText, parentWidth / 2, parentHeight - 25)
}

function mouseClicked() {
  if (mouseY < (height - 50) / 2) { // top half
    if (mouseX < width / 2) { // left half
      window.location.href = 'Game_1';
    } else {
      window.location.href = 'Game_2';
    }
  } else if (mouseY < (height - 50)) { // bottom half
    if (mouseX < width / 2) { // left half
      window.location.href = 'Game_3';
    } else {
      window.location.href = 'Game_4';
    }
  }
}