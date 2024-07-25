import "./App.css";
import Game from "./components/Game";
import Logo from "./components/Logo";
import Header from "./components/Header";
import GameType from "./components/GameType";
import ModalEnd from "./components/ModalEnd";
import GameBoard from "./components/GameBoard";
import Highscore from "./components/Highscore";
import PlayerMark from "./components/PlayerMark";
import NewGameMenu from "./components/NewGameMenu";
import ModalReset from "./components/ModalReset";

import { useGame } from "./context/GameContext";

function App() {
  const { status } = useGame();

  return (
    <div className="app-container">
      <ModalEnd />
      <ModalReset />
      <main className="app">
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
      </main>
    </div>
  );
}

export default App;
