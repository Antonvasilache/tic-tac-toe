import { useEffect } from "react";
import { useGame } from "../context/GameContext";

function GameBoard() {
  const {
    playerTurn,
    gameboard,
    dispatch,
    winner,
    gameType,
    player2Mark,
    initialCpuMove,
    moveNumber,
  } = useGame();

  console.log(gameboard);

  function handleMove(e, index) {
    //dispatch will add a mark(playerTurn is "X" or "O") to the gameboard array , at the index corresponding to the clicked tile
    dispatch({ type: "next", payload: { index, playerTurn } });
    //disabling the clicked tile
    e.target.classList.add(`item-disabled-${playerTurn}`);
  }

  function addCpuMove(gameboard) {
    //creating a variable to use the latest gameboard state
    let updatedGameboard = [...gameboard];

    //creating an array with the indices of the remaining tiles
    let remainingTiles = updatedGameboard.reduce((acc, tile, idx) => {
      if (tile === 0) acc.push(idx);

      return acc;
    }, []);

    if (remainingTiles.length > 0) {
      //random index from the remaining tiles array, used to decide the next cpu move
      const randomIndex = Math.floor(Math.random() * remainingTiles.length);
      const cpuMove = remainingTiles[randomIndex];

      //dispatch will add a mark to the gameboard array, using cpuMove as index. Player2Mark is "X" or "O"
      dispatch({ type: "next", payload: { cpuMove, player2Mark } });

      const items = document.querySelectorAll(".gameboard-item");
      //if there is no winner yet, disable the cpu selected tile
      if (!winner && items[cpuMove])
        items[cpuMove].classList.add(`item-disabled-${player2Mark}`);
    }
  }

  function resetBoard() {
    //removing the disabling class on all items every new round
    const items = document.querySelectorAll(".gameboard-item");
    items.forEach((item) => {
      item.classList.remove("item-disabled-X", "item-disabled-O");
    });
  }

  useEffect(() => {
    if (winner) {
      resetBoard();
    }
  }, [winner]);

  //1st CPU move to be made if player 1 selects "O" , game type is vs CPU and there is no winner yet (winner flag resets every round)
  useEffect(() => {
    if (
      !initialCpuMove &&
      player2Mark === "X" &&
      gameType === "CPU" &&
      !winner
    ) {
      addCpuMove(gameboard);
      //dispatch turns initialCpuMove to true, to prevent repeating the move
      dispatch({ type: "initial-cpu-move" });
    }
  }, [winner]);

  //next moves to be made after player 1 makes their move, but not at the start
  useEffect(() => {
    if (
      (gameType === "CPU" &&
        !winner &&
        playerTurn === player2Mark &&
        player2Mark === "O" &&
        !initialCpuMove &&
        moveNumber > 0) ||
      (gameType === "CPU" &&
        !winner &&
        playerTurn === player2Mark &&
        player2Mark === "X" &&
        initialCpuMove &&
        moveNumber > 0)
    )
      setTimeout(() => {
        addCpuMove(gameboard);
      }, 0);
  }, [playerTurn, winner, gameType, player2Mark, gameboard, initialCpuMove]);

  return (
    <div className="gameboard">
      {gameboard.map((item, index) => (
        <div
          className={`gameboard-item ${item ? `item-disabled-${item}` : ""}`}
          key={index}
          onClick={(e) => handleMove(e, index)}
        >
          <svg
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            className={`gameboard-x-outline ${
              playerTurn === "X" ? "x-active" : ""
            }`}
          >
            <path
              d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
              stroke="#31C3BD"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <svg
            width="66"
            height="66"
            xmlns="http://www.w3.org/2000/svg"
            className={`gameboard-o-outline ${
              playerTurn === "O" ? "o-active" : ""
            }`}
          >
            <path
              d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
              stroke="#F2B137"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
