function Bird() {
    this.y = height/2;
    this.x = 64;
  
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
    this.jumpDelay = false;
  
    this.show = function() {
      fill(255);
      ellipse(this.x, this.y, 32, 32);
    }
  
    this.jump = function() {
      this.velocity += this.lift;
      this.gravity = 0;
      this.gravity = 0.7;
      this.jumpDelay = true;
    }
  
    this.update = function() {
    

            this.velocity += this.gravity;

      this.y += this.velocity;
  
      if (this.y > height) {
        this.y = height;
        this.velocity = 0;
      }
  
      if (this.y < 0) {
        this.y = 0;
        this.velocity = 0;
      }

  
    }
  
  }