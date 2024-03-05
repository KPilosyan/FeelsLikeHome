import unknown from "../assets/unknown.jpeg";
import styles from "./styles.module.scss";

const UserImage = ({ image }) => {
  return (
    <div className={styles.userImgBox}>
      <img
        className={styles.userImg}
        alt={image}
        src={image ? `http://localhost:3001/assets/${image}` : unknown}
      />
    </div>
  )
};

export default UserImage;