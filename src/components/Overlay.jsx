import Button from "./Button";

function Overlay() {
  return (
    <div className="overlay">
      <div className="game-end">
        <div className="game-end-sub">
          <p className="heading-xs">Player 1 wins!</p>
          <div className="winner heading-l">
            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </svg>
            <span>Takes the round</span>
          </div>
          <div className="overlay-buttons">
            <Button className="overlay-button heading-xs secondary-button-2">
              Quit
            </Button>
            <Button className="overlay-button heading-xs secondary-button-1">
              Next Round
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
