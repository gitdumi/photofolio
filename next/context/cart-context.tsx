"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Order } from "@/types/types";
import { initOrder } from "@/lib/strapi/cart-utils";

type CartContextType = {
  order: Order | null | undefined;
  count: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<Order | null>();

  const addToCart = useCallback((cartItem: CartItem) => {
    if (!order) setOrder(initOrder());
    setOrder(
      (prev) =>
        ({
          ...prev,
          cartItems: [...(prev?.cartItems || []), cartItem],
        } as Order)
    );
  }, []);

  const removeFromCart = useCallback((cartItemId: number) => {
    setOrder(
      (prev) =>
        ({
          ...prev,
          cartItems: prev?.cartItems.filter((item) => item.id !== cartItemId),
        } as Order)
    );
  }, []);

  const clearCart = useCallback(() => {
    setOrder(null);
  }, []);

  const getCartTotal = useCallback(() => {
    return Number(
      order?.cartItems.reduce((total, item) => total + item.price, 0)
    );
  }, [order?.cartItems]);

  return (
    <CartContext.Provider
      value={{
        order,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        count: order?.cartItems?.length || 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
