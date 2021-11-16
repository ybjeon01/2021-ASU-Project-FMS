ITEM_BAG_HEIGHT = 100
ITEM_BAG_WIDTH = 300

ITEM_BAG_LOC_X = 1600
ITEM_BAG_LOC_Y = 800


class ItemBag {
    constructor(game) {
        this.game = game
        
        this.item_list = [1, 3, 5];

        this.width = ITEM_BAG_WIDTH;
        this.height = ITEM_BAG_HEIGHT;

        this.x = ITEM_BAG_LOC_X;
        this.y = ITEM_BAG_LOC_Y;
        
    }

    reset() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, this.width, this.height);
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            this.item_list,
            this.x,
            this.y,
        );
    }

    add_list(score) {
        // implement
    }

    draw() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, this.width, this.height);
        
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            this.item_list,
            this.x,
            this.y,
        );
    }

}