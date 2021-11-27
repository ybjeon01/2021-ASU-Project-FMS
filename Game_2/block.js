let WORD_LIST = [
    "agreement", "air", "airport", "alcohol", "ambition", "amount", "analysis",
    "analyst", "animal", "answer", "anxiety", "apartment", "book", "boss",
    "bottom", "box", "boy", "boyfriend", "bread", "breath", "brother", "building",
    "bus", "business", "debt", "decision", "definition", "delivery", "demand",
    "department", "departure", "depression", "depth", "description", "design",
    "desk", "development", "device", "diamond", "difference", "difficulty",
    "dinner", "direction", "gene", "gift", "girl", "girlfriend", "goal", 
    "government"
  ]
  

// constants for block setting
let BLOCK_WIDTH = 100;
let BLOCK_HEIGHT = 40;
let BLOCK_COLOR = [100, 100, 100];
let BLOCK_TEXT_COLOR = [255, 255, 255];
let BLOCK_TEXT_SIZE = 16;


let BLOCK_DROP_INTERVAL = 1.0;
let BLOCK_SPEED = 1.5;
let MAX_NUM_BLOCK = 15;


class BlockManager {
    constructor(
        game,
        block_drop_interval=BLOCK_DROP_INTERVAL,
        max_num_block=MAX_NUM_BLOCK) {

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
            this.used_blocks.push(this.get_ramodn_block_with_weights());
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
    get_ramodn_block_with_weights() {
        let probability = 100;
        let loc = Math.floor(Math.random() * probability);

        if (0 <= loc && loc < 30) {
            return new SpeedBlock(
                this.game,
                this.get_random_word()
            );
        }
        else if (30 <= loc && loc < 40) {
            return new HardBlock(
                this.game,
                this.get_random_word()
            );
        }
        else if (40 <= loc && loc < 55) {
            return new ItemBlock(
                this.game,
                this.get_random_word()
            );
        }
        return new Block(
            this.game,
            this.get_random_word()
        );
    }

    // add a word block to block_list that contains blocks to draw in canvas
    // if the interval between current block and the last block is not less
    // than this.block_drop_interval and the list is not full.
    // return:
    //   true on adding a block
    //   false on time shortage or full array 
    drop_from_the_sky() {
        let delta = this.get_current_time_in_mill() - this.last_block_drop_time;

        // too early to drop blocks
        if (delta < this.block_drop_interval) {
            return false;
        }

        // too many blocks on the board.
        if (this.used_blocks.length > this.max_num_block) {
            return false;
        }

        // choose block type with weighted probability
        this.used_blocks.push(this.get_ramodn_block_with_weights());
        this.last_block_drop_time = this.get_current_time_in_mill();
        return true;

    }

    // if blocks are dropped below the window, return number of the blocks 
    update_and_draw() {
        let num_remove = 0;
        for (let i = this.used_blocks.length - 1; i >= 0; i--) {
            let block = this.used_blocks[i];
            let remove = block.update();
            if (remove) {
                this.used_blocks.splice(i, 1);
                num_remove += 1;
            }
            else {
                block.draw();
            }
        }
        return num_remove;
    }

    // if block_list has block with the text, ask the block whether it is
    // ok to remove the block from the block list.
    // params:
    //   text: text of a block to search
    // return:
    //   number of broken blocks
    break_block(text) {
        let old_array = this.used_blocks;
        let new_array = []
        // later move this code to a function in block object. "can_be_broken()"

        for (let i = 0; i < old_array.length; i++) {
            let block = old_array[i];
            if (!block.break(text)) {
                new_array.push(block);
            }
            else {
                if (block instanceof ItemBlock) {
                    block.callback();
                    return old_array.length;
                }
            }
        }

        if (new_array.length !== old_array.length) {
            this.used_blocks = new_array;
        }
        return old_array.length - new_array.length;
    }
}


class Block {
    static block_type = "normal";

    block_speed = 1.5;
    block_width = 100;
    block_height = 40;
    block_color = [100, 100, 100];
    text_color = [255, 255, 255];
    text_size = 16;

    constructor(
        game,
        word
    ) {
        
        this.game = game;
        this.word = word;

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

    break(name) {
        if (this.word == name) {
            return true;
        }
        else {
            return false;
        }
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
        fill(...this.block_color);
        rect(this.x, this.y, this.block_width, this.block_height);
        
        fill(...this.text_color);
        textSize(this.text_size);
        textAlign(CENTER, CENTER);
        text(
            this.word,
            this.x,
            this.y,
        );
    }
}


class SpeedBlock extends Block {
    static block_type = "speed";

    block_speed = 3.0;
    // yellow
    block_color = [246, 205, 97];
    text_color = [128, 128, 128];
}


class HardBlock extends Block {
    static block_type = "hard";
    block_break_num = 2;

    block_speed = 2.0;
    // yellow
    block_color = [0, 0, 0];
    text_color = [255, 0, 0];

    break(name) {
        if (super.break(name)) {
            this.block_break_num -= 1;
            this.block_color = [150, 150, 150];
            this.word = this.game.block_manager.get_random_word();
        }
        if (this.block_break_num == 0) {
            return true;
        }
        return false;
    }
}


class ItemBlock extends Block {
    static block_type = "item";

    // yellow
    block_color = [14, 154, 167];
    text_color = [200, 200, 200];

    constructor(game, word) {
        super(game, word);
        
        let {name, callback} = this.get_random_item();
        this.item_name = name;
        this.callback = callback;
    }

    break(name) {
        if (super.break(name)) {
            console.log(name);
            return true;
        }
    }

    get_random_item() {
        return {
            "name": "remove",
            "callback": ItemBlock.remove_all
        };
    }

    static remove_all() {
        this.game.block_manager.used_blocks = [];
    }
}