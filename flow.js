// NOT CURRENTLY USED
function Flow() {
    this.name = "flow";
    this.points = []
    this.mult = 0.1;
    this.density = 100;
    this.r1 = random(255)
    this.r2 = random(255)
    this.g1 = random(255)
    this.g2 = random(255)
    this.b1 = random(255)
    this.b2 = random(255)
    this.space = width / this.density;

    for (var x = 0; x < width; x += this.space) {
        for (var y = 0; y < height; y += this.space) {
            var p = createVector(x + random(-100, 100), y + random(-100, 100));
            this.points.push(p);
        }
    }

    this.draw = function() {
        noStroke();

        var points = this.points;

        for (var i = 0; i < points.length; i++) {
            var r = map(points[i].x, 0, width, this.r1, this.r2)
            var g = map(points[i].y, 0, height, this.g1, this.g2)
            var b = map(points[i].x, 0, width, this.b1, this.b2)

            fill(r, g, b)

            var angle = map(noise(points[i].x * this.mult, points[i].y * this.mult), 0, 1, 0, 720);

            points[i].add(createVector(cos(angle), sin(angle)));

            // create circle at x, y coordinates of each point
            ellipse(points[i].x, points[i].y, 1);
        }
    }
}