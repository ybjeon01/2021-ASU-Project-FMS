SCORE_HEIGHT = 35
SCORE_WIDTH = 200

SCORE_LOC_X = 50
SCORE_LOC_Y = 80

class ScoreArea {
    constructor(game) {
        this.game = game
        this.score = 0;
        this.y = SCORE_LOC_Y;
        this.x = SCORE_LOC_X;
    }

    reset() {
        // rectMode(CENTER);
        // fill(BLOCK_COLOR);
        // rect(this.x, this.y, SCORE_WIDTH, SCORE_HEIGHT);
        // fill(255, 255, 255);

        // textAlign(CENTER, CENTER);
        // text(
        //     "score: " + this.score,
        //     this.x,
        //     this.y,
        // );
    }

    add_score(score) {
        this.score += score;
    }

    draw() {
        rectMode(CENTER);
        fill(BLOCK_COLOR);
        rect(this.x, this.y, SCORE_WIDTH, SCORE_HEIGHT);
        
        fill(255, 255, 255);

        textAlign(CENTER, CENTER);
        text(
            "score: " + this.score,
            this.x,
            this.y,
        );
    }

}


