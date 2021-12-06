const API_URL = "https://ttt-course-server.herokuapp.com";
const WS_URL = "wss://ttt-course-server.herokuapp.com/ws";
// const API_URL = "http://localhost:3000";
// const WS_URL = "ws://localhost:3000/ws";

const state = {
  player: null,
  gameId: null,
  _move: "X",

  set move(val) {
    const moveContainer = document.getElementById("move");
    moveContainer.innerHTML = val;

    this._move = val;
  },

  get move() {
    return this._move;
  },
};

console.log(state.move);

const startButton = document.getElementById("start_btn");

startButton.onclick = () => {
  fetch(API_URL + "/start-game", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      state.player = data.player;
      state.gameId = data.gameId;

      createWSConnection();

      const gameIdSpan = document.getElementById("gameId");
      gameIdSpan.innerHTML = data.gameId;

      const playerSpan = document.getElementById("player");
      playerSpan.innerHTML = data.player;

      const gameStartBlock = document.getElementsByClassName("gameStart")[0];
      gameStartBlock.classList.remove("gameStart_visible");

      const gameBoardBlock = document.getElementsByClassName("gameBoard")[0];
      gameBoardBlock.classList.add("gameBoard_visible");
    });
};

const fillTable = (table) => {
  const cells = [...document.getElementsByClassName("cell")];
  cells.forEach((cell, i) => {
    cell.innerHTML = table[i];
  });
};
