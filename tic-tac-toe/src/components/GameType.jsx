import Button from "./Button";

function GameType() {
  return (
    <div className="game-type">
      <Button className="heading-s primary-button-1">New game (vs CPU)</Button>
      <Button className="heading-s primary-button-2">
        New game (vs Player)
      </Button>
    </div>
  );
}

export default GameType;
