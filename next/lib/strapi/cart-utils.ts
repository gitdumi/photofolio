import { CartItemVariant, OrderStatus } from "@/types/types";

export const initOrder = () => ({
  orderCreatedAt: new Date().toString(),
  orderCompletedAt: null,
  orderStatus: OrderStatus.IN_PROGRESS,
  cartItems: [],
  totalPrice: 0,
});

export const buildCartItem = ({ photo, collection, type }) => {};
