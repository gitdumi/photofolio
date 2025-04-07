import { headers } from "@/lib/fetch-utils";

export async function POST(req: Request) {
  try {
    const { code, password, passwordConfirmation } = await req.json();

    if (!code || !password || !passwordConfirmation) {
      return new Response(
        JSON.stringify({ message: "Both fields are required" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
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
      JSON.stringify({ message: "Your password has been reset!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during reset password:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
