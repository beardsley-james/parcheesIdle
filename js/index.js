if (localStorage.getItem("save")) {
  var game = JSON.parse(localStorage.getItem("save"))
} else {
  var game = {
    boardLength: 24,
    name: "Default",
    pieces: [
      [0],
      [0],
      [0],
      [0]
    ],
    dice: [1],
    speed: 500,
    turn: 0,
    maxDie: 6,
    score: 0
  }
}

let board = document.createElement("div");
board.id = "board";

let spaces = document.createElement("div");
spaces.id = "spaces";

for (i = 0; i < game.boardLength; i++){
  let space = document.createElement("div");
  space.id = "space" + i;
  space.classList.add("space");
  spaces.appendChild(space)
}

board.appendChild(spaces);

let homeBoards = document.createElement("div");
homeBoards.id = "homeBoards"

for (i = 0; i < game.pieces.length; i++){
  let homeBoard = document.createElement("div");
  homeBoard.classList.add("homeBoard");
  homeBoard.id = "homeBoard" + i;
  homeBoards.appendChild(homeBoard);
  for (j = 0; j < game.pieces[i].length; j++){
    let piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add("player" + i);
    piece.id = "p" + i + "n" + j;
    if (game.pieces[i][j] == 0) {
      homeBoard.appendChild(piece)
    } else {
      let space = spaces.childNodes[game.pieces[i][j]];
      console.log (game.pieces[i][j]);
      space.appendChild(piece)
    }
  }
  homeBoards.appendChild(homeBoard)
};

let timer = document.createElement("div");
timer.classList.add("player" + game.turn);
timer.id = "timer";
timer.innerHTML = game.speed/1000;
homeBoards.appendChild(timer);

board.appendChild(homeBoards);

let dice = document.createElement("div");
dice.id = "dice";

for (i = 0; i < game.dice.length; i++){
  let die = document.createElement("div");
  die.innerHTML = game.dice[i];
  die.classList.add("die");
  die.id = "die" + i;
  dice.appendChild(die)
}

let score = document.createElement("div");
score.innerHTML = "Points: ";
score.id = "score";
let scoreValue = document.createElement("span");
scoreValue.innerHTML = game.score;
scoreValue.id = "scoreValue";
score.appendChild(scoreValue);
dice.appendChild(score);

board.appendChild(dice);

document.body.appendChild(board)

function rollDie(){
  let roll = Math.floor(Math.random() * (game.maxDie)) + 1;
  console.log(roll);
  let pieceNumber = selectRandomPiece();
  console.log(pieceNumber);
  game.pieces[game.turn][pieceNumber] = game.pieces[game.turn][pieceNumber] + roll;
  if (game.pieces[game.turn][pieceNumber] > 23) {
    let piece = document.getElementById("p" + game.turn + "n" + pieceNumber);
    let homeBoard = document.getElementById("homeBoard" + game.turn);
    game.pieces[game.turn][pieceNumber] = 0;
    homeBoard.appendChild(piece);
    if (game.turn == 0) {
      game.score += 1
    }
    document.getElementById("scoreValue").innerHTML = game.score
  } else {
    let piece = document.getElementById("p" + game.turn + "n" + pieceNumber);
    let space = document.getElementById("space" + game.pieces[game.turn][pieceNumber]);
    space.appendChild(piece)
  }
  return roll
}

function selectRandomPiece(){
  return Math.floor(Math.random() * (game.pieces[game.turn].length))
}

setTimeout(function timer(){
  for (i = 0; i < game.dice.length; i++){
    game.dice[i] = rollDie(game.dice[i]);
    let die = document.getElementById("die" + i);
    die.innerHTML = game.dice[i]
  }
  game.turn += 1;
  if (game.turn == game.pieces.length){
    game.turn = 0
  }
  setTimeout(timer, game.speed)
}, game.speed)
