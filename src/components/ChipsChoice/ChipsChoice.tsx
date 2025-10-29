import React, { useState, useEffect, useRef } from "react";
import styles from "./ChipsChoice.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../../assets/images/Frame 23.svg";

interface Category {
  id: number;
  name: string;
  title: string;
  subcategories: Category[];
}

interface Chip {
  name: string;
  path: string;
  icon?: string;
}

const ChipsChoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [activeChip, setActiveChip] = useState<string>("");

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Categories state:", categories);
  }, [categories]);

  useEffect(() => {
    fetch("/api/menucategories/")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const topCategories = data.filter((cat) =>
          [12, 13, 14, 15].includes(cat.id)
        );
        setCategories(topCategories);

        const chipList: Chip[] = [
          { name: "Главная", path: "/", icon: "back" },
          ...topCategories.map((cat) => ({
            name: cat.name || cat.title || "",
            path: `/category/${cat.id}`,
          })),
        ];
        setChips(chipList);
      })
      .catch((err) => console.error("Ошибка загрузки категорий:", err));
  }, []);

  useEffect(() => {
    const found = chips.find(
      (chip) => chip.path !== "/" && location.pathname.startsWith(chip.path)
    );
    if (found) {
      setActiveChip(found.name);

      const idx = chips.findIndex((c) => c.name === found.name);
      if (idx !== -1) scrollToChip(idx);
    } else {
      setActiveChip("");
    }
  }, [location.pathname, chips]);

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

    setActiveChip(chip.name);
    navigate(chip.path);
    scrollToChip(index);
  };

  const setRef = (index: number) => (el: HTMLButtonElement | null) => {
    chipRefs.current[index] = el;
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {chips.map((chip, index) => (
        <button
          key={chip.name}
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
            <img src={BackIcon} alt="Главная" className={styles.backIcon} />
          ) : (
            chip.name
          )}
        </button>
      ))}
    </div>
  );
};

export default ChipsChoice;
