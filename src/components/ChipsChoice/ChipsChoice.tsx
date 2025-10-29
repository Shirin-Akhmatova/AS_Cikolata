import React, { useState, useEffect, useRef } from "react";
import styles from "./ChipsChoice.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../../assets/images/Frame 23.svg";
import { useLanguage } from "../LanguageContext/LanguageContext";

interface Category {
  id: number;
  name: string;
  title: string;
  subcategories?: Category[];
}

interface Chip {
  name?: string;
  path: string;
  icon?: string;
}

const ChipsChoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const [categories, setCategories] = useState<Category[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [activeChip, setActiveChip] = useState<string>("");

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Categories state:", categories);
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      setChips([]);
      setActiveChip("");

      try {
        const res = await fetch(`/api/menucategories/?lang=${language}`);
        if (!res.ok) throw new Error("Ошибка загрузки категорий");
        const data: Category[] = await res.json();

        setCategories(data);

        // Желаемый порядок категорий
        const order = [12, 13, 14, 15]; // Десерты, Горячие, Холодные, Завтраки
        const orderedData = data.sort(
          (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
        );

        const chipList: Chip[] = [
          { path: "/", icon: "back" },
          ...orderedData.map((cat) => ({
            name: cat.name || cat.title || "",
            path: `/category/${cat.id}`,
          })),
        ];

        setChips(chipList);
      } catch (err) {
        console.error(err);
        setChips([]);
      }
    };

    fetchCategories();
  }, [language]);

  // Определяем активный чип по текущему маршруту
  useEffect(() => {
    const found = chips.find(
      (chip) => chip.path !== "/" && location.pathname.startsWith(chip.path)
    );
    if (found) {
      setActiveChip(found.name || "");
      const idx = chips.findIndex((c) => c === found);
      if (idx !== -1) scrollToChip(idx);
    } else {
      setActiveChip("");
    }
  }, [location.pathname, chips]);

  // Скролл к выбранному чипу
  const scrollToChip = (index: number) => {
    requestAnimationFrame(() => {
      chipRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  };

  const handleClick = (chip: Chip, index: number) => {
    if (chip.icon === "back") {
      navigate("/");
      setActiveChip("");
      requestAnimationFrame(() => {
        wrapperRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      });
      return;
    }

    setActiveChip(chip.name || "");
    navigate(chip.path);
    scrollToChip(index);
  };

  const setRef = (index: number) => (el: HTMLButtonElement | null) => {
    chipRefs.current[index] = el;
  };

  return (
    <div key={language} ref={wrapperRef} className={styles.wrapper}>
      {chips.length === 0 ? (
        <p style={{ color: "#fff", padding: "8px" }}>
          {language === "tr" ? "Kategori yok" : "Категории отсутствуют"}
        </p>
      ) : (
        chips.map((chip, index) => (
          <button
            key={chip.path}
            ref={setRef(index)}
            className={
              chip.icon === "back"
                ? styles.backButton
                : `${styles.chip} ${
                    activeChip === chip.name ? styles.active : ""
                  }`
            }
            onClick={() => handleClick(chip, index)}
          >
            {chip.icon === "back" ? (
              <img src={BackIcon} alt="Back" className={styles.backIcon} />
            ) : (
              chip.name
            )}
          </button>
        ))
      )}
    </div>
  );
};

export default ChipsChoice;
