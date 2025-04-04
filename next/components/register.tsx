"use client";
import React, { useState } from "react";
import { Container } from "./container";
import { Button } from "./elements/button";
import { API_ROUTES } from "@/app/routes.constants";
import { headers } from "@/lib/fetch-utils";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/user-context";

export const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const { login, register } = useAuthContext();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ok, message } = await login(email, password);
    !ok && message && setMessage(message);
    if (ok) router.push("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ok, message } = await register(email, password);
    !ok && message && setMessage(message);
    if (ok) router.push("/");
  };

  return (
    <Container className="h-screen max-w-lg mx-auto flex flex-col items-center justify-center">
      <h1 className="text-xl md:text-4xl font-bold my-4">
        {isRegistering ? "Register" : "Sign in"}
      </h1>
      <p className="text-center">
        {isRegistering
          ? "Create an account so you can purchase photos or collections"
          : "Login to access your account"}
      </p>

      <form className="w-full my-4">
        {isRegistering && (
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-primary placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-primary placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-primary placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />

        <Button
          className="mx-auto my-2"
          variant="simple"
          onClick={(e) => {
            e.preventDefault();
            setIsRegistering((prev) => !prev);
          }}
        >
          {isRegistering
            ? "Already have an account?"
            : "Want to create an account?"}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="muted"
            type="submit"
            className="w-full py-3"
            onClick={isRegistering ? handleRegister : handleSignIn}
          >
            <span className="text-sm">
              {isRegistering ? "Register" : "Sign in"}
            </span>
          </Button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </Container>
  );
};
