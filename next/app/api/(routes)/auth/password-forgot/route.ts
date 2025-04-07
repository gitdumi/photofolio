import { headers } from "@/lib/util/fetch-utils";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: data.error?.message || "Something went wrong",
        }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Please check your email to reset your password.",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during forgot password request:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
