let INPUT = undefined;

class InputArea {

    static reset() {
        INPUT = createInput('');
        INPUT.position(0, 0);
        INPUT.size(100);
    }

    static check_if_user_enter_right_word() {
        let success = Block.break_block(INPUT.value());
        console.log(success);
        if (success) {
            INPUT.value('');
        }
    }

}


