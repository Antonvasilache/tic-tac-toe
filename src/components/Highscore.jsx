import { useGame } from "../context/GameContext";

function Highscore() {
  const { xScore, oScore, tieScore } = useGame();

  return (
    <div className="highscore">
      <div className="highscore-x">
        <p className="body-m">X (YOU)</p>
        <p className="heading-m">{xScore}</p>
      </div>
      <div className="highscore-ties">
        <p className="body-m">TIES</p>
        <p className="heading-m">{tieScore}</p>
      </div>
      <div className="highscore-o">
        <p className="body-m">0 (CPU)</p>
        <p className="heading-m">{oScore}</p>
      </div>
    </div>
  );
}

export default Highscore;
