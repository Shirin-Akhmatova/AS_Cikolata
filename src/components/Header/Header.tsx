import styles from "./Header.module.scss";
import LogoBanner from "../../assets/Logo/Group 1.svg";
import ChipsChoice from "../ChipsChoice/ChipsChoice";

interface HeaderProps {
  showChips: boolean;
}

const Header: React.FC<HeaderProps> = ({ showChips }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={LogoBanner} alt="AS Çikolata" className={styles.logo} />
      </div>
      {/* показыаем выбор категорий */}
      {showChips && <ChipsChoice />}
    </header>
  );
};

export default Header;
