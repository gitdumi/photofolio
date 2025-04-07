import { BlocksContent } from "@strapi/blocks-react-renderer";

export enum OrderStatus {
  IN_PROGRESS = "inProgress",
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

export type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number; // Size in KB
  sizeInBytes: number;
  url: string;
};

export type ImageFormats = {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
};

export type ImageMetadata = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number; // Size in KB
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null; // Adjust type if provider metadata has a specific structure
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
};

export interface Photo {
  id: string;
  documentId: string;
  name: string;
  previewImage?: ImageMetadata | null;
  fullResImage?: ImageMetadata | null;
  rawImage?: ImageMetadata;
  alt?: string;
  priceGroup: PriceGroup;
  alternativeText: string | null;
}

export interface PhotoCollection {
  id: string;
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
  orderUpdatedAt?: string | null;
  orderCompletedAt?: string | null;
  user?: User | null;
  cartItems?: CartItem[];
  cartItemIds?: string[];
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

export interface CurrencyConfig {
  currencyCode: string;
  symbol: string;
}

export enum SubmitStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
