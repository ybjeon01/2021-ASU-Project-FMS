let WORD_LIST = [
    "Agreement", "Air", "Airport", "Alcohol", "Ambition", "Amount", "Analysis",
    "Analyst", "Animal", "Answer", "Anxiety", "Apartment", "Book", "Boss",
    "Bottom", "Box", "Boy", "Boyfriend", "Bread", "Breath", "Brother", "Building",
    "Bus", "Business", "Debt", "Decision", "Definition", "Delivery", "Demand",
    "Department", "Departure", "Depression", "Depth", "Description", "Design",
    "Desk", "Development", "Device", "Diamond", "Difference", "Difficulty",
    "Dinner", "Direction", "Gene", "Gift", "Girl", "Girlfriend", "Goal", 
    "Government"
  ]
  

// constants for block setting
let BLOCK_WIDTH = 100;
let BLOCK_HEIGHT = 40;
let BLOCK_COLOR = 100;
let BLOCK_TEXT_SIZE = 16;

let BLOCK_DROP_INTERVAL = 1.0;
let BLOCK_SPEED = 2.5;
let MAX_NUM_BLOCK = 15;


class BlockManager {
    constructor(
        game,
        max_num_block=MAX_NUM_BLOCK,
        block_drop_interval=BLOCK_DROP_INTERVAL) {

        this.max_num_block = max_num_block;
        this.block_drop_interval = block_drop_interval;

        this.game = game
        this.last_block_drop_time = undefined;
        this.used_blocks = []
    }

    // initialize input area before starting a game
    // info:
    //   if user want to restart a game, it function must be called
    reset() {
        this.last_block_drop_time = this.get_current_time_in_mill();
        for (let i = 0; i < 1; i++) {
            this.used_blocks.push(this.get_block('test'));
        }
    }

    get_current_time_in_mill() {
        return Math.floor(new Date() / 1000);
    }

    // get a random word from WORD_LIST array.
    get_random_word() {
        let random_index = Math.floor(Math.random() * WORD_LIST.length)
        return WORD_LIST[random_index];
    }

    // get a block of the type with random word
    // params:
    //   type: type of a block to make
    // return:
    //   block
    get_block(type) {
        let new_block = new Block(
            this.game,
            this.get_random_word()
        )
        return new_block
    }

    // add a word block to block_list that contains blocks to draw in canvas
    // if the interval between current block and the last block is not less
    // than this.block_drop_interval and the list is not full.
    // return:
    //   true on adding a block
    //   false on time shortage or full array 
    drop_from_the_sky() {
        let delta = this.get_current_time_in_mill() - this.last_block_drop_time;

        if  (delta >= this.block_drop_interval) {
            if (this.used_blocks.length < this.max_num_block) {
                this.used_blocks.push(this.get_block('test'));
                this.last_block_drop_time = this.get_current_time_in_mill();
                return true;
            }
        }
        return false;
    }

    // if block is dropped below the window, return true
    update_and_draw() {
        let remove = false;
        for (let i = this.used_blocks.length - 1; i >= 0; i--) {
            let block = this.used_blocks[i];
            remove = block.update();
            if (remove) {
                this.used_blocks.splice(i, 1);
            }
            else {
                block.draw();
            }
        }
        return remove;
    }

    // if block_list has block with the text, ask the block whether it is
    // ok to remove the block from the block list.
    // params:
    //   text: text of a block to search
    // return:
    //   true on removing block from the list
    //   false when there is not block containg the text or the block 
    //   does not allow to remove itself from array.
    break_block(text) {
        let new_array = []

        // later move this code to a function in block object. "can_be_broken()"
        this.used_blocks.forEach(block => {
            if (block.word !== text) {
                new_array.push(block);
            } 
        });

        if (new_array.length !== this.used_blocks.length) {
            this.used_blocks = new_array;
            return true;
        }
        return false;
    }
}


class Block {
    constructor(
        game,
        word,
        block_speed=BLOCK_SPEED,
        block_width=BLOCK_WIDTH,
        block_height=BLOCK_HEIGHT,
        block_color=BLOCK_COLOR,
        text_size=BLOCK_TEXT_SIZE) {
        
        this.game = game;

        this.word = word;
        this.block_speed = block_speed;
        this.block_width = block_width;
        this.block_height = block_height;
        this.block_color = block_color;
        
        this.text_size = text_size;

        let {x, y} = this.get_random_loc();
        this.x = x;
        this.y = y;
    }

    get_random_loc() {
        let board_width = this.game.board.width;
        let board_height = this.game.board.height;
        let x = random(
            this.block_height / 2, 
            board_width - this.block_width / 2
        );
        return {x, y: -1 * this.block_height / 2};
    }

    // if block is out of bound, return true
    update() {
        if (this.y > this.game.board.height) {
            return true;
        }
        else {
            this.y += this.block_speed;
        }
        return false;
    }

    draw() {
        rectMode(CENTER);
        fill(this.block_color);
        rect(this.x, this.y, this.block_width, this.block_height);
        
        fill(255, 255, 255);
        textSize(this.text_size);
        textAlign(CENTER, CENTER);
        text(
            this.word,
            this.x,
            this.y,
        );
    }
}
