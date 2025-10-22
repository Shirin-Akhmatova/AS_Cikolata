import styles from "./Header.module.scss";
import LogoBanner from "../../assets/Logo/Group 1.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={LogoBanner} alt="AS Çikolata" className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
