let game = undefined;


// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(1920, 1080);
  frameRate(60);
  
  game = new Game();
  game.reset();
}

function draw() {
  game.run();
}

function keyPressed() {
  game.key_handler(keyCode);
}