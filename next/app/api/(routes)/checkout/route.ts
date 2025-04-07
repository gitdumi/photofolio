import { headers } from "@/lib/util/fetch-utils";
import { OrderStatus } from "@/types/types";

export async function POST(req: Request) {
  try {
    const { userId, cartItems, totalPrice } = await req.json();

    if (!userId || !cartItems || !totalPrice) {
      return new Response(JSON.stringify({ message: "Missing order info" }), {
        status: 400,
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            user: userId,
            cartItems,
            totalPrice,
            orderStatus: OrderStatus.IN_PROGRESS,
            orderCreatedAt: new Date().toISOString(),
          },
        }),
      }
    );

    const { data } = (await response.json()) || {};

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: data.error?.message || "Couldn't create order",
        }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Order created!`,
        id: data?.id,
        documentId: data?.documentId,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during create order:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, userId, cartItems, totalPrice, orderStatus } =
      (await req.json()) || {};
    console.log(
      `post for update order::${orderId}   `,
      JSON.stringify({
        data: {
          user: userId,
          cartItems,
          totalPrice,
          orderStatus: OrderStatus.IN_PROGRESS,
          orderUpdatedAt: new Date().toISOString(),
        },
      })
    );

    if (!userId || !cartItems || !totalPrice) {
      return new Response(JSON.stringify({ message: "Missing order info" }), {
        status: 400,
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: "PUT",
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            orderId,
            user: userId,
            cartItems,
            totalPrice,
            orderStatus,
            orderUpdatedAt: new Date().toISOString(),
            orderCompletedAt: null,
          },
        }),
      }
    );

    const { data } = (await response.json()) || {};

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: data.error?.message || "Couldn't update order",
        }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Order updated!`,
        id: data?.id,
        documentId: data?.documentId,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during update order:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
