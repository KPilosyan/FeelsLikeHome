import { useState } from "react";
import { PiBellSimple } from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { PiMoon } from "react-icons/pi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import {
  IconButton,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "helpers/FlexBetween";
import UserImage from "helpers/UserImage";
import useLocalStorage from "use-local-storage";
import styles from "./styles.module.scss";

const Navbar = ({ picturePath }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 768px)");
  const [themeMode, setThemeModeLocalStorage] = useLocalStorage('themeMode', 'light');

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setMode(newThemeMode));
    setThemeModeLocalStorage(newThemeMode);
  };

  const iconList = [
    { icon: <AiOutlineUsergroupAdd className={styles.icon} />, name: 'usergroup' },
    { icon: <IoChatbubbleOutline className={styles.icon} />, name: 'chatbubble' },
    { icon: <PiBellSimple className={styles.icon} />, name: 'bell' },
  ];

  return (
    <FlexBetween className={styles.wrapper} >
      <FlexBetween className={styles.leftside}>
        <div className={styles.logo} onClick={() => navigate("/home")}>
          <div className={styles.logoText}>
            FeelsLikeHome
          </div>
        </div>
        {isNonMobileScreens && (
          <div className={styles.searchBox}>
            <IconButton>
              <RiSearch2Line className={styles.searchIcon} />
            </IconButton>
            <InputBase placeholder="Search..." className={styles.searchInput} />
          </div>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween className={styles.rightside}>
          {iconList.map((item, index) => (
            <div key={index} className={styles.iconBox}>
              {item.icon}
            </div>
          ))}
          <div onClick={toggleTheme} className={styles.iconBox}>
            {themeMode === "dark" ? (
              <FiSun className={styles.icon} />
            ) : (
              <PiMoon className={styles.icon} />
            )}
          </div>
          <div
            className={styles.userImage}
            onClick={() => {
              navigate(`/profile/${user._id}`);
            }}>
            <UserImage image={picturePath} />
          </div>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <div className={styles.mobileWrapper}>
          {/* CLOSE ICON */}
          <div className={styles.closeIcon} >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </div>

          {/* MENU ITEMS */}
          <FlexBetween className={styles.menuItems}>
            <IconButton
              onClick={toggleTheme}
              className={styles.mobileIcon}
            >
              {themeMode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode />
              )}
            </IconButton>
            <Message />
            <Notifications />
            <div
              className={styles.userImage}
              onClick={() => {
                navigate(`/profile/${user._id}`);
              }}>
              <UserImage image={picturePath} />
            </div>
          </FlexBetween>
        </div>
      )}
    </FlexBetween>
  );
};

export default Navbar;