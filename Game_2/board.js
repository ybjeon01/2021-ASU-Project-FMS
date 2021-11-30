let BOARD_WIDTH = 1024;
let BOARD_HEIGHT = 1024;


class Board {
    consturctor(width=BOARD_WIDTH, height=BOARD_HEIGHT) {
        this.width = BOARD_WIDTH;
        this.height = BOARD_HEIGHT
    }
    
    draw() {
        background(255, 255, 255);
    }
}