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

        this.last_block_drop_time = undefined;
        this.used_blocks = []
        this.game = game
    }

    reset() {
        this.last_block_drop_time = Math.floor(new Date() / 1000);

        for (let i = 0; i < 1; i++) {
            this.used_blocks.push(new Block("dog", this.game));
        }
    }

    drop_from_the_sky() {
        let delta = Math.floor(new Date() / 1000) - this.last_block_drop_time;

        if  (delta >= this.block_drop_interval) {
            if ( this.used_blocks.length < this.max_num_block) {
                let random_index = Math.floor(Math.random() * WORD_LIST.length)
                
                this.used_blocks.push(new Block(WORD_LIST[random_index], this.game));
                this.last_block_drop_time = Math.floor(new Date() / 1000);
            }
        }
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

    break_block(text) {
        let new_array = []
        this.used_blocks.forEach(block => {
            if (block.word !== text) {
                new_array.push(block);
            } 
        });

        if (new_array.length !== this.used_blocks.length) {
            this.used_blocks = new_array;
            return true;
            // test
            console.log(this.used_blocks);
        }
        return false;
    }
}


class Block {
    constructor(
        word,
        game,
        block_speed=BLOCK_SPEED,
        text_size=BLOCK_TEXT_SIZE) {
        
        this.game = game;
        this.word = word;
        this.block_speed = block_speed;
        this.text_size = text_size;

        let {x, y} = this.get_random_loc();
        this.x = x;
        this.y = y;
    }

    get_random_loc() {
        let board_width = this.game.board.width;
        let board_height = this.game.board.height;
        let x = random(BLOCK_WIDTH / 2, board_width - BLOCK_WIDTH / 2);
        return {x, y: -1 * BLOCK_HEIGHT / 2};
    }

    // if block is out of bound, return true
    update() {
        if (this.y > BOARD_HEIGHT) {
            return true;
        }
        else {
            this.y += this.block_speed;
        }
        return false;
    }

    draw() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, BLOCK_WIDTH, BLOCK_HEIGHT);
        
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
