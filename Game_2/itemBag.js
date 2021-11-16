ITEM_BAG_HEIGHT = 20
ITEM_BAG_WIDTH = 200

ITEM_BAG_LOC_X = 100
ITEM_BAG_LOC_Y = 10


class ItemBag {
    text_size = 16;

    constructor(game) {
        this.game = game;

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
            "blue - delete all blocks",
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
            "blue - delete all blocks",
            this.x,
            this.y,
        );

        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y + this.height, this.width, this.height);

        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        text(
            "black - type word twice",
            this.x,
            this.y + this.height,
        );

        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y + this.height * 2, this.width, this.height);

        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        text(
            "yello - speedy block",
            this.x,
            this.y + this.height * 2,
        );
    }

}