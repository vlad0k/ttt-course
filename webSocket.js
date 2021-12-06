const createWSConnection = () => {
  const ws = new WebSocket(WS_URL + `/${state.gameId}`);
  ws.onopen = () => console.log("ws open");

  ws.onmessage = (msg) => {
    const message = JSON.parse(msg.data);

    if (message.type === "TABLE") {
      fillTable(message.table);
      state.move = message.currentMove;
    }

    if (message.type === "DRAW") {
      const winContainer = document.getElementsByClassName("winContainer")[0];

      winContainer.innerHTML = "Round Draw!";
    }

    if (message.type === "WIN") {
      const winContainer = document.getElementsByClassName("winContainer")[0];

      winContainer.innerHTML = `Winner is: ${message.winner}`;
    }
  };
};
