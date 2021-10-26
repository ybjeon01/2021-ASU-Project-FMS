class InputArea {
    constructor(block_manager) {
        this.block_manager = block_manager;
        let input = undefined;
    }

    reset() {
        this.input = createInput('');
        this.input.position(0, 0);
        this.input.size(100);
    }

    check_if_user_enter_right_word() {
        let success = this.block_manager.break_block(this.input.value());
        this.input.value('');
        return success;
    }
}


