import { BlocksContent } from "@strapi/blocks-react-renderer";

export enum OrderStatus {
  IN_PROGRESS = "inProgress",
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum CartItemVariant {
  PHOTO = "photo",
  COLLECTION = "collection",
}

export interface Media {
  id: string; // Unique identifier for the media
  url: string; // URL of the media file
  mime: string; // MIME type of the media (e.g., image/jpeg, video/mp4)
  size?: number; // Optional size of the media file in bytes
  alternativeText?: string; // Optional alt text for accessibility
  caption?: string; // Optional caption for the media
}

export interface PriceGroup {
  id: number;
  name: string;
  price: number;
}
export interface Photo {
  documentId: string;
  name: string;
  previewImage?: Media | null;
  fullResImage?: Media | null;
  rawImage?: Media;
  alt?: string;
  priceGroup: PriceGroup;
}

export interface PhotoCollection {
  documentId: string;
  collectionName: string;
  content: BlocksContent;
  priceGroup: PriceGroup;
  photos?: Photo[];
}

export interface Order {
  id?: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  orderCreatedAt: string;
  orderCompletedAt?: string | null;
  users_permissions_user?: {
    id: string;
    username: string;
  } | null;
  cartItems: CartItem[];
}

export type CartItem = {
  documentId: string;
  photo: Photo | null;
  priceGroup: PriceGroup;
  collection: PhotoCollection | null;
  fromCollection: string | null;
  type: CartItemVariant;
};

export type User = {
  id: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  // role?: {
  //   id: string; // Assuming roles have an ID
  //   name: string; // Assuming roles have a name
  // } | null;
  // photos?: Array<{
  //   id: string; // Assuming photos have an ID
  //   url: string; // Assuming photos have a URL
  // }>;
  // order?: {
  //   id: string; // Assuming orders have an ID
  //   details: string; // Replace with actual order details structure
  // } | null;
};
