class Game {

  constructor(
    canvas,
    board_width,
    board_height,
    block_drop_speed
  ) {
    this.board = new Board(
      this,
      canvas,
      board_width,
      board_height,
    );

    this.score_area = new ScoreArea();
    this.block_manager = new BlockManager(this, block_drop_speed);

    this.input_area = new InputArea(this, innerWidth * 0.4, innerHeight * 0.9, 300);
    this.item_bag = new ItemBag();

    this.selected_level = "";
    this.level_list = document.getElementById("level-list");
    this.buttons = document.getElementsByClassName('button');

    this.buttons.forEach((button, idx) => {
      let radio = button.children[0];
      
      radio.addEventListener("click", () => {
        this.selected_level = radio.value;
        this.block_manager = new BlockManager(
          this,
          get_game_level_from_url(radio.value)
        );

        this.level_list.style = "display: none"

        this.pause.style = "visibility: visible";

      });
    });

    this.is_paused = false;
    this.pause = document.getElementById("pause-button");

    this.pause.addEventListener("click", () => {
      if (this.is_paused) {
        this.is_paused = false;
        this.pause.innerHTML = "pause";
      }
      else {
        this.is_paused = true;
        this.pause.innerHTML = "play";
      }
    });

    this.gameover_element = document.getElementById("gameover");
  }

  reset() {
    this.block_manager.reset();
    this.input_area.reset();
    this.score_area.reset();
    this.item_bag.reset();
  }

  run() {
    if (this.selected_level === "") {
    }
    else if (this.is_paused) {

    }
    else if (this.score_area.score < 0) {
      this.gameover();
    }
    else {
      this.board.draw();
      this.item_bag.draw();

      this.block_manager.drop_from_the_sky();
      let hit_bottom = this.block_manager.update_and_draw();
      if (hit_bottom) {
        this.score_area.add_score(-100);
      }
      this.score_area.draw();
      
      if (this.input_area.input !== document.activeElement) {
        this.input_area.input.focus();
      }
    }
  }

  gameover() {
    this.gameover_element.style = "display: block";

    make_score_list("game2");
    let score_list = get_score_list("game2");
    add_to_score_list("game2", this.score_area.max_score);
  }

  key_handler(key_code) {
    if (key_code == ENTER) {
      let num_broken_blocks = this.input_area.check_if_user_enter_right_word();
      if (num_broken_blocks > 0) {
        this.score_area.add_score(100 * num_broken_blocks);
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


  let block_drop_speed = get_game_level_from_url()

  game = new Game(
    canvas,
    windowWidth,
    windowHeight,
    block_drop_speed
  );
  game.reset();

}

function draw() {
  game.run();
}

function keyPressed() {
  game.key_handler(keyCode);
}

function get_game_level_from_url(level) {

  if (level === 'easy') {
    return 3;
  }
  else if (level === "medium") {
    return 2;
  }
  else {
    return 1;
  }
}


function get_score_list(gameName) {
  return JSON.parse(localStorage.getItem(`${gameName}-scoreList`));
}

function add_to_score_list(gameName, score) {
  let arr = get_score_list(gameName);

  if (!arr.includes(score)) {
    arr.push(score);
    arr.sort();
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify(arr));
  }
}

function make_score_list(gameName) {
  let scoreList = localStorage.getItem(`${gameName}-scoreList`);
  if (scoreList === null) {
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify([]));
  }
}