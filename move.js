const cells = [...document.getElementsByClassName("cell")];

cells.forEach((cell) => {
  cell.onclick = () => {
    console.log("+", state.move, state.player);
    if (state.move === state.player) {
      fetch(API_URL + "/make-move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: state.gameId,
          player: state.player,
          cellNumber: +cell.id,
        }),
      });
    }
  };
});
