var mapdata = fetch("mapdata.json")
.then(response => {
  return response.json();
})
.then(data => mapdata = data);

console.log(mapdata);

var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth; // width of browser window
var parentHeight = canvasDiv.offsetHeight; // height of browser window

function setup() {
    createCanvas(parentWidth,parentHeight);
}
  
function draw() {
    background(255);

    text(frameRate().toLocaleString(undefined,{ maximumFractionDigits: 0 })
          ,10,30);

    circle(mouseX,mouseY,30);
}