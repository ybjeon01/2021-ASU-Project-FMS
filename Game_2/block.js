let BLOCK_WIDTH = 50;
let BLOCK_HEIGHT = 20;
let BLOCK_COLOR = 100;


let MAX_NUM_BLOCKS = 5
let USED_BLOCKS = [];


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
            USED_BLOCKS.pop
        }
        else {
            this.y += BOARD_GRAVITY;
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

    drop_from_the_sky() {
        if ( USED_BLOCKS.length < MAX_NUM_BLOCKS) {
            USED_BLOCKS.push(new Block("dog"));
        }
    }
}