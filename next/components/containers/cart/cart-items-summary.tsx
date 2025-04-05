import { Button } from "@/components/elements/button";
import { TrashIcon } from "@/components/icons/trash-icon";
import { useCart } from "@/context/cart-context";
import { CartItemVariant, CurrencyConfig } from "@/types/types";
import Image from "next/image";

export const CartItemsSummary = ({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}) => {
  const { order, removeFromCart } = useCart();

  return order?.cartItems.map((item) => {
    let name;
    let url;
    switch (item.type) {
      case CartItemVariant.PHOTO:
        name = item?.photo?.name;
        url = item?.photo?.previewImage?.formats?.thumbnail?.url;
        break;
      case CartItemVariant.COLLECTION:
        name = item?.collection?.collectionName + " " + item.type;
        url =
          item.collection?.photos?.[0]?.previewImage?.formats?.thumbnail?.url;
        break;
      default:
        name = item.type;
        url = "";
    }

    return (
      <li className="flex flex-1 gap-2 items-center text-l">
        <span>1 x {name}</span>

        <Image
          src={url}
          alt={name}
          height={58}
          width={58}
          className="space-between rounded-lg object-cover  ml-auto"
        />
        <span className="font-bold">
          {item.priceGroup.price} {currencyConfig.symbol}
        </span>
        <button
          className="cursor-pointer hover:bg-secondary hover:rounded-full p-2"
          onClick={() => removeFromCart(item)}
        >
          <TrashIcon />
        </button>
      </li>
    );
  });
};
