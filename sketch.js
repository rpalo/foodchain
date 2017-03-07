let eater, foods;

function setup() {
    createCanvas(800, 600);
    foods = [];
    for (i=0;i<20;i++) {
        foods.push(new Food(random(20, width-20), random(20, height-20)));
    }
    eater = new Animal(width/2, height/2, 2);
}

function draw() {
    if (foods.length === 0) return;
    background(255);
    eater.hunt(foods);
    eater.update();
    eater.show();
    eater.eat(foods,eater.r/2, 1);
    foods.forEach( f => f.show() );
}