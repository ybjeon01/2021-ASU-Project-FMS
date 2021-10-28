let BOARD_WIDTH = 1024;
let BOARD_HEIGHT = 1024;


class Board {
    constructor(width=BOARD_WIDTH, height=BOARD_HEIGHT) {
        this.width = width;
        this.height = height
    }
    
    draw() {
        background(255, 255, 255);
    }
}