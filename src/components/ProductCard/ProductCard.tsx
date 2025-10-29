import { useCart } from "../CartContext/CartContext";
import styles from "./ProductCard.module.scss";
import Decrement from "../../assets/images/Frame 9.svg";
import Increment from "../../assets/images/Frame 8.svg";

export interface Product {
  id: number;
  name: string;
  title?: string;
  description?: string | null;
  image: string;
  price: number;
  size?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, getProductQuantity } = useCart();
  const count = getProductQuantity(product.id);

  const handleIncrement = () => addToCart({ ...product, quantity: 1 });
  const handleDecrement = () => removeFromCart(product.id);

  const bottomClass = product.description
    ? styles.bottom
    : `${styles.bottom} ${styles.centered}`;

  return (
    <div className={styles.card}>
      <img
        src={product.image || "/fallback-image.png"}
        alt={product.title || product.name}
        className={styles.image}
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title || product.name}</h3>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {product.size && <p className={styles.size}>{product.size}</p>}

        <div className={bottomClass}>
          <span className={styles.price}>{product.price} сом</span>

          <div className={styles.counter}>
            <img
              src={Decrement}
              alt="Decrement"
              onClick={handleDecrement}
              className={styles.btn}
            />
            <span>{count}</span>
            <img
              src={Increment}
              alt="Increment"
              onClick={handleIncrement}
              className={styles.btn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
