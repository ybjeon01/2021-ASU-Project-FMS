class Game {

  constructor(
    canvas,
    board_width,
    board_height
  ) {
    this.board = new Board(
      this,
      canvas,
      board_width,
      board_height
    );
    this.score_area = new ScoreArea();
    this.block_manager = new BlockManager(this);

    this.input_area = new InputArea(this, 0, 0, 100);
    this.item_bag = new ItemBag();
  }

  reset() {
    this.block_manager.reset();
    this.input_area.reset();
    this.score_area.reset();
    this.item_bag.reset();
  }

  run() {
    if (this.score_area.score < 0) {
      this.gameover();
    }
    else {
      this.board.draw();
      
      this.block_manager.drop_from_the_sky();
      let hit_bottom = this.block_manager.update_and_draw();
      if (hit_bottom) {
        this.score_area.add_score(-100);
      }
      this.score_area.draw();

      this.item_bag.draw();
    }
  }

  gameover() {
    rectMode(CENTER);
    fill(100);
    rect(500, 500, 300, 200);
    
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(
        "game over. refresh the page to restart",
        500,
        500,
    );
  }

  key_handler(key_code) {
    if (key_code == ENTER) {
      let success = this.input_area.check_if_user_enter_right_word();
      if (success) {
        this.score_area.add_score(100);
      }
    }
  }
}

let game = undefined;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  frameRate(60);

  game = new Game(
    canvas,
    windowWidth,
    windowHeight
  );
  game.reset();

}

function draw() {
  game.run();
}

function keyPressed() {
  game.key_handler(keyCode);
}
