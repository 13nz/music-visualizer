// Constructor function for the particles
function Particles(){
    // name of visualization
    this.name = "particles";
    this.particles = [];

    this.draw = function(){
        background(30);

        var spectrum = fourier.analyze();
        // loop -> amount of particles created
        for (var i = 0; i < spectrum.length; i++) {

            //console.log(spectrum[i])

            // create particles depending on the volume
            if(spectrum[i] > 100) {
                var p = new Particle()
                this.particles.push(p)
            }
        }

        // update particle if opacity > 0
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].alpha > 0) {
                this.particles[i].update()
                this.particles[i].show()
            } else {
                // remove excess particles for memory management
                // when opacity is 0, meaning it's too far from the centre
                this.particles.splice(i, 1)
            }
        }

    }
}

// Particle class for each particle
class Particle {
    constructor() {
        //this.pos = createVector(width / 2, height / 2)
        // randomize particle position
        this.pos = createVector(random(width), random(height))
        this.vel = createVector(0, 0)
        this.acc = p5.Vector.random2D().normalize()
        this.alpha = 255

        // initialize rgb values
        this.r = 0
        this.g = 0
        this.b = 0
    }

    // update function for particle acceleration & movement
    update() {
        // add wave-like movement
        var m = map(sin(frameCount), -1, 1, 0.4, 0.6)
        // acceleration multiplier
        this.acc.mult(m)

        // add acceleration to velocity
        this.vel.add(this.acc)
        // move particle position
        this.pos.add(this.vel)

        // color depends on particle position
        this.r = map(this.pos.x, 0, width, 255, 0)
        this.g = map(this.pos.y, 0, height, 0, 255)
        this.b = map(dist(width / 2, height / 2, this.pos.x, this.pos.y), 0, width / 2, 0, 255)
    
        // decrease opacity based on distance from center
        if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > 200) {

            this.alpha -= 4;
        }
        /* else 
        {
            this.acc.mult(2)
        } */
    }

    // function for showing the particles
    show() {
        noStroke()
        fill(this.r, this.g, this.b, this.alpha)
        // last parameter -> size of particles
        ellipse(this.pos.x, this.pos.y, 4)
    }
}