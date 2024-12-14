import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

const Header = ({ mySize }) => {
  return (
    <div className="header">
      <HeaderDesktop mySize={mySize} />
    </div>
  );
};

export default Header;
