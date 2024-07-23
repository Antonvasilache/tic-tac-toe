import { useGame } from "../context/GameContext";
import Button from "./Button";

function GameType() {
  const { dispatch } = useGame();

  function handleGameType(type) {
    dispatch({ type: "start", payload: type });
  }

  return (
    <div className="game-type">
      <Button
        className="heading-s primary-button-1"
        onClick={() => handleGameType("CPU")}
      >
        New game (vs CPU)
      </Button>
      <Button
        className="heading-s primary-button-2"
        onClick={() => handleGameType("Player")}
      >
        New game (vs Player)
      </Button>
    </div>
  );
}

export default GameType;
