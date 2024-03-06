import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import MyPostWidget from "widgets/MyPost/index";
import PostsWidget from "widgets/PostsWidget";
import PartnerListWidget from "widgets/PartnerList/index";
import SideMenu from "components/SideMenu";
import styles from "./styles.module.scss";
import CreateCommunityButton from "components/CreateCommunityButton";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:768px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar picturePath={picturePath} />
      <div className={styles.container}>
        <div className={styles.leftmostColumn}>
          <SideMenu userId={_id} picturePath={picturePath} />
        </div>
        <div className={styles.mainFeed}>
          <MyPostWidget />
          <PostsWidget userId={_id} />
        </div>
        {isNonMobileScreens && (
          <div className={styles.rightmostColumn}>
            <PartnerListWidget userId={_id} />
            <CreateCommunityButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;