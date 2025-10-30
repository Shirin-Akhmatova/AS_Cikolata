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
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      setIsNearBottom(scrollPosition >= documentHeight - 100);

      if (window.scrollY > lastScrollY.current) {
        setScrollDir("down");
      } else if (window.scrollY < lastScrollY.current) {
        setScrollDir("up");
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
