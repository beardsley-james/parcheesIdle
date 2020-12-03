if (localStorage.getItem("save")) {
  var game = JSON.parse(localStorage.getItem("save"))
} else {
  var game = {
    boardLength: 24,
    name: "Default",
    pieces: [
      [0, 0, 0, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 5],
      [0, 7, 0, 0]
    ],
    dice: [1, 1],
    speed: 1000,
    turn: 0
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

board.appendChild(dice);

document.body.appendChild(board)
