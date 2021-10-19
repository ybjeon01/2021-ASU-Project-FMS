// constants for block setting
let BLOCK_WIDTH = 50;
let BLOCK_HEIGHT = 20;
let BLOCK_COLOR = 100;
let BLOCK_DROP_INTERVAL = 3.0;
let BLOCK_SPEED = 0.8;

// variables used during playing game
let MAX_NUM_BLOCKS = 5
let USED_BLOCKS = [];
let LAST_BLOCK_DROP_TIME = undefined;


class Block {
    constructor(word) {
        let {x, y} = this.get_random_loc();
        this.x = x;
        this.y = y;

        this.word = word;
    }

    get_random_loc() {
        let x = random(BLOCK_WIDTH / 2, BOARD_WIDTH - BLOCK_WIDTH / 2);
        return {x, y: -1 * BLOCK_HEIGHT / 2};
    }

    update() {
        if (this.y > BOARD_HEIGHT) {
            USED_BLOCKS.pop();
        }
        else {
            this.y += BLOCK_SPEED;
        }
    }

    draw() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, BLOCK_WIDTH, BLOCK_HEIGHT);
        
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            this.word,
            this.x,
            this.y,
        );
    }

    static reset() {
        LAST_BLOCK_DROP_TIME = second();

        for (let i = 0; i < 1; i++) {
            USED_BLOCKS.push(new Block("dog"));
        }
    }

    static drop_from_the_sky() {
        let delta = second() - LAST_BLOCK_DROP_TIME;

        if  (delta >= BLOCK_DROP_INTERVAL) {
            if ( USED_BLOCKS.length < MAX_NUM_BLOCKS) {
                USED_BLOCKS.push(new Block("dog"));

                LAST_BLOCK_DROP_TIME = second();
            }
        }
    }

    static update_and_draw() {
        USED_BLOCKS.forEach(block => {
            block.update();
            block.draw();
        });
    }

    static break_block(text) {
        let new_array = []
        USED_BLOCKS.forEach(block => {
            if (block.word !== text) {
                new_array.push(block);
            } 
        });

        if (new_array.length !== USED_BLOCKS.length) {
            USED_BLOCKS = new_array;

            return true;
            // test
            console.log(USED_BLOCKS);
        }
        return false;
    }
}