var mapdata = fetch("mapdata.json")
.then(response => {
  return response.json();
})
.then(data => mapdata = data);

const canvasDiv = document.getElementById('myCanvas');
const parentWidth = canvasDiv.offsetWidth; // width of browser window
const parentHeight = canvasDiv.offsetHeight; // height of browser window

function setup() {
    createCanvas(parentWidth,parentHeight);

    Circle(0,0,0,0,0,0,0);
}
  
function draw() {
    background(255);

    text(frameRate().toLocaleString(undefined,{ maximumFractionDigits: 0 })
          ,10,30);

    circle(mouseX,mouseY,30);
}