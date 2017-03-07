function Food(x, y) {
    this.pos = createVector(x, y);
}

Food.prototype.show = function() {
    push();
    fill("yellow");
    ellipse(this.pos.x, this.pos.y, 10, 10);
    pop();
}

Food.randomDrop = function(padding=15) {
    return new Food(random(padding, width - padding), random(padding, height - padding));
}