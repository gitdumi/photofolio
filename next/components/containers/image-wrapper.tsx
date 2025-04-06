import { useCart } from "@/context/cart-context";
import {
  buildCartItem,
  isCollectionInCart,
  isInCart,
} from "@/lib/strapi/cart-utils";
import { CartItemVariant, Photo, PhotoCollection } from "@/types/types";
import Image from "next/image";
import { CheckmarkIcon } from "../icons/checkmark-icon";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ImageWrapper = ({
  photo,
  collection,
  className,
}: {
  photo: Photo;
  collection: PhotoCollection;
  className?: string;
}) => {
  const { addToCart, removeFromCart, order } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageClick = () => {
    if (isMounted) {
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
    }
  };

  console.log({ photo });

  return (
    <div
      id={photo.documentId}
      className={cn("relative cursor-pointer", className)}
      onClick={handleImageClick}
    >
      <div className="opacity-0 hover:opacity-20 absolute top-0 left-0 h-full w-full bg-secondary transition-opacity duration-300"></div>
      {/* <div className="h-[400px] w-[400px] bg-accent"></div> */}
      <Image
        src={photo?.previewImage?.formats?.small?.url || ""}
        alt={photo.alt || photo.name}
        height={200}
        width={300}
        layout="responsive"
        className="rounded-lg object-cover"
      />
      {isMounted &&
        (isCollectionInCart(order, collection.documentId) ||
          isInCart(order, photo, collection.documentId)) && <CheckmarkIcon />}
    </div>
  );
};
