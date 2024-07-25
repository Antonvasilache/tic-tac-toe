import { useGame } from "../context/GameContext";
import Button from "./Button";

function ModalReset() {
  const { dispatch, resetPrompt } = useGame();

  function handleCancel(e) {
    e.target.closest(".overlay").classList.add("hidden");
    dispatch({ type: "reset-prompt" });
  }

  function handleReset(e) {
    dispatch({ type: "reset" });
    e.target.closest(".overlay").classList.add("hidden");
  }

  return (
    <div className={`overlay ${resetPrompt ? "" : "hidden"}`}>
      <div className="game-end">
        <div className="game-end-sub">
          <p className="heading-l">Restart game?</p>

          <div className="overlay-buttons">
            <Button
              className="overlay-button heading-xs secondary-button-2"
              onClick={handleCancel}
            >
              No, cancel
            </Button>
            <Button
              className="overlay-button heading-xs secondary-button-1"
              onClick={handleReset}
            >
              Yes, restart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReset;
