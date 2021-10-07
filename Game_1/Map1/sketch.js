var mapdata = fetch("mapdata.json")
.then(response => {
  return response.json();
})
.then(data => mapdata = data);

const canvasDiv = document.getElementById('myCanvas');
let parentWidth = canvasDiv.offsetWidth; // width of browser window
let parentHeight = canvasDiv.offsetHeight; // height of browser window
let canvas;

function setup() {
    canvas = createCanvas(parentWidth,parentHeight);

    Circle(0,0,0,0,0,0,0);
}
  
function draw() {
    background(255);

    text(frameRate().toLocaleString(undefined,{ maximumFractionDigits: 0 })
          ,10,30);

    circle(mouseX,mouseY,30);
}

function onResize() {
  parentWidth = canvasDiv.offsetWidth; // width of browser window
  parentHeight = canvasDiv.offsetHeight; // height of browser window

  resizeCanvas(parentWidth, parentHeight); // resize the window
}