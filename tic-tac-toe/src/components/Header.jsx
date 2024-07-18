import Button from "./Button";
import Logo from "./Logo";
import Turn from "./Turn";

function Header() {
  return (
    <div className="header">
      <Logo />
      <Turn />
      <Button className="secondary-button-2 restart-button">
        <img src="icon-restart.svg" />
      </Button>
    </div>
  );
}

export default Header;
