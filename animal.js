// Animal extends Vehicle

function Animal(x, y, speed) {
    Vehicle.call(this, x, y);
    this.maxSpeed = speed;
}

Animal.prototype = Object.create(Vehicle.prototype);
Animal.prototype.constructor = Animal;

// Additional Animal functionality

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
    this.approach(closest.pos);
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