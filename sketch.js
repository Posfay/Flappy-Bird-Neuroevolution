const POPULATION_SIZE = 500;
const KEZD_X = 150;
const EMPTY_HEIGHT = 150;
const PIPE_WIDTH = 80;
const PIPE_VELOCITY = 5;
const GRAVITY = 0.95;
const BIRD_LIFT_ACCELERATION = -13;
const FRAME_PER_PIPE = 60;
const CLOSEST_PIPE_TO_SCREEN = 40;


/*

-----original flappy bird----------------------------
const KEZD_X = 150;
const EMPTY_HEIGHT = 150;
const PIPE_WIDTH = 80;
const PIPE_VELOCITY = 5;
const GRAVITY = 0.95;
const BIRD_LIFT_ACCELERATION = -13;
const FRAME_PER_PIPE = 60;
const CLOSEST_PIPE_TO_SCREEN = 40;

-----extreme hard------------------------------------
const KEZD_X = 100;
const EMPTY_HEIGHT = 110;
const PIPE_WIDTH = 70;
const PIPE_VELOCITY = 16;
const GRAVITY = 1.2;
const BIRD_LIFT_ACCELERATION = -14;
const FRAME_PER_PIPE = 55;
const CLOSEST_PIPE_TO_SCREEN = 70;

*/


let showBest = false;
let birds = [];
let savedBirds = [];
let pipes = [];
let slider;
let highscoreText;
let scoreText;
let gameScore = 0;
let kezdY;
let gen = 1;
let counter = 0;
let highscore = 0;
let button;

function buttonPressed() {
  showBest = !showBest;
  if (showBest) {
    button.html("Show All");
  } else {
    button.html("Show Best");
  }
}

function keyPressed() {
  if (key === 'S') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
  }
}

function setup() {
  createCanvas(1000, 600);
  slider = createSlider(1, 50, 1);
  scoreText = createP(gameScore);
  highscoreText = createP(highscore);
  button = createButton("Show Best");
  button.mousePressed(buttonPressed);
  for (let i = 0; i < POPULATION_SIZE; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % FRAME_PER_PIPE == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }

      if (pipes[i].x + pipes[i].w + pipes[i].speed + 1 > KEZD_X && pipes[i].x + pipes[i].w < KEZD_X) {
        gameScore++;
        if (gameScore > highscore) {
          highscore = gameScore;
        }
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      gameScore = 0;
      pipes = [];
    }
  }

  // All the drawing stuff
  background(135,206,250);

  //showing birds
  if (showBest) {
    birds[0].show();
  } else {
    for (let bird of birds) {
      bird.show();
    }
  }

  //showing the pipes
  for (let pipe of pipes) {
    pipe.show();
  }

  //basic background display stuff
  fill(0,0,200);
  strokeWeight(1);
  textAlign(CENTER);
  textSize(24);
  text(gen+"", width - 50, 50);
  textSize(32);
  text(gameScore+"", width / 2, height - 50);

  scoreText.html("Current Score: " + gameScore);
  highscoreText.html("Highscore is: " + highscore);
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
