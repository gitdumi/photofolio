"use client";
import { useAuthContext } from "@/context/user-context";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { useCart } from "@/context/cart-context";
import { CartIcon } from "../../icons/cart-icon";
import { CurrencyConfig } from "@/types/types";
import { CartItemsSummary } from "./cart-items-summary";
import { Button } from "@/components/elements/button";
import { createOrder } from "@/app/api/(clients)/checkout";

export const CartModal = ({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}) => {
  const { order, count, getCartTotal } = useCart();
  const { user } = useAuthContext();

  return user ? (
    <Modal>
      <ModalTrigger>
        <div className="flex items-center indicator">
          <CartIcon className="group-hover:fill-primary-content" />
          <span className="text-xs indicator-item bg-accent px-1 rounded-full">
            {count || 0}
          </span>
        </div>
      </ModalTrigger>
      <ModalBody className="text-primary-content">
        <ModalContent className="flex flex-col gap-2 flex-1 h-full">
          <h1 className="text-2xl text-bold text-secondary-content">Cart</h1>
          <h1 className="text-xl text-accent">
            {count} Item{count !== 1 ? "s" : ""}
            {count === 0 ? "." : ":"}
          </h1>
          <ul className="flex flex-col gap-2 w-full overflow-scroll max-h-[300px]">
            <CartItemsSummary currencyConfig={currencyConfig} />
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
          <button
            className="btn"
            onClick={async () => {
              if (order) {
                const response = await createOrder(order);
              }
            }}
          >
            create order
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  ) : null;
};
