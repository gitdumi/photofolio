import { Order } from "@/types/types";
import { headers } from "../../../lib/util/fetch-utils";
import { API_ROUTES } from "@/app/api/(clients)/routes.constants";

export const createOrder = async (order: Order) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(API_ROUTES.checkout, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: order?.user?.id,
        cartItems: order?.cartItems?.map((item) => ({
          photo: item?.photo?.id,
          collection: item?.collection?.id,
          type: item?.type,
        })),
        totalPrice: order?.totalPrice,
      }),
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_ROUTES.checkout}/${order}`, {
      method: "PUT",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: order?.user?.id,
        cartItems: order?.cartItems?.map((item) => ({
          photo: item?.photo?.id,
          collection: item?.collection?.id,
          type: item?.type,
        })),
        totalPrice: order?.totalPrice,
      }),
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
