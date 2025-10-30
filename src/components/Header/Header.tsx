import styles from "./Header.module.scss";
import LogoBanner from "../../assets/Logo/Group 1.svg";
import ChipsChoice from "../ChipsChoice/ChipsChoice";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={LogoBanner} alt="AS Çikolata" className={styles.logo} />
      </div>
      <ChipsChoice />
    </header>
  );
};

export default Header;
