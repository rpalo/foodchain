// Animal extends Vehicle

function Animal(x, y) {
    Vehicle.call(this, x, y);
    this.decayRate = .998;
    this.alive = true;
    this.velLimit = 5;
}

Animal.prototype = Object.create(Vehicle.prototype);
Animal.prototype.constructor = Animal;

// Additional Animal functionality

Animal.prototype.update = function() {
    if (!this.alive) return;
    Vehicle.prototype.update.apply(this); // Super
    if (this.r < 2) {
        console.log("I died!");
        this.alive = false;
    }
    this.r *= this.decayRate;
    this.maxSpeed = map(this.r, 2, 40, this.velLimit, 2);
}
Animal.prototype.hunt = function(prey) {
    // prey is a list of other animals
    let closest = createVector(2000, 2000);
    let d;
    let d_min = 10000;
    prey.forEach( target => {
        if (target === this) {
            return;
        }
        d = this.pos.dist(target.pos);
        if (d < d_min) {
            d_min = d;
            closest = target;
        }
    });
    this.approach(closest.pos, 15);
}

Animal.prototype.eat = function(items, tolerance=this.r/2, grow=0) {
    for (let i=items.length - 1; i >= 0; i--) {
        if (items[i].pos.dist(this.pos) < tolerance) {
            console.log("YUM!");
            items.splice(i, 1); // Remove item from list.
            this.r += grow;
        }
    }
}