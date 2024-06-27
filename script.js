var space; //background img
var astro; //astronaut character

var astro_x = 200; //astros' x position
var astro_y = 200; //astro's y position

//planets and debris

var planets = []; // array to store planets
var numPlanets = 20; // number of planets
var score = 0;

var timeLeft = 45; // Countdown timer in seconds

function preload() {
  space = loadImage('spacee.jpg');
  astro = loadImage('astrooo.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < numPlanets; i++) {
    planets[i] = new Planets();
  }
}

function draw() {
  background(0);

  drawBackground();

  for (var i = 0; i < numPlanets; i++) {
    planets[i].display();
  }

  drawCharacter();
  checkCollision();
  updateTimer();

  textSize(20);
  fill(255);
  text("SCORE: " + score, 50, 50);
  text("TIME: " + timeLeft, 50, 80);

  if (timeLeft <= 0 && score < 20) {
    gameOver("You Lose!");
  } else if (score >= 20) {
    gameOver("You Win!");
  }
}

function drawBackground() {
  imageMode(CENTER);
  image(space, width / 2, height / 2, windowWidth, windowHeight);
}

function drawCharacter() {
  image(astro, astro_x, astro_y, 90, 120);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    astro_y -= 20;
  } else if (keyCode == DOWN_ARROW) {
    astro_y += 20;
  } else if (keyCode == RIGHT_ARROW) {
    astro_x += 20;
  } else if (keyCode == LEFT_ARROW) {
    astro_x -= 20;
  }
}

function checkCollision() {
  for (var i = 0; i < numPlanets; i++) {
    if (planets[i].collisionFound == false && dist(astro_x, astro_y, planets[i].x, planets[i].y) < 50) {
      planets[i].collisionFound = true;
      score++;
      planets[i].display();
    }
  }
}

function updateTimer() {
  if (frameCount % 60 == 0 && timeLeft > 0) {
    timeLeft--;
  }
}

function gameOver(message) {
  background(0);
  textSize(40);
  fill(255);
  textAlign(CENTER);
  text(message, width / 2, height / 2);
}

class Planets {
  constructor() {
    this.size = random(20, 35);
    this.color = color(random(255), random(255), random(255));
    this.x = random(windowWidth);
    this.y = -random(200); // Start the planets above the canvas
    this.collisionFound = false;
    this.speed = random(1, 4); // Adjust the speed of falling
  }

  display() {
    if (this.collisionFound == false) {
      fill(this.color);
      circle(this.x, this.y, this.size);
      this.y += this.speed; // Update the y position of the planet

      // Reset the planet position if it goes off the bottom of the screen
      if (this.y > height + this.size) {
        this.y = -random(200);
        this.x = random(windowWidth);
      }
    }
  }
}
    
////check collisions
  //if (collideRectCircle(100,300,35,35,main_x, main_y,50)) {
    //gameOver();
  //}
//}