"use client";
import { useCart } from "@/context/cart-context";

export const CheckoutPage = () => {
  const { order } = useCart();

  return (
    <div className="h-full min-h-[50vh]">{JSON.stringify(order, null, 2)}</div>
  );
};

export default CheckoutPage;
