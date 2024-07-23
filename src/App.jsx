import "./App.css";
import Game from "./components/Game";
import Logo from "./components/Logo";
import Header from "./components/Header";
import GameType from "./components/GameType";
import GameBoard from "./components/GameBoard";
import Highscore from "./components/Highscore";
import PlayerMark from "./components/PlayerMark";
import NewGameMenu from "./components/NewGameMenu";

import { useGame } from "./context/GameContext";
import Overlay from "./components/Overlay";

function App() {
  const { status } = useGame();

  return (
    <div className="app-container">
      <Overlay />
      <div className="app">
        {status === "ready" && (
          <NewGameMenu>
            <Logo />
            <PlayerMark />
            <GameType />
          </NewGameMenu>
        )}
        {status === "active" && (
          <Game>
            <Header />
            <GameBoard />
            <Highscore />
          </Game>
        )}
      </div>
    </div>
  );
}

export default App;
