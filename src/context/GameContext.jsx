import { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

function saveStateToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ticTacToeState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
}

function loadStateFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("ticTacToeState");

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not save state", err);
    return undefined;
  }
}

const savedState = loadStateFromLocalStorage();

const initialState = {
  status: "ready",
  player1Mark: "O",
  player2Mark: "X",
  gameType: null,
  playerTurn: null,
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  xScore: 0,
  oScore: 0,
  tieScore: 0,
  winner: null,
  resetPrompt: false,
  initialCpuMove: false,
  moveNumber: 0,
};

const loadedState = savedState || initialState;

//checks if the current gameboard state matches any of the win conditions for Tic Tac Toe
function checkWinCondition(gameboard) {
  //every item is a combination of indices on the gameboard
  const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];

  //check if any of the current marks on the gameboard match any of the win condtions, and return the winning mark ("X" or "O")
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameboard[a] &&
      gameboard[a] === gameboard[b] &&
      gameboard[a] === gameboard[c]
    ) {
      return gameboard[a];
    }
  }

  //if all gameboard items are filled, and no pattern is matched, the game is a tie
  if (gameboard.every((square) => square !== 0)) return "tie";

  return null;
}

function reducer(state, action) {
  let newState;

  switch (action.type) {
    //selecting player 1's mark
    case "mark":
      newState = {
        ...state,
        player1Mark: action.payload,
        player2Mark: action.payload === "X" ? "O" : "X",
      };
      break;

    //starting the game
    case "start":
      newState = {
        ...state,
        status: "active",
        gameType: action.payload,
        playerTurn: "X",
      };
      break;

    //next turn
    case "next":
      //generating the updated gameboard (either for player 1, or for CPU, if applicable)
      const newGameboard = state.gameboard.map(
        (item, index) =>
          (item =
            index === action.payload.index
              ? action.payload.playerTurn
              : index === action.payload.cpuMove
              ? action.payload.player2Mark
              : item)
      );
      //checking and storing win condition after every turn
      const winResult = checkWinCondition(newGameboard);
      newState = {
        ...state,
        playerTurn: state.playerTurn === "X" ? "O" : "X",
        gameboard: newGameboard,
        xScore: winResult === "X" ? state.xScore + 1 : state.xScore,
        oScore: winResult === "O" ? state.oScore + 1 : state.oScore,
        tieScore: winResult === "tie" ? state.tieScore + 1 : state.tieScore,
        winner: winResult ? winResult : null,
        moveNumber: state.moveNumber + 1,
      };
      break;

    //showing reset game modal
    case "reset-prompt":
      return {
        ...state,
        resetPrompt: !state.resetPrompt,
      };

    //resetting the game
    case "reset":
      newState = {
        ...initialState,
        player1Mark: state.player1Mark,
        player2Mark: state.player2Mark,
      };
      break;

    //starting next round, after a win condition was met
    case "next-round":
      newState = {
        ...state,
        playerTurn:
          state.player1Mark === "O"
            ? state.playerTurn === "X"
              ? "O"
              : "X"
            : state.player1Mark,
        gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        winner: null,
        initialCpuMove: false,
      };
      break;

    //flagging that cpu made the first move
    case "initial-cpu-move":
      newState = {
        ...state,
        initialCpuMove: true,
      };
      break;

    default:
      throw new Error("unkown action");
  }

  saveStateToLocalStorage(newState);
  return newState;
}

function GameProvider({ children }) {
  const [
    {
      status,
      player1Mark,
      player2Mark,
      gameType,
      playerTurn,
      gameboard,
      xScore,
      oScore,
      tieScore,
      winner,
      resetPrompt,
      initialCpuMove,
      moveNumber,
    },
    dispatch,
  ] = useReducer(reducer, loadedState);

  return (
    <GameContext.Provider
      value={{
        status,
        player1Mark,
        player2Mark,
        gameType,
        playerTurn,
        gameboard,
        xScore,
        oScore,
        tieScore,
        winner,
        resetPrompt,
        initialCpuMove,
        moveNumber,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("Context was used outside of the Game Provider");

  return context;
}

export { GameProvider, useGame };
