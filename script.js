const playArea = document.getElementById('game');
const context = playArea.getContext('2d'); //canvas parameter


//I would like about 80 bricks in total so the best symmetrical way to do that is 84 bricks
//Hence there should be 6 rows of 14 bricks 

// creating an object to make making this grid easier 
//And to stop it looking mundane going to have a few different colours 
const brickColorObject = {
    'Pi': 'pink',
    'Wh': 'white',
    'Go': 'gold',
    'Aq': 'aqua'
  };

const level1 = [

  ['Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi'],
  ['Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh'],
  ['Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go'],
  ['Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq'],
  ['Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi','Pi'],
  ['Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh','Wh'],
  ['Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go','Go'],
  ['Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq','Aq']
];


// With canvas i need to set brick parameters here
const brickPadding = 2;
const brickWidth = 22;
const brickHeight = 12;

//14 times 22 is 308 and the padding adds up to 26 so the walls need to be 24 to use the whole space
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
    width: 4,
    height: 4,
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
  
   
  }

  // need to initiate the loop to let the game run
requestAnimationFrame(loop);