var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth; // width of browser window
var parentHeight = canvasDiv.offsetHeight; // height of browser window
var description;
var descriptionText = 'Game Description';

function setup() {
    canvas = createCanvas(parentWidth,parentHeight);

    textAlign(CENTER);
    description = text(descriptionText,parentWidth/2,parentHeight-25)

    game1 = rect(0,0,width/2,(height-50)/2);
    game2 = rect(width/2,0,width/2,(height-50)/2);
    game3 = rect(0,(height-50)/2,width/2,(height-50)/2);
    game4 = rect(width/2,(height-50)/2,width/2,(height-50)/2);
  }
  
  function draw() {
    fill(color('white'));
    noStroke();
    rect(0,height-50,width,50);
    if (mouseY < (height-50)/2) { // top half
      if (mouseX < width/2) { // left half
          descriptionText = 'Game 1';
      } else {
          descriptionText = 'Game 2';
      }
    } else if (mouseY < (height-50)) { // bottom half
      if (mouseX < width/2) { // left half
          descriptionText = 'Game 3';
      } else {
          descriptionText = 'Game 4';
      }
    } else {
      descriptionText = 'Game Description';
    }
    fill(color('black'));
    text(descriptionText,parentWidth/2,parentHeight-25)
  }

  function mouseClicked() {
    if (mouseY < (height-50)/2) { // top half
        if (mouseX < width/2) { // left half
            window.location.href = 'Game_1';
        } else {
            window.location.href = 'Game_2';
        }
    } else if (mouseY < (height-50)) { // bottom half
        if (mouseX < width/2) { // left half
            window.location.href = 'Game_3';
        } else {
            window.location.href = 'Game_4';
        }
    }
  }