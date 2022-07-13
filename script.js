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