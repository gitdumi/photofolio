import { useCart } from "@/context/cart-context";
import { CartItemVariant } from "@/types/types";
import Image from "next/image";

export const CartItemsSummary = () => {
  const { order } = useCart();

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
      <li className="flex flex-1 gap-2 align-center">
        1 x {name}
        <Image
          src={url}
          alt={name}
          height={40}
          width={40}
          className="space-between rounded-lg object-cover"
        />
      </li>
    );
  });
};
