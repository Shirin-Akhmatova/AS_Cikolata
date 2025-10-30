import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  title?: string;
  description?: string | null;
  image?: string;
  price?: number;
  quantity: number;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number, size?: string) => void;
  totalCount: number;
  getProductQuantity: (id: number, size?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number, size?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId && i.size === size);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter((i) => !(i.id === itemId && i.size === size));
      }

      return prev.map((i) =>
        i.id === itemId && i.size === size
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  const getProductQuantity = (id: number, size?: string) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    return item ? item.quantity : 0;
  };

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalCount,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
