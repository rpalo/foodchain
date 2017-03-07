function Vehicle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = 20;
    this.maxSpeed = 5;
    this.maxForce = .3;
    this.color = "red";
}

Vehicle.prototype.show = function() {
    push();
    stroke(0);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    pop();
};

Vehicle.prototype.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    if (this.pos.x < 0) {
        this.pos.x = width;
    } else if (this.pos.x > width) {
        this.pos.x = 0;
    }
    if (this.pos.y < 0) {
        this.pos.y = height;
    } else if (this.pos.y > height) {
        this.pos.y = 0;
    }
    this.acc.setMag(0);
};

Vehicle.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Vehicle.prototype.seek = function(target, urgency) {
    const error = p5.Vector.sub(target, this.pos);
    error.limit(urgency);
    this.applyForce(error);
}

Vehicle.prototype.flee = function(source, urgency) {
    const error = p5.Vector.sub(source, this.pos);
    error.limit(urgency);
    error.mult(-1);
    this.applyForce(error);
}