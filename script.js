const playArea = document.getElementById('game');
const context = playArea.getContext('2d'); //canvas parameter


//I would like about 120 bricks in total so the best symmetrical way to do that is 112 bricks
//Hence there should be 8 rows of 14 bricks 

// creating an object to make making this grid easier 
//And to stop it looking mundane going to have a few different colours 
const brickColorObject = {
  'Bl': 'black',
  'Pi': 'pink',
  'Wh': 'white',
  'Go': 'gold',
  'Aq': 'aqua'
};

const level1 = [

['Pi','Bl','Pi','Bl','Pi','Bl','Pi','Bl','Bl','Bl','Pi','Pi','Bl','Pi'],
['Bl','Wh','Bl','Bl','Wh','Bl','Wh','Bl','Bl','Bl','Wh','Bl','Wh','Bl'],
['Bl','Go','Bl','Bl','Go','Bl','Go','Bl','Go','Bl','Go','Bl','Go','Bl'],
['Bl','Aq','Bl','Aq','Bl','Aq','Aq','Bl','Aq','Bl','Aq','Bl','Aq','Bl'],
['Bl','Pi','Bl','Pi','Bl','Pi','Pi','Bl','Pi','Bl','Pi','Bl','Bl','Bl'],
['Bl','Wh','Bl','Bl','Wh','Bl','Wh','Bl','Wh','Bl','Wh','Bl','Wh','Bl'],
['Bl','Go','Bl','Bl','Go','Bl','Go','Bl','Go','Bl','Go','Bl','Go','Bl'],
['Aq','Bl','Aq','Bl','Aq','Bl','Aq','Bl','Aq','Bl','Aq','Bl','Aq','Bl']
];


// With canvas i need to set brick parameters here
const brickPadding = 2;
const brickWidth = 18;
const brickHeight = 12;

//14 times 18 is 252 and the padding adds up to 26 so the walls need to be 24 to use the whole space for mobile
//Overall width was originally 400 but that caused mobile issues
const borderWallSize = 12;
const bricks = [];



//Need to genrate level plan by running for loops for both rows and columns
for (let row = 0; row < level1.length; row++) {
for (let column = 0; column < level1[row].length; column++) {
  const level1Layout = level1[row][column];
  
  bricks.push({
    xAxis: borderWallSize + (brickWidth + brickPadding) * column,
    yAxis: borderWallSize + (brickHeight + brickPadding) * row,
    color: brickColorObject[level1Layout],
    width: brickWidth,
    height: brickHeight
  });
}
}

//paddle parameters
const paddle = {
  xAxis: playArea.width / 2,
  yAxis: 440,
  width: brickWidth * 1.5,
  height: brickHeight / 5,
  velocityXAxis: 0
};

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

//ball parameters
const ball = {
  xAxis: getRandomInteger,
  yAxis: 200,
  width: 4.5,
  height: 4.5,
  velocity: 3,
  //initial velocity
  velocityXAxis: 0,
  velocityYAxis: 0
};

// COLLISION - function named accordingly to make later collision code more readable
const collisionBetween = (object1, object2) => { //collision was difficult so i'm going to be very detailed with notes - basically all the cases below determine when co-ordinates overlap
  return object1.xAxis < object2.xAxis + object2.width && // 1's x-co-ordinate is less than 2's + 2's width
         object1.xAxis + object1.width > object2.xAxis && // 1's x-co-ordinate +width is more than 2's y-co-ordinate
         object1.yAxis < object2.yAxis + object2.height && //1's y-co-ordinate is less than 2's + 2's height
         object1.yAxis + object1.height > object2.yAxis; // 1's y-co-ordinate + height is more than 2's y-co-ordinate
}
  



//With canvas i have to do an animation loop to draw in all the previously described features and have them displayed on the canvas
const loop = () => {
  requestAnimationFrame(loop);
  //next line is kinda like a fresh slate which enables the loop to run effectively
  //without which the ball and paddle just stay constant and streaky
  //E.g the game shows every position theyve been in
  context.clearRect(0,0,playArea.width,playArea.height);
  
  paddle.xAxis += paddle.velocityXAxis;
  
  // need to stop the paddle travelling through the wall 
  if (paddle.xAxis < borderWallSize) {
    paddle.xAxis = borderWallSize
  }
  else if (paddle.xAxis + brickWidth > playArea.width - borderWallSize) {
    paddle.xAxis = playArea.width - borderWallSize - brickWidth;
  }
  
  ball.xAxis += ball.velocityXAxis;
  ball.yAxis += ball.velocityYAxis;
  
  // Need to stop the ball escaping the play area by inverting its velocity-component when it hits respective walls
  if (ball.xAxis < borderWallSize) {
    ball.xAxis = borderWallSize;
    ball.velocityXAxis *= -1;
  }
  else if (ball.xAxis + ball.width > playArea.width - borderWallSize) {
    ball.xAxis = playArea.width - borderWallSize - ball.width;
    ball.velocityXAxis *= -1;
  }
  if (ball.yAxis < borderWallSize) {
    ball.yAxis = borderWallSize;
    ball.velocityYAxis *= -1;
  }
  
  //Need a way to reset ball if it hits the (invisible) bottom
    if (ball.yAxis > playArea.height) {
      ball.xAxis = 130;
      ball.yAxis = 260;
      ball.velocityXAxis = 0;
      ball.velocityYAxis = 0;
    }
  
    //In order for game to work when ball hits paddle it should bounce
    if (collisionBetween(ball, paddle)) {
      ball.velocityYAxis *= -1;
      ball.yAxis = paddle.yAxis - ball.height;
    }
  
    //When ball hit brick = bounce and remove brick
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];
  
      if (collisionBetween(ball, brick)) {
          bricks.splice(i, 1);
  
      if (ball.yAxis + ball.height - ball.velocity <= brick.yAxis ||
          ball.yAxis >= brick.yAxis + brick.height - ball.velocity) {
          ball.velocityYAxis *= -1;
      }
      else {
        ball.velocityXAxis *= -1;
      }
      break;
    }
  }
  
  // render the walls, ball, paddle and then bricks for the game
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, playArea.width, borderWallSize);
  context.fillRect(0, 0, borderWallSize, playArea.height);
  context.fillRect(playArea.width - borderWallSize, 0, borderWallSize, playArea.height);
  
  // ball
  if (ball.velocityXAxis || ball.velocityYAxis) {
    context.fillRect(ball.xAxis, ball.yAxis, ball.width, ball.height);
  }
  //paddle
  context.fillStyle = 'cyan';
  context.fillRect(paddle.xAxis, paddle.yAxis, paddle.width, paddle.height);
  // bricks
  bricks.forEach((brick) => {
    context.fillStyle = brick.color;
    context.fillRect(brick.xAxis, brick.yAxis, brick.width, brick.height);
  });
}

// Using event listeners to allow movement of the paddle using the arrow keys (Left then right)
document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowLeft") {
    paddle.velocityXAxis = -3;
  }
  else if (event.key === "ArrowRight") {
    paddle.velocityXAxis = 3;
  }
  
  //Need to start the game using space
  //so ball needs to be stationary 
  if (ball.velocityXAxis === 0 && ball.velocityYAxis === 0 && event.key === " ") {
    ball.velocityXAxis = ball.velocity;
    ball.velocityYAxis = ball.velocity;
  }
  
});

// Had to add next line of code so that when i let go of the arrow keys the paddle then becomes stationary
document.addEventListener('keyup', (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    paddle.velocityXAxis = 0;
  }
});

//Branched work - need to have a game refresh button using the enter button
window.addEventListener("keypress",(event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button__reset").click();
  }
});

//Making buttons for non keyboard devices
const ArrowLeft = () =>{
  paddle.velocityXAxis = -3
}
const ArrowRight = () => {
  paddle.velocityXAxis = 3
}
const startGame = () => {
  if (ball.velocityXAxis === 0 && ball.velocityYAxis === 0) {
    ball.velocityXAxis = ball.velocity;
    ball.velocityYAxis = ball.velocity;
  }
};


// need to initiate the loop to let the game run
requestAnimationFrame(loop);