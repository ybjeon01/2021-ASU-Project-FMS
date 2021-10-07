//Initializing browser window canvas
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;
let img;

function setup(){
  createCanvas(parentWidth, parentHeight);
  img = loadImage('assets/maze.png');
}

function draw(){
  image(img, width/2 - 300, height/2 - 300);
}