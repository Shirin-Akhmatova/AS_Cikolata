import React from "react";
import styles from "./CartIcon.module.scss";
import CartImg from "../../assets/images/image 10.svg";
import { useCart } from "../CartContext/CartContext";

const CartIcon: React.FC = () => {
  const { totalCount } = useCart();

  return (
    <div className={styles.cart}>
      <img src={CartImg} alt="Корзина" className={styles.icon} />
      {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
    </div>
  );
};

export default CartIcon;
