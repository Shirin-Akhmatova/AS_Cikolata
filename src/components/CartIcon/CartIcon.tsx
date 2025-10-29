import React, { useEffect, useState } from "react";
import styles from "./CartIcon.module.scss";
import CartImg from "../../assets/images/image 10.svg";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(totalCount > 0);
  }, [totalCount]);

  return (
    <div
      className={`${styles.cart} ${isOpen ? styles.expanded : ""}`}
      onClick={() => navigate("/cart")}
    >
      <img src={CartImg} alt="Корзина" className={styles.icon} />
      {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
    </div>
  );
};

export default CartIcon;
