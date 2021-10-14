class Game {
    constructor() {
        this.cannon = new Cannon();
        // this.ball = new Ball();
        this.board = new Board();
    
        // this.ScoreSystem = new ScoreSystem();

    }

    reset() {
        for (let i = 0; i < 5; i++) {
            USED_BLOCKS.push(new Block("dog"));
        }
    }

    run() {
        this.board.draw();



        this.blocks.forEach(block => {
            block.update();
            block.draw();
        });

        // this.cannon.update();
        // this.cannon.draw();
    }

    key_handler() {
        this.cannon.key_code = keyCode;
    }
}
