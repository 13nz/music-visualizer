// Constructor function for visualization
function SineWave() {
  // vizualization name
    this.name = "sine wave"
    this.dots = [];
    this.size = 15;
    this.speed = 0.05;
    this.margin = 30;
    // columns and rows based on canvas size
    var cols = (width - this.margin * 2) / this.size;
    var rows = (height - this.margin * 2) / this.size;

    background(30, 10);

    // construct dots
    for (let i = 0; i < cols; i++) {
        this.dots[i] = [];
        for (let j = 0; j < rows; j++) {
          // calculate positions
          let x = this.margin + this.size / 2 + i * this.size;
          let y = this.margin + this.size / 2 + j * this.size;
          // calculate distance between dots and center
          let distance = dist(x, y, width / 2, height / 2);
          // map to angle (0-2 pi)
          let angle = map(distance, 0 , width / 2, 0, TWO_PI * 2);
          // map scale to distance
          let scl = map(distance, 0, width / 2, 0.05, 0.03);
          // create Dot
          this.dots[i][j] = new Dot(x, y, angle, this.speed, scl);
        }
      }

    this.draw = function() {
      let spectrum = fourier.analyze();
      // frequency bins
      let bass, lowMid, mid, highMid, treble;

      bass = fourier.getEnergy("bass");
      lowMid = fourier.getEnergy("lowMid");
      mid = fourier.getEnergy("mid");
      highMid = fourier.getEnergy("highMid");
      treble = fourier.getEnergy("treble");
      
      let bins=[bass,lowMid,mid,highMid,treble]

      console.log("Bass: "+bass+" lowMid: "+lowMid+" mid: "+mid+" highMid: "+highMid+" treble: "+treble);
      background(30, 10);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {  
          // increase speed when bass is high
          if(bass > 150) {
            this.dots[i][j].speed = 0.15;
          } else {
            this.dots[i][j].speed = 0.05;
          }
          // update position and speed of dots and display on canvas
          this.dots[i][j].update();
          this.dots[i][j].display();
        }
      }
        
    }


}

class Dot {
    constructor(x, y, angle, speed, scl) {
      // initialize properties
        this.pos = createVector(x, y);
        this.center = createVector(width / 2, height / 2);
        // subtract vectors to get direction
        this.direction = p5.Vector.sub(this.center, this.pos);
        // get magnitude
        this.mag = scl * this.direction.mag();
        this.angle = angle;
        this.speed = speed;
        //this.newPos = createVector(0, 0)
    }

    update() {
        this.oscillation = this.mag * sin(this.angle); 
        //this.oscillationDir = p5.Vector.setMag(this.direction, this.oscillation);
        let oscillationDir = this.direction.copy().setMag(this.oscillation)
        // new vector from position & oscillation direction
        this.newPos = p5.Vector.add(this.pos, oscillationDir);

        this.angle += this.speed;
    }
 

    display() {
        // colors depending on distance     
        let r = map(sin(this.angle), -1, 1, 100, 255);
        let g = map(sin(this.angle + 2), -1, 1, 100, 255);
        let b = map(sin(this.angle + 4), -1, 1, 100, 255);

        fill(r, g, b);
        noStroke();
        ellipse(this.newPos.x, this.newPos.y, 10, 10);
    }
}