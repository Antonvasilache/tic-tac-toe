import { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

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
};

function checkWinCondition(gameboard) {
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

  if (gameboard.every((square) => square !== 0)) return "tie";

  return null;
}

function reducer(state, action) {
  switch (action.type) {
    case "mark":
      return {
        ...state,
        player1Mark: action.payload,
        player2Mark: action.payload === "X" ? "O" : "X",
      };

    case "start":
      return {
        ...state,
        status: "active",
        gameType: action.payload,
        playerTurn: "X",
      };

    case "reset":
      return {
        ...initialState,
        player1Mark: state.player1Mark,
        player2Mark: state.player2Mark,
      };

    case "next":
      const newGameboard = state.gameboard.map(
        (item, index) =>
          (item =
            index === action.payload.index ? action.payload.playerTurn : item)
      );
      const winResult = checkWinCondition(newGameboard);
      return {
        ...state,
        playerTurn: state.playerTurn === "X" ? "O" : "X",
        gameboard: newGameboard,
        // status: winResult ? "finished" : state.status,
        xScore: winResult === "X" ? state.xScore + 1 : state.xScore,
        oScore: winResult === "Y" ? state.oScore + 1 : state.oScore,
        tieScore: winResult === "tie" ? state.tieScore + 1 : state.tieScore,
      };

    default:
      throw new Error("unkown action");
  }
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
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
