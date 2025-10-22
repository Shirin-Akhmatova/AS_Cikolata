import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.scss";
import Desserts from "../../assets/images/image 9.svg";
import Hot from "../../assets/images/image 9 (1).svg";
import Cold from "../../assets/images/image 9 (2).svg";
import Breakfasts from "../../assets/images/image 9 (3).svg";

export default function HomePage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const categories = [
    { name: t("home.desserts"), img: Desserts, path: "/desserts" },
    { name: t("home.hotDrinks"), img: Hot, path: "/hot" },
    { name: t("home.coldDrinks"), img: Cold, path: "/cold" },
    { name: t("home.breakfasts"), img: Breakfasts, path: "/breakfast" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className={styles.home}>
      <div className={styles.cardsWrapper}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="ru">RU</option>
          <option value="tr">TR</option>
        </select>

        {categories.map((cat) => (
          <div
            key={cat.path}
            className={styles.card}
            onClick={() => navigate(cat.path)}
          >
            <img src={cat.img} alt={cat.name} className={styles.image} />
            <p className={styles.text}>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
