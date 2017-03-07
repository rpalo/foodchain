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

Vehicle.prototype.update = function(edges="WRAP") {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    if (this.pos.x < 0) {
        this.pos.x = (edges === "WRAP") ? width : 0;
    } else if (this.pos.x > width) {
        this.pos.x = (edges === "WRAP") ? 0 : width;
    }
    if (this.pos.y < 0) {
        this.pos.y = (edges === "WRAP") ? height : 0;
    } else if (this.pos.y > height) {
        this.pos.y = (edges === "WRAP") ? 0 : height;
    }
    this.acc.setMag(0);
};

Vehicle.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Vehicle.prototype.seek = function(target, limit=.1) {
    const error = p5.Vector.sub(target, this.pos);
    error.limit(limit);
    this.applyForce(error);
}

Vehicle.prototype.flee = function(source, limit=.1) {
    const error = p5.Vector.sub(source, this.pos);
    error.mult(-1);
    error.limit(limit);
    this.applyForce(error);
}

Vehicle.prototype.approach = function(target, threshold=40, limit=.4) {
    const error = p5.Vector.sub(target, this.pos);
    if (error.mag() < threshold) {
        error.limit(map(error.mag(), 0, threshold, 0, limit));
    } else {
        error.limit(limit);
    }
    this.applyForce(error);
}

Vehicle.prototype.avoidSides = function(limit=20) {
    let edgeForce = createVector(0, 0);
    if (this.pos.x  < limit) {
        edgeForce.add(createVector(map(this.pos.x, 0, limit, limit*.5, 0), 0));
    } else if (width - this.pos.x < limit) {
        edgeForce.add(createVector(map(this.pos.x, width - limit, width, 0, -limit*.5), 0));
    }
    if (this.pos.y < limit) {
        edgeForce.add(createVector(0, map(this.pos.y, 0, limit, limit*.5, 0)));
    } else if (height - this.pos.y < limit) {
        edgeForce.add(createVector(0, map(this.pos.y, height - limit, height, 0, -limit*.5)));
    }
    this.applyForce(edgeForce);
}