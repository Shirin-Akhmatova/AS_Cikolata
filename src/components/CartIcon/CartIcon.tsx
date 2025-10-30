import React, { useEffect, useState, useRef } from "react";
import styles from "./CartIcon.module.scss";
import CartImg from "../../assets/images/image 10.svg";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down" | null>(null);

  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsOpen(totalCount > 0);
  }, [totalCount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = window.innerHeight + scrollY;
      const documentHeight = document.body.offsetHeight;

      // Определяем направление прокрутки
      if (scrollY > lastScrollY.current) {
        setScrollDir("down");
      } else if (scrollY < lastScrollY.current) {
        setScrollDir("up");
      }
      lastScrollY.current = scrollY;

      // Проверяем, близко ли к низу
      setIsNearBottom(scrollPosition >= documentHeight - 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Корзина поднимается внизу, но если пользователь скроллит вверх — опускается обратно
  const shouldLift = isNearBottom && scrollDir !== "up";

  return (
    <div
      className={`${styles.cart} ${isOpen ? styles.expanded : ""} ${
        shouldLift ? styles.lifted : ""
      }`}
      onClick={() => navigate("/cart")}
    >
      <img src={CartImg} alt="Корзина" className={styles.icon} />
      {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
    </div>
  );
};

export default CartIcon;
