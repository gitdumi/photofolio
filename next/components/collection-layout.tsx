"use client"; //todo check
import { IconArrowLeft } from "@tabler/icons-react";
import { Container } from "./container";
import { Link } from "next-view-transitions";
import DynamicZoneManager from "./dynamic-zone/manager";
import { CartItemVariant, PhotoCollection } from "@/types/types";
import { PhotoCarousel } from "./photo-carousel";
import {
  buildCartItem,
  isCollectionInCart,
  isInCart,
} from "@/lib/strapi/cart-utils";
import { useCart } from "@/context/cart-context";
import { Button } from "./elements/button";
import { useAuthContext } from "@/context/user-context";
import { PAGE_ROUTES } from "@/app/routes.constants";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { MouseEventHandler } from "react";

// export async function CollectionLayout({
export function CollectionLayout({
  collection,
}: {
  collection: PhotoCollection;
}) {
  const { order, addToCart, removeFromCart } = useCart();
  const { user } = useAuthContext();

  const isCollectionAddedToCart = isCollectionInCart(
    order,
    collection.documentId
  );

  console.log({ user });
  const handleUnAuthClick = () => {
    !user && document?.getElementById(collection.documentId)?.showModal();
  };

  return (
    <Container className="flex flex-col w-screen h-[200%]">
      {collection?.content && (
        <div className="mx-auto">
          <BlocksRenderer content={collection.content} />
        </div>
      )}
      <div className="flex justify-between items-center px-2 py-8">
        <Link href={"/"} className="flex space-x-2 items-center">
          <IconArrowLeft className="w-4 h-4 text-muted" />
          <span className="text-sm text-muted">Back</span>
        </Link>
      </div>

      <div className="flex-1 w-full flex justify-end gap-2 my-2">
        {user &&
          !isCollectionAddedToCart &&
          !isInCart(order, collection, collection.documentId) && (
            <Button
              onClick={() =>
                addToCart(
                  buildCartItem({
                    collection,
                    type: CartItemVariant.COLLECTION,
                  })
                )
              }
              variant="simple"
            >
              add entire collection
            </Button>
          )}
        {user &&
          (isCollectionAddedToCart ||
            isInCart(order, collection, collection.documentId)) && (
            <Button
              onClick={() =>
                removeFromCart(
                  buildCartItem({
                    collection,
                    type: CartItemVariant.COLLECTION,
                  })
                )
              }
            >
              remove collection
            </Button>
          )}
      </div>
      {!user && (
        <dialog id={collection.documentId} className="modal">
          <div className="modal-box bg-primary">
            <h3 className="font-bold text-lg text-primary-content">Hey!</h3>
            <p className="py-4 text-primary-content">
              If you like this image you can purchase it after registering or
              signing in.
            </p>
            <a href={PAGE_ROUTES.auth} className="flex btn">
              To Auth Page
            </a>
          </div>

          <form method="dialog" className="modal-backdrop backdrop-blur-xs">
            <button>close</button>
          </form>
        </dialog>
      )}
      <PhotoCarousel
        collection={collection}
        onUnAuthClick={handleUnAuthClick}
      />
    </Container>
  );
}
