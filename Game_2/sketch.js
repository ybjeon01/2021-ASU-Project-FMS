class Game {

  static reset() {
    Block.reset();
    InputArea.reset();
  }

  static run() {
      Board.draw();
      
      Block.drop_from_the_sky();
      Block.update_and_draw();
  }

  static key_handler(key_code) {
    if (key_code == ENTER) {
      InputArea.check_if_user_enter_right_word();
    }
  }
}


// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(1920, 1080);
  frameRate(60);

  Game.reset();
}

function draw() {
  Game.run();
}

function keyPressed() {
  Game.key_handler(keyCode);
}
