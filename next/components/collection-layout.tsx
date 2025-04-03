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

// export async function CollectionLayout({
export function CollectionLayout({
  collection,
  children,
}: {
  collection: PhotoCollection;
  children: React.ReactNode;
}) {
  const { order, addToCart, removeFromCart } = useCart();

  const isCollectionAddedToCart = isCollectionInCart(
    order,
    collection.documentId
  );

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="flex justify-between items-center px-2 py-8">
        <Link href={"/"} className="flex space-x-2 items-center">
          <IconArrowLeft className="w-4 h-4 text-muted" />
          <span className="text-sm text-muted">Back</span>
        </Link>
      </div>

      <div className="flex w-full justify-end gap-2 my-2">
        {!isCollectionAddedToCart &&
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
            >
              add entire collection
            </Button>
          )}
        {(isCollectionAddedToCart ||
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
      <PhotoCarousel collection={collection} />

      {/* {collection?.dynamic_zone && (
        <DynamicZoneManager dynamicZone={collection?.dynamic_zone} />
      )} */}
    </Container>
  );
}
