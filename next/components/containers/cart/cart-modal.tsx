"use client";
import { useAuthContext } from "@/context/user-context";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../../ui/animated-modal";
import { useCart } from "@/context/cart-context";
import { CartIcon } from "../../icons/cart-icon";
import { CartItemVariant, CurrencyConfig } from "@/types/types";
import Image from "next/image";
import { CartItemsSummary } from "./cart-items-summary";
import { Button } from "@/components/elements/button";

export const CartModal = ({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}) => {
  const { order, count, getCartTotal } = useCart();
  // const { user } = useAuthContext();

  return (
    <Modal>
      <ModalTrigger onClick={() => console.log("click")}>
        <div className="cart-button indicator">
          <CartIcon />
          <span className="text-xs indicator-item bg-accent px-1 rounded-full">
            {count || 0}
          </span>
        </div>
      </ModalTrigger>
      <ModalBody className="text-primary-content">
        <ModalContent className="flex flex-col gap-2 flex-1 h-full">
          <h1 className="text-xl text-accent">
            {count} Item{count !== 1 ? "s" : ""}:
          </h1>
          <ul className="flex flex-col gap-2 w-full overflow-scroll max-h-[300px]">
            {/* <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary />
            <CartItemsSummary /> */}
            <CartItemsSummary />
          </ul>
        </ModalContent>
        <ModalFooter className="flex gap-2 items-center w-full justify-between">
          <span className="text-xl items-center">
            <b>Total:</b>{" "}
            <span className="bg-success text-success-content text-accent-content px-2 py-1 rounded-md w-full">
              {getCartTotal()} {currencyConfig.symbol}
            </span>
          </span>
          <Button variant="simple">Pay</Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
