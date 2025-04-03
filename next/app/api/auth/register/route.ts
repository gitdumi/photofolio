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
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: data.error?.message || "Registration failed",
        }),
        { status: response.status }
      );
    }

    // Return the JWT token and user data
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
