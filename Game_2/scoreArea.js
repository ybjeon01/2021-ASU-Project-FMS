SCORE_HEIGHT = 100
SCORE_WIDTH = 300

SCORE_LOC_X = 800
SCORE_LOC_Y = 800

class ScoreArea {
    constructor() {
        this.score = 0;
        this.y = SCORE_HEIGHT;
        this.x = SCORE_WIDTH;
    }

    reset() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, SCORE_WIDTH, SCORE_HEIGHT);
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            this.score,
            this.x,
            this.y,
        );
    }

    add_score(score) {
        this.score += score;
    }

    draw() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, BLOCK_WIDTH, BLOCK_HEIGHT);
        
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            this.score,
            this.x,
            this.y,
        );
    }

}


