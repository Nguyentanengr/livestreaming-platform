import { HeaderContainer } from "./Header.styled";

//React
import { Link, useLocation } from "react-router-dom";

// React icons
import { BsTwitch, BsSuitDiamondFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { BiSearch, BiMessageAlt, BiArchive } from "react-icons/bi";
import { CgCrown } from "react-icons/cg";

const Header = ({ mySize }) => {
  const { pathname } = useLocation();

  return (
    <HeaderContainer>
      <>
        <div className="header-box">
          <header>
            <div className="left">
              <ul>
                <li>
                  <div className="item">
                    <Link to="/">
                      <div className="logo">
                        <div className="logo-bg" />
                        <BsTwitch />
                      </div>
                    </Link>
                  </div>
                </li>
                <li>
                  <Link to="/following" className="Link">
                    <div className="item">Following</div>
                  </Link>
                </li>
                <li>
                  <Link to="/browser" className="Link">
                    <div className="item">Browse</div>
                  </Link>
                </li>
                <li>
                  <div className="item">
                    <FaEllipsisV className="item-icon" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="bottom">
              <div className="search-bar">
                <input type="text" placeholder="Search" />
                <div className="search-icon">
                  <BiSearch />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="right-icons">
                <ul>
                  <li>
                    <CgCrown />
                  </li>
                  <li>
                    <BiArchive />
                  </li>
                  <li>
                    <BiMessageAlt />
                  </li>
                  <li className="bits">
                    <BsSuitDiamondFill />
                    <span>Get Bits</span>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </>
    </HeaderContainer>
  );
};

export default Header;