import unknown from "../assets/unknown.jpeg";
import styles from "./styles.module.scss";

const UserImage = ({ image }) => {
  return (
    <div className={styles.userImgBox}>
      <img
        className={styles.userImg}
        alt={image}
        src={image ? `${process.env.REACT_APP_API_URL}/assets/${image}` : unknown}
      />
    </div>
  )
};

export default UserImage;