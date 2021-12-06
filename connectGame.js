const form = document.getElementById("connectForm");
console.log(form);
form.onsubmit = (event) => {
  event.preventDefault();

  const gameId = event.target.gameId.value;
  console.log(gameId);

  if (gameId) {
    fetch(API_URL + "/select-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        state.player = data.player;
        state.gameId = data.gameId;
        state.move = data.currentMove;

        createWSConnection();

        const gameIdSpan = document.getElementById("gameId");
        gameIdSpan.innerHTML = data.gameId;

        const playerSpan = document.getElementById("player");
        playerSpan.innerHTML = data.player;

        const gameStartBlock = document.getElementsByClassName("gameStart")[0];
        gameStartBlock.classList.remove("gameStart_visible");

        const gameBoardBlock = document.getElementsByClassName("gameBoard")[0];
        gameBoardBlock.classList.add("gameBoard_visible");

        fillTable(data.table);
      });
  }
};
