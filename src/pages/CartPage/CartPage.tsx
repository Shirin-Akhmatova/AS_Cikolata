import { useCart } from "../../components/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import Decrement from "../../assets/images/Frame 9.svg";
import Increment from "../../assets/images/Frame 8.svg";
import BackIcon from "../../assets/images/Frame 23.svg";
import styles from "./CartPage.module.scss";
import cardStyles from "../../components/ProductCard/ProductCard.module.scss";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, getProductQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <p className={styles.empty}>Ваша корзина пуста</p>;
  }

  return (
    <div className={styles.cartPage}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <img src={BackIcon} alt="Back" className={styles.backIcon} />
        <span>Вернуться в меню</span>
      </button>

      <div className={styles.list}>
        {cartItems.map((item) => {
          const count = getProductQuantity(item.id);

          return (
            <div key={item.id} className={cardStyles.card}>
              <img
                src={item.image || "/fallback-image.png"}
                alt={item.title || item.name}
                className={cardStyles.image}
                onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
              />

              <div className={cardStyles.info}>
                <h3 className={cardStyles.title}>{item.title || item.name}</h3>

                {item.description && (
                  <p className={cardStyles.description}>{item.description}</p>
                )}

                <div className={cardStyles.bottom}>
                  <span className={cardStyles.price}>{item.price} сом</span>

                  <div className={cardStyles.counter}>
                    <img
                      src={Decrement}
                      alt="Decrement"
                      className={cardStyles.btn}
                      onClick={() => removeFromCart(item.id)}
                    />
                    <span>{count}</span>
                    <img
                      src={Increment}
                      alt="Increment"
                      className={cardStyles.btn}
                      onClick={() => addToCart(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
