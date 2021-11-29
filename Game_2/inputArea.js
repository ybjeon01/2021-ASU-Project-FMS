class InputArea {
    constructor(
        game,
        x=0,
        y=0,
        size=100
    ) {
        this.game = game;

        this.input = document.getElementById("input-area");
        this.input.focus();
    }

    // initialize input area before starting a game
    // info:
    //   if user want to restart a game, it function must be called
    reset() {
    }

    // clear input area everytime when user hit enter and
    // If user entered word in blocks with right spelling, this function
    // asks block manager to remove the block with the word.
    // return:
    //   true on right word
    //   false on wrong word
    check_if_user_enter_right_word() {
        let block_manager = this.game.block_manager;

        let success = block_manager.break_block(this.input.value);
        // clear input area
        this.input.value = '';
        return success;
    }
}


