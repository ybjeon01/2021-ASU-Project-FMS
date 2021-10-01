var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth; // width of browser window
var parentHeight = canvasDiv.offsetHeight; // height of browser window

function setup() {
    createCanvas(parentWidth,parentHeight);
  }
  
  function draw() {
    background(255);

    circle(mouseX,mouseY,30);
  }