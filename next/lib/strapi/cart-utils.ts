import {
  CartItem,
  CartItemVariant,
  Order,
  OrderStatus,
  Photo,
  PhotoCollection,
} from "@/types/types";

export const initOrder = () => ({
  orderCreatedAt: new Date().toISOString(),
  orderCompletedAt: null,
  orderStatus: OrderStatus.IN_PROGRESS,
  cartItems: [],
  totalPrice: 0,
});

export const calculateTotal = (
  order: { cartItems: CartItem[] | undefined } | null
) =>
  order?.cartItems?.reduce(
    (total, item) => total + item?.priceGroup?.price,
    0
  ) || 0;

export const isInCart = (
  order: Order | null | undefined,
  item: Photo | PhotoCollection,
  collectionId: string
) =>
  Boolean(
    order?.cartItems.find(
      (i) => i.documentId === item.documentId || i.documentId === collectionId
    )
  );

export const isCollectionInCart = (
  order: Order | null | undefined,
  collectionId: string
) => Boolean(order?.cartItems.find((i) => i.documentId === collectionId));

export const buildCartItem = ({
  photo,
  collection,
  type,
  fromCollection,
}: {
  photo?: Photo;
  collection?: PhotoCollection;
  type: CartItemVariant;
  fromCollection?: string;
}): CartItem | null => {
  const { documentId, priceGroup } = photo || collection || {};
  if (!documentId || !priceGroup || (!photo && !collection)) return null;

  return {
    documentId,
    photo: photo || null,
    type,
    priceGroup,
    collection: collection || null,
    fromCollection: fromCollection || null,
  };
};

export const updateCartIfCollectionIsAdded = (
  order: Order | null,
  collection: PhotoCollection
) => {
  const updatedCartItems =
    order?.cartItems?.filter(
      (i) => i.fromCollection !== collection.documentId
    ) || [];

  const cartItem = buildCartItem({
    collection,
    type: CartItemVariant.COLLECTION,
  });

  return { ...order, cartItems: [...updatedCartItems, cartItem] };
};
