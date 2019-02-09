class Pipe {

  constructor() {
    this.spacing = EMPTY_HEIGHT;
    this.top = random(CLOSEST_PIPE_TO_SCREEN, height - this.spacing - CLOSEST_PIPE_TO_SCREEN);
    this.bottom = (this.top + this.spacing);
    this.x = width;
    this.w = PIPE_WIDTH;
    this.speed = PIPE_VELOCITY;
  }

  hits(bird) {
    if (bird.y - 16 < this.top || bird.y + 16 > this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(0,170,0);
    stroke(0,100,0);
    strokeWeight(10);
    rectMode(CORNER);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + this.spacing, this.w, height - this.top - this.spacing);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
