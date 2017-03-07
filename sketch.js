let v;

function setup() {
    createCanvas(800, 600);
    v = new Vehicle(width/2, height/2);
}

function draw() {
    background(255);

    if (mouseIsPressed) {
        v.flee(createVector(mouseX, mouseY), 5);
        v.color = "blue";
    } else {
        v.seek(createVector(mouseX, mouseY), 5);
        v.color = "red";
    }
    v.update();
    v.show();
}