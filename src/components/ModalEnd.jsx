import { useGame } from "../context/GameContext";
import Button from "./Button";

function ModalEnd() {
  const { winner, player1Mark, player2Mark, dispatch } = useGame();
  function handleReset() {
    dispatch({ type: "reset" });
  }

  function handleNextRound() {
    dispatch({ type: "next-round" });
  }

  return (
    <div className={`overlay ${!winner ? "hidden" : ""}`}>
      <div className="game-end">
        <div className="game-end-sub">
          <p className={`heading-xs ${winner === "tie" ? "heading-l" : ""}`}>
            {winner === player1Mark
              ? "Player 1 wins"
              : winner === player2Mark
              ? "Player 2 wins"
              : "Round tied"}
          </p>
          {(winner === player1Mark || winner === player2Mark) && (
            <div className="winner heading-l">
              {winner === "O" ? (
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                    fill="#F2B137"
                  />
                </svg>
              ) : (
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                    fill="#31C3BD"
                    fillRule="evenodd"
                  />
                </svg>
              )}

              <span className={winner === "X" ? "light-blue" : "light-yellow"}>
                Takes the round
              </span>
            </div>
          )}
          <div className="overlay-buttons">
            <Button
              className="overlay-button heading-xs secondary-button-2"
              onClick={handleReset}
            >
              Quit
            </Button>
            <Button
              className="overlay-button heading-xs secondary-button-1"
              onClick={handleNextRound}
            >
              Next Round
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEnd;
