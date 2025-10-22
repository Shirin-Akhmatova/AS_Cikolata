import React, { useState, useEffect, useRef } from "react";
import styles from "./ChipsChoice.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../../assets/images/Frame 23.svg";
import { useTranslation } from "react-i18next";

interface Chip {
  name_key: string;
  path: string;
  icon?: string;
}

const ChipsChoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const chips: Chip[] = [
    { name_key: "Главная", path: "/", icon: "back" },
    { name_key: "home.desserts", path: "/desserts" },
    { name_key: "home.hotDrinks", path: "/hot" },
    { name_key: "home.coldDrinks", path: "/cold" },
    { name_key: "home.breakfasts", path: "/breakfast" },
  ];

  const [activeChip, setActiveChip] = useState<string>("");

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chipRefs.current = chipRefs.current.slice(0, chips.length);
  }, [chips.length]);

  useEffect(() => {
    const found = chips.find(
      (chip) => chip.path !== "/" && location.pathname.startsWith(chip.path)
    );
    if (found) {
      setActiveChip(found.name_key);

      const idx = chips.findIndex((c) => c.name_key === found.name_key);
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

    setActiveChip(chip.name_key);
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
          key={chip.name_key}
          ref={setRef(index)}
          className={
            chip.icon === "back"
              ? styles.backButton
              : `${styles.chip} ${
                  activeChip === chip.name_key ? styles.active : ""
                }`
          }
          onClick={() => handleClick(chip, index)}
        >
          {chip.icon === "back" ? (
            <img
              src={BackIcon}
              alt={t("home.main")}
              className={styles.backIcon}
            />
          ) : (
            t(chip.name_key)
          )}
        </button>
      ))}
    </div>
  );
};

export default ChipsChoice;
