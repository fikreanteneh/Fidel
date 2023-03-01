import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../NavBar/Nav.css";
import Cookies from "universal-cookie";
import homeLogo from "../../assets/homeLogo.jpg";
import { useGlobalState } from "../../StateProvider";

const cookies = new Cookies();
const logOut = () => {
  // * the logic here is to clear the cookies anf refresh
  cookies.remove("token");
  cookies.remove("userId");
  cookies.remove("username");
  cookies.remove("fullName");
  cookies.remove("avatarURL");
  cookies.remove("hashedPassword");
  cookies.remove("phoneNumber");

  //  I can CALL A DISPATCH FUNCTION HERE BUT WINDOW RELOAD WLL SET USER TO NULL
  window.location.reload();
};

const SideBar = ({ logOut }) => {
  return (
    <div className="sidebar-option">
      <div>
        <div className="logoutOption">
          <Link className="profileLink" to={"/profile"}>
            <i className="fa-solid fa-user">
              <span>Profile</span>
            </i>
          </Link>
        </div>
        <div onClick={logOut} className="logoutOption">
          {/* <img src={logout} alt="logout" width={"30"} /> */}
          <i className="fa-sharp fa-solid fa-right-from-bracket">
            <span>Log out</span>
          </i>
        </div>
      </div>
    </div>
  );
};

// !a profile hover function

const NavBar = () => {
  const [{ user }, dispatch] = useGlobalState();

  return (
    <nav className="NavBar-wrapper">
      <div className="homelogo">
        {/* <img class="homelogo" src={homeLogo} /> */}
        <i className="fa-solid fa-pen-nib"></i>
      </div>

      <div className="navigations">
        <Link className="nav-links" to={"/"}>
          Home
        </Link>
        {user?.role !== "Admin" && (
          <>
            <Link className="nav-links" to={"/resource"}>
              Resource
            </Link>
          </>
        )}
        <Link className="nav-links" to={"/chatroom"}>
          Classroom
        </Link>
        {user?.role === "Admin" && (
          <>
            <Link className="nav-links" to={"/announcement"}>
              Announcement
            </Link>
            <Link className="nav-links" to={"/register"}>
              Register
            </Link>
          </>
        )}

        {user?.role === "Student" ? (
          <Link className="nav-links" to={"/grades"}>
            Grade
          </Link>
        ) : user?.role === "Teacher" ? (
          <Link className="nav-links" to={"/myclass"}>
            My Class
          </Link>
        ) : (
          <Link className="nav-links" to={"/placement"}>
            Placement
          </Link>
        )}
      </div>
      <div className="profile">
        <i className="fa-solid fa-user"></i>
        <SideBar logOut={logOut} />
      </div>
    </nav>
  );
};

export default NavBar;
