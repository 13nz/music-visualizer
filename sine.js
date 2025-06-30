// NOT CURRENTLY USED
// Sine wave constructor function
function Sine() {
    // visualization name
    this.name = "sine";
    // create extra canvas to enable WebGL, to avoid affecting other visualizations
    this.extraCanvas = createGraphics(windowWidth, windowHeight, WEBGL)
    this.extraCanvas.angleMode(DEGREES)
    //this.extraCanvas.clear()
    this.extraCanvas.background(30);

    var spectrum = fourier.analyze()

    this.draw = function() {
        this.extraCanvas.push()
        this.drawExtraCanvas(this.extraCanvas)
        this.extraCanvas.clear();
        this.extraCanvas.pop();

    }

    // draw on the extraCanvas
    // @param canvas: the extraCanvas with WebGL mode
    this.drawExtraCanvas = function(canvas) {
        canvas.rotateX(60);
        canvas.noFill()
        canvas.stroke(255)
        var mult = 1;

        for (var i = 0; i < 30; i++) {
            // rainbow colors
            var r = map(sin(frameCount * 1.5), -1, 1, 0, 255)
            var g = map(i, 0, 20, 0, 255)
            var b = map(cos(frameCount * 1.5), -1, 1, 255, 0)

            canvas.stroke(r, g, b)
            

            canvas.beginShape()
            for (var j = 0; j < 360; j += 10) {
                var rad = i * 6
                var x = rad * cos(j);
                var y = rad * sin(j);
                var z = sin(frameCount * 2 + i * 6) * 50

                canvas.vertex(x, y, z);
            }

            canvas.endShape(CLOSE)
            image(canvas, 0, 0);
        }
    }
}