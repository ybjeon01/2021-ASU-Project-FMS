

class Game {

  constructor() {
    this.score_area = new ScoreArea();
    this.block_manager = new BlockManager(this.score_area);
    this.input_area = new InputArea(this.block_manager);
  }

  reset() {
    this.block_manager.reset();
    this.input_area.reset();
    this.score_area.reset();
  }

  run() {
      Board.draw();
      
      this.block_manager.drop_from_the_sky();
      this.block_manager.update_and_draw();
      this.score_area.draw();
  }

  key_handler(key_code) {
    if (key_code == ENTER) {
      this.input_area.check_if_user_enter_right_word();
    }
  }
}

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
