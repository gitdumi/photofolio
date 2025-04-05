import { useCart } from "@/context/cart-context";
import { useAuthContext } from "@/context/user-context";
import {
  buildCartItem,
  isCollectionInCart,
  isInCart,
} from "@/lib/strapi/cart-utils";
import { CartItemVariant, Photo, PhotoCollection } from "@/types/types";
import Image from "next/image";
import { CheckmarkIcon } from "../icons/checkmark-icon";

export const ImageWrapper = ({
  photo,
  collection,
}: {
  photo: Photo;
  collection: PhotoCollection;
}) => {
  const { addToCart, removeFromCart, order } = useCart();
  const { user } = useAuthContext();

  const handleImageClick = (e) => {
    if (!user) {
      e.preventDefault();
      return;
    }
    const cartItem = buildCartItem({
      photo,
      type: CartItemVariant.PHOTO,
      fromCollection: collection.documentId,
    });

    const fromCollectionCartItem = buildCartItem({
      collection,
      type: CartItemVariant.COLLECTION,
    });
    return isInCart(order, photo, collection.documentId)
      ? removeFromCart(cartItem)
      : addToCart(cartItem, fromCollectionCartItem);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleImageClick}>
      <div className="opacity-0 hover:opacity-20 absolute top-0 left-0 h-full w-full bg-secondary transition-opacity duration-300"></div>
      <Image
        src={photo?.previewImage?.formats?.small?.url || ""}
        alt={photo.alt || photo.name}
        height={400}
        width={400}
        className="rounded-lg object-cover"
      />
      {(isCollectionInCart(order, collection.documentId) ||
        isInCart(order, photo, collection.documentId)) && <CheckmarkIcon />}
    </div>
  );
};
