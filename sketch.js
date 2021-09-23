var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth; // width of browser window
var parentHeight = canvasDiv.offsetHeight; // height of browser window
var description;

function setup() {
    createCanvas(parentWidth,parentHeight);

    textAlign(CENTER);
    description = text('Game Description',parentWidth/2,parentHeight-25)

    rect(0,0,width/2,(height-50)/2);
    rect(width/2,0,width/2,(height-50)/2);
    rect(0,(height-50)/2,width/2,(height-50)/2);
    rect(width/2,(height-50)/2,width/2,(height-50)/2);
  }
  
  function draw() {
  }