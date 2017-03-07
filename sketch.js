let big, animals;

function setup() {
    createCanvas(800, 600);
    big = new Animal(width/3, height/2, 3);
    animals = [];
    for (i=0; i<5; i++) {
        animals.push(new Animal(random(0, width), random(0, height), 5));
    }
    animals.push(big);
    big.color = "black";
}



function draw() {
    background(255);
    animals.forEach( a => {
        if (a !== big) {
            a.flee(big.pos);
        } else {
            a.hunt(animals);
        }
        a.avoidSides();
        a.update();
        a.show();
    });
}