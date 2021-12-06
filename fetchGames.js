const select = document.getElementById("games-select");

fetch(API_URL + "/gameid-list")
  .then((res) => res.json())
  .then((data) => {
    select.removeChild(select.lastElementChild);

    data.forEach((gameId) => {
      const option = document.createElement("option");
      option.value = gameId;
      option.innerHTML = gameId;
      select.appendChild(option);
    });
  });
