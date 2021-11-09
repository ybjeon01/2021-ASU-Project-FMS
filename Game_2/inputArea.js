class InputArea {
    static WIDTH = 100;
    static HEIGHT = 30;
    static BACKGROUND_COLOR = [255, 255, 255];
    static TEXT_COLOR = [0, 0, 0];

    constructor(
        game,
        x=0,
        y=0,
        size=100
    ) {
        this.game = game;

        this.input = '';

        this.x = x;
        this.y = y;
        this.width = InputArea.WIDTH;
        this.height = InputArea.HEIGHT;
        this.background_color = InputArea.BACKGROUND_COLOR;
        this.text_color = InputArea.TEXT_COLOR;
    }

    draw() {
        rectMode(CENTER);
        fill(...this.background_color);
        rect(this.x, this.y, this.width, this.height);
        
        fill(...this.text_color);

        textAlign(CENTER, CENTER);
        text(
            this.input,
            this.x,
            this.y,
        );
    }

    // initialize input area before starting a game
    // info:
    //   if user want to restart a game, it function must be called
    reset() {
        this.input = '';
        this.draw();
    }

    // clear input area everytime when user hit enter and
    // If user entered word in blocks with right spelling, this function
    // asks block manager to remove the block with the word.
    // return:
    //   number of broken blocks 
    check_if_user_enter_right_word() {
        let block_manager = this.game.block_manager;

        let num_break = block_manager.break_block(this.input);
        // clear input area
        this.input = '';
        return num_break;
    }

    add_input(char) {
        this.input = this.input + char;
    }
}


