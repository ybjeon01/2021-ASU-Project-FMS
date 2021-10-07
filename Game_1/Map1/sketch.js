let mapdata, canvas, backgroundImage;
const canvasDiv = document.getElementById('myCanvas');
let parentWidth = canvasDiv.offsetWidth; // width of browser window
let parentHeight = canvasDiv.offsetHeight; // height of browser window

fetch("mapdata.json")
.then(response => {
  return response.json();
})
.then(data => {
  mapdata = data;
})

function setup() {
    canvas = createCanvas(parentWidth,parentHeight);
    backgroundImage = loadImage('cover.jpg');
    noCursor();

    Circle(0,0,0,0,0,0,0);

    console.log(mapdata);

}
  
function draw() {
    background(backgroundImage);

    circle(mouseX,mouseY,30);

    text(frameRate().toLocaleString(undefined,{ maximumFractionDigits: 0 })
          ,10,20);
}

function onResize() {
  parentWidth = canvasDiv.offsetWidth; // width of browser window
  parentHeight = canvasDiv.offsetHeight; // height of browser window

  resizeCanvas(parentWidth, parentHeight); // resize the window
}