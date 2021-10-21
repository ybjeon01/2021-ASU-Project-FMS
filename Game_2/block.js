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
let BLOCK_WIDTH = 80;
let BLOCK_HEIGHT = 30;
let BLOCK_COLOR = 100;
let BLOCK_DROP_INTERVAL = 2.0;
let BLOCK_SPEED = 3;

let MAX_NUM_BLOCK = 15;


class BlockManager {
    constructor(score_area, max_num_block=MAX_NUM_BLOCK) {
        this.max_num_block = max_num_block;

        this.last_block_drop_time = undefined;
        this.used_blocks = []
        this.score_area = score_area
    }

    reset() {
        this.last_block_drop_time = second();

        for (let i = 0; i < 1; i++) {
            this.used_blocks.push(new Block("dog", this));
        }
    }

    drop_from_the_sky() {
        let delta = second() - this.last_block_drop_time;

        if  (delta >= BLOCK_DROP_INTERVAL) {
            if ( this.used_blocks.length < this.max_num_block) {
                let random_index = Math.floor(Math.random() * WORD_LIST.length)
                
                this.used_blocks.push(new Block(WORD_LIST[random_index], this));
                this.last_block_drop_time = second();
            }
        }
    }

    update_and_draw() {
        this.used_blocks.forEach(block => {
            block.update();
            block.draw();
        });
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
            this.score_area.add_score(100);
            return true;
            // test
            console.log(this.used_blocks);
        }
        return false;
    }

}


class Block {
    constructor(word, manager, block_speed=BLOCK_SPEED) {
        let {x, y} = this.get_random_loc();
        this.x = x;
        this.y = y;

        this.manager = manager
        this.block_speed = block_speed
        this.word = word;
    }

    get_random_loc() {
        let x = random(BLOCK_WIDTH / 2, BOARD_WIDTH - BLOCK_WIDTH / 2);
        return {x, y: -1 * BLOCK_HEIGHT / 2};
    }

    update() {
        if (this.y > BOARD_HEIGHT) {
            this.manager.used_blocks.pop();
        }
        else {
            this.y += this.block_speed;
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
}


class HardBlock extends Block {
    constructor() {

    }
}