import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.scss";

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
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
  };

  useEffect(() => {
    fetch("/api/menucategories/")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки категорий");
        return res.json();
      })
      .then((data: ApiCategory[]) => {
        // Показываем только верхние категории (Десерты, Горячие напитки, Холодные напитки, Завтраки)
        const topCategories = data.filter((cat) =>
          [12, 13, 14, 15].includes(cat.id)
        );
        setCategories(topCategories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Загрузка...</p>;
  if (error) return <p className={styles.error}>Ошибка: {error}</p>;

  return (
    <div className={styles.home}>
      <div className={styles.languageWrapper}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="ru">RU</option>
          <option value="tr">TR</option>
        </select>
      </div>

      <div className={styles.cardsWrapper}>
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
