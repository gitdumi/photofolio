import { headers } from "@/lib/fetch-utils";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          identifier: email, // Strapi uses "identifier" for email/username
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ message: data.error?.message || "Login failed" }),
        { status: response.status }
      );
    }

    return new Response(JSON.stringify({ jwt: data.jwt, user: data.user }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
