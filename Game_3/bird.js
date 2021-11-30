function Bird() {
    this.y = height/2;
    this.x = 64;
    
    this.timer = -1;

    this.gravity = 0.75;
    this.lift = -16;
    this.velocity = 0;
  
    this.show = function() {
      fill(255);
    }
  
    this.jump = function() {
      if(this.velocity < 0.3)
      {
        this.velocity += this.lift / 1.2;
      }
      else
      {
        this.velocity += this.lift * 1.15;
      }
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
