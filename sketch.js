let eaters, foods;
const FOOD_COUNT = 15;

function setup() {
    createCanvas(800, 600);
    foods = [];
    eaters = [];
    for (let i=0;i<FOOD_COUNT;i++) {
        foods.push(Food.randomDrop());
    }
    for (let i=0;i<7;i++) {
        eaters.push(new Animal(random(width), random(height)));
    }
}

function draw() {
    if (foods.length === 0) return;
    background(255);
    eaters.forEach( eater => {
        eater.hunt(foods);
        eater.avoidSides();
        eater.update();
        eater.show();
        eater.eat(foods,eater.r/2, 5);
    });
    foods.forEach( f => f.show() );
    if (foods.length < FOOD_COUNT) {
        for (let i=0;i<FOOD_COUNT-foods.length;i++) {
            foods.push(Food.randomDrop());
        }
    }
}