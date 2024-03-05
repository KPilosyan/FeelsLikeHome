import Form from "./Form";
import styles from "./styles.module.scss";

const LoginPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          FeelsLikeHome
        </div>
      </div>

      <div className={styles.loginWidget}>
        <div className={styles.description}>
          Find your place in tech community. 
          Join or create a community of 12. 
          Share your ideas and invite people to partner up with you. Develop your idea together.
          Join a community and help others to bring their ideas into life.
        </div>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;