"use client";
import { useCart } from "@/context/cart-context";
import { useAuthContext } from "@/context/user-context";
import { Avatar } from "../ui/avatar";
import { Button } from "../elements/button";
import Link from "next/link";
import { CurrencyConfig } from "@/types/types";
import { CartModal } from "../containers/cart/cart-modal";

export const Navbar = ({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}) => {
  const { user, logout } = useAuthContext();
  const { clearCart } = useCart();

  return (
    <div className="navbar p-4 text-primary sticky top-0 z-100 bg-base-100">
      <div className="flex-1">
        <a
          className="text-xl hover:text-secondary transition-text-color duration-300"
          href="/"
        >
          luke closer
        </a>
      </div>
      <div className="flex gap-4">
        <CartModal currencyConfig={currencyConfig} />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Avatar username={user?.username} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 border-2 border-primary bg-base-100"
          >
            <span className="mx-auto cursor-default disabled:hover">
              {user?.username ? `Welcome, ${user.username}` : "Profile"}
            </span>
            <li>
              <Button
                variant="outline"
                onClick={
                  user
                    ? () => {
                        logout();
                        clearCart();
                      }
                    : () => null
                }
                as={user ? "a" : Link}
                href={user ? "" : "/sign-up"}
              >
                {user ? "Logout" : "Authenticate"}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
