function Pipe() {
    this.spacing = 200;
    this.top = random(height / 6, 3 / 5 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
    this.passed = false;
  
  
    this.hits = function(bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          return true;
        }
      }
      this.highlight = false;
      return false;
    }

    this.birdPasses = function(bird) {
      if (bird.x > this.x + this.w && !this.passed)
      {
        this.passed = true;
        return true;
      }
    }
  
    this.show = function() {
      fill(72, 167, 1978);
      if (this.highlight) {
        fill(255, 0, 0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  
    this.update = function() {
      this.x -= this.speed;
    }
  
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  
  
  }