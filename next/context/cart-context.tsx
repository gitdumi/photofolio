"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CartItem, CartItemVariant, Order } from "@/types/types";
import {
  buildCartItem,
  calculateTotal,
  initOrder,
  updateCartIfCollectionIsAdded,
} from "@/lib/strapi/cart-utils";

type CartContextType = {
  order: Order | null | undefined;
  count: number;
  addToCart: (
    item: CartItem | null,
    fromCollectionCartItem?: CartItem | null
  ) => void;
  removeFromCart: (cartItem: CartItem | null) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<Order | null>(() => {
    const storedOrder = sessionStorage.getItem("cartOrder");
    return storedOrder ? JSON.parse(storedOrder) : null;
  });

  useEffect(() => {
    if (order) {
      sessionStorage.setItem("cartOrder", JSON.stringify(order));
    } else {
      sessionStorage.removeItem("cartOrder");
    }
  }, [order]);

  const addToCart = useCallback(
    (cartItem: CartItem | null, fromCollectionCartItem?: CartItem) => {
      if (!cartItem) return;
      if (!order) setOrder(initOrder());

      setOrder((prev) => {
        if (prev?.cartItems.find((i) => i.documentId === cartItem.documentId)) {
          return prev;
        }
        if (cartItem.type === CartItemVariant.COLLECTION) {
          return updateCartIfCollectionIsAdded(prev, cartItem.collection);
        } else if (
          cartItem.type === CartItemVariant.PHOTO &&
          ((fromCollectionCartItem?.collection?.photos &&
            prev?.cartItems.filter(
              (i) => i.fromCollection === cartItem.fromCollection
            )?.length) ||
            NaN) +
            1 ==
            fromCollectionCartItem?.collection?.photos?.length
        ) {
          return {
            ...prev,
            cartItems: [
              ...(prev?.cartItems?.filter(
                (i) => i.fromCollection !== fromCollectionCartItem?.documentId
              ) || []),
              fromCollectionCartItem,
            ],
          };
        } else {
          const newCartItems = [...(prev?.cartItems || []), cartItem];
          return {
            ...prev,
            cartItems: newCartItems,
            totalPrice: calculateTotal({
              cartItems: newCartItems,
            }),
          } as Order;
        }
      });
    },
    [order?.cartItems]
  );

  const removeFromCart = useCallback(
    (cartItem: CartItem | null) => {
      if (!cartItem) return;
      setOrder((prev) => {
        let newCartItems: CartItem[];

        const collectionsInCart = order?.cartItems?.filter(
          (i) => i.type === CartItemVariant.COLLECTION
        );
        const collectionOfCurrentCartItem = collectionsInCart?.find(
          (i) => i.documentId === cartItem.fromCollection
        )?.collection;

        if (
          collectionOfCurrentCartItem &&
          cartItem.type === CartItemVariant.PHOTO
        ) {
          newCartItems =
            collectionOfCurrentCartItem?.photos
              ?.filter((p) => p.documentId !== cartItem.documentId)
              ?.map(
                (i) =>
                  buildCartItem({
                    photo: i,
                    fromCollection: cartItem.fromCollection,
                    type: CartItemVariant.PHOTO,
                  }) as CartItem
              ) || [];
        } else {
          newCartItems =
            prev?.cartItems.filter(
              (item) => item.documentId !== cartItem.documentId
            ) || [];
        }
        return {
          ...prev,
          cartItems: newCartItems,
          totalPrice: calculateTotal({ cartItems: newCartItems }),
        } as Order;
      });
    },
    [order?.cartItems]
  );

  const clearCart = useCallback(() => {
    setOrder(null);
  }, []);

  const getCartTotal = useCallback(() => {
    return calculateTotal(order);
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
