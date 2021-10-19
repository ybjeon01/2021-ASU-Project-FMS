CANNON_COLOR = 100;
CANNON_WIDTH = 100;
CANNON_HEIGHT = 100;


class Cannon {
    constructor() {
        this.angle = HALF_PI;
        this.x = 0;
        this.y = 0;

        // public variable
        this.key_code = undefined;
    }

    update() {
        if (this.key_code == LEFT_ARROW) {
            this.angle += PI / 180;
            this.key_code = undefined;
        }
        else if (this.key_code == RIGHT_ARROW) {
            this.angle -= PI / 180;
            this.key_code = undefined;
        }
        
    }

    draw() {
        push();
        translate(width / 2, height / 2);
        rectMode(CENTER);
        fill(CANNON_COLOR);
        rotate(this.angle);
        rect(this.x, this.y, CANNON_WIDTH, CANNON_HEIGHT);
        pop();
    }


}