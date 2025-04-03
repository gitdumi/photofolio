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

export interface Photo {
  id: string;
  name: string;
  previewImage?: Media | null;
  fullResImage?: Media | null;
  rawImage?: Media;
  price: number;
}

export interface PhotoCollection {
  id: string;
  collectionName: string;
  content: BlocksContent;
  price: number;
  photos?: Photo[];
}

export interface Order {
  id: string;
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

type CartItem = {
  photo: Product;
  price: number;
  collection: PhotoCollection;
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

///old
export interface Category {
  name: string;
}

export interface Image {
  url: string;
  alternativeText: string;
  height: number;
  width: number;
  name: string;
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: Category[];
  redirectToHome: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  plans: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  categories?: any[];
}
