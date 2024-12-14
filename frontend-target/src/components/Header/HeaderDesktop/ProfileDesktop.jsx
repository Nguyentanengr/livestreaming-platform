// Styled
import { StyledProfileDesktop } from "./ProfileDesktop.styled";

// React İcons
import { BiUser } from "react-icons/bi";


const ProfileDesktop = () => {

  return (
    <StyledProfileDesktop>
      <div className="profile-box">
        <div className="profile">
          <BiUser />
        </div>
      </div>
    </StyledProfileDesktop>
  );
};

export default ProfileDesktop;
