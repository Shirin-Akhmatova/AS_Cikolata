import React, { useEffect, useState } from "react";
import styles from "./CartIcon.module.scss";
import CartImg from "../../assets/images/image 10.svg";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    setIsOpen(totalCount > 0);
  }, [totalCount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;

      setIsNearBottom(scrollPosition >= documentHeight - 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.cart} ${isOpen ? styles.expanded : ""} ${
        isNearBottom ? styles.lifted : ""
      }`}
      onClick={() => navigate("/cart")}
    >
      <img src={CartImg} alt="Корзина" className={styles.icon} />
      {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
    </div>
  );
};

export default CartIcon;
