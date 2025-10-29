import { useCart } from "../../components/CartContext/CartContext";
import Decrement from "../../assets/images/Frame 9.svg";
import Increment from "../../assets/images/Frame 8.svg";
import styles from "./CartPage.module.scss";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p className={styles.empty}>Ваша корзина пуста</p>;
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.list}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src={item.image || "/fallback-image.png"}
              alt={item.title || item.name}
              className={styles.image}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.title || item.name}</h3>
              <span className={styles.price}>{item.price} сом</span>

              <div className={styles.counter}>
                <img
                  src={Decrement}
                  alt="Decrement"
                  className={styles.btn}
                  onClick={() => removeFromCart(item.id)}
                />
                <span>{item.quantity}</span>
                <img
                  src={Increment}
                  alt="Increment"
                  className={styles.btn}
                  onClick={() => addToCart(item)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
