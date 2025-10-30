import { useEffect } from "react";
import { useCart } from "../../components/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import Decrement from "../../assets/images/Frame 9.svg";
import Increment from "../../assets/images/Frame 8.svg";
import BackIcon from "../../assets/images/Frame 23.svg";
import styles from "./CartPage.module.scss";
import cardStyles from "../../components/ProductCard/ProductCard.module.scss";
import { useLanguage } from "../../components/LanguageContext/LanguageContext";

interface Translations {
  backToMenu: string;
  emptyCart: string;
}

const translations: Record<string, Translations> = {
  ru: {
    backToMenu: "Вернуться в меню",
    emptyCart: "Ваша корзина пуста",
  },
  tr: {
    backToMenu: "Menüye dön",
    emptyCart: "Sepetiniz boş",
  },
};

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, getProductQuantity } =
    useCart();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations["ru"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.cartPage}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <img src={BackIcon} alt="Back" className={styles.backIcon} />
        <span>{t.backToMenu}</span>
      </button>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>{t.emptyCart}</p>
      ) : (
        <div className={styles.list}>
          {cartItems.map((item, index) => {
            const count = getProductQuantity(item.id, item.size);

            return (
              <div
                key={`${item.id}-${item.size || "default"}-${index}`}
                className={cardStyles.card}
              >
                <img
                  src={item.image || "/fallback-image.png"}
                  alt={item.title || item.name}
                  className={cardStyles.image}
                  onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
                />

                <div className={cardStyles.info}>
                  <h3 className={cardStyles.title}>
                    {item.title || item.name}
                  </h3>

                  {item.description && (
                    <p className={cardStyles.description}>{item.description}</p>
                  )}

                  {item.size && (
                    <p className={cardStyles.size}>
                      <b>{item.size}</b>
                    </p>
                  )}

                  <div className={cardStyles.bottom}>
                    <span className={cardStyles.price}>{item.price} сом</span>

                    <div className={cardStyles.counter}>
                      <img
                        src={Decrement}
                        alt="Decrement"
                        className={cardStyles.btn}
                        onClick={() => removeFromCart(item.id, item.size)}
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
      )}
    </div>
  );
}
