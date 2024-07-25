import { useGame } from "../context/GameContext";
import Button from "./Button";
import Logo from "./Logo";
import Turn from "./Turn";

function Header() {
  const { dispatch } = useGame();

  function resetPrompt() {
    dispatch({ type: "reset-prompt" });
  }

  return (
    <div className="header">
      <Logo />
      <Turn />
      <Button
        className="secondary-button-2 restart-button"
        onClick={resetPrompt}
      >
        <img src="icon-restart.svg" />
      </Button>
    </div>
  );
}

export default Header;
