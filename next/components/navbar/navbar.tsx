"use client";
import { useCart } from "@/context/cart-context";
import { useAuthContext } from "@/context/user-context";
import { Avatar } from "../ui/avatar";
import { Button } from "../elements/button";
import Link from "next/link";
import { CurrencyConfig } from "@/types/types";

export const Navbar = ({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}) => {
  const { user, logout } = useAuthContext();
  const { count, getCartTotal, clearCart } = useCart();

  return (
    <div className="navbar text-primary fixed top-0 z-100 bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          luke closer
        </a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="text-xs indicator-item bg-accent px-1 rounded-full">
                {count || 0}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content  z-1 mt-3 shadow"
          >
            <div className="card-body rounded-box bg-base-100 border-2 border-primary bg-base-100 min-w-32">
              <span className="text-lg font-bold">{`${count} item${
                count !== 1 ? "s" : ""
              }`}</span>
              <span className="text-info">
                total: {getCartTotal()} {currencyConfig?.symbol}
              </span>
              <Button className="text-nowrap" variant="simple">
                go to cart
              </Button>
            </div>
          </div>
        </div>
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
