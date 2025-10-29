import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { useLanguage } from "../../components/LanguageContext/LanguageContext";

interface ApiCategory {
  id: number;
  name?: string;
  title?: string;
  image?: string;
  subcategories?: ApiCategory[];
  products?: any[];
}

export default function HomePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    fetch(`/api/menucategories/?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки категорий");
        return res.json();
      })
      .then((data: ApiCategory[]) => {
        const topCategories = data.filter((cat) =>
          [12, 13, 14, 15].includes(cat.id)
        );

        const order = [12, 13, 14, 15];
        const orderedCategories = topCategories.sort(
          (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
        );

        setCategories(orderedCategories);
      })
      .catch((err) => console.error(err));
  }, [language]);

  return (
    <div className={styles.home}>
      <div className={styles.languageWrapper}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="ru">RU</option>
          <option value="tr">TR</option>
        </select>
      </div>

      <div className={styles.column}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.card}
            onClick={() => navigate(`/category/${cat.id}`)}
          >
            <img
              src={cat.image || "/fallback-image.png"}
              alt={cat.name || cat.title}
              className={styles.image}
              onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
            />
            <div className={styles.textOverlay}>{cat.name || cat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
