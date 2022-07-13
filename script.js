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