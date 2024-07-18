import "./App.css";
import Game from "./components/Game";
import Logo from "./components/Logo";
import Header from "./components/Header";
import GameType from "./components/GameType";
import GameBoard from "./components/GameBoard";
import Highscore from "./components/Highscore";
import PlayerMark from "./components/PlayerMark";
import NewGameMenu from "./components/NewGameMenu";

function App() {
  return (
    <div className="app-container">
      <div className="app">
        {/* <NewGameMenu>
          <Logo />
          <PlayerMark />
          <GameType />
        </NewGameMenu> */}
        <Game>
          <Header />
          <GameBoard />
          <Highscore />
        </Game>
      </div>
    </div>
  );
}

export default App;
