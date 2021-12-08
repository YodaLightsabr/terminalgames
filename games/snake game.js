//Delcare Global Variables
let snake;
let rez = 28;
let food;
let w;
let h;

//  Setup function 

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

// Location for food to appear


function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}



// CONTROLS

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }

}

// Draw function

function draw() {
  scale(rez);
  background(200);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

// Console Text Display
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  if (snake.endGame()) {
    print("GAME OVER  YOU LOSE ")
    background(255, 3, 0);
    noLoop();
  }

// Food Color
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
