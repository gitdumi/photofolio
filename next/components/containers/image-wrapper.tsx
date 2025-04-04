import { useCart } from "@/context/cart-context";
import { useAuthContext } from "@/context/user-context";
import {
  buildCartItem,
  isCollectionInCart,
  isInCart,
} from "@/lib/strapi/cart-utils";
import { CartItemVariant, Photo, PhotoCollection } from "@/types/types";
import Image from "next/image";

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
      <Image
        src={photo?.previewImage?.formats?.small?.url || ""}
        alt={photo.alt || photo.name}
        height={400}
        width={400}
        className="rounded-lg object-cover"
      />
      {(isCollectionInCart(order, collection.documentId) ||
        isInCart(order, photo, collection.documentId)) && (
        <svg
          id="check"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 fill-accent opacity-95 absolute top-2 right-2"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!isInCart(order, photo, collection.documentId) && (
        <span className="hidden hover:visible absolute bottom-0">
          click to add to cart
        </span>
      )}
    </div>
  );
};
