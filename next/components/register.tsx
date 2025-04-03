"use client";
import React, { useMemo, useState } from "react";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./elements/button";
import { ROUTES } from "@/app/api/routes.constants";
import { headers } from "@/lib/fetch-utils";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(ROUTES.auth.login, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      alert("Login successful!");
      // Save the JWT token (optional, for authenticated requests)
      localStorage.setItem("token", data.jwt);
      // Redirect or perform additional actions
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(ROUTES.auth.register, {
      method: "POST",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log({ response });
  };

  return (
    <Container className="h-screen max-w-lg mx-auto flex flex-col items-center justify-center">
      <Logo />
      <h1 className="text-xl md:text-4xl font-bold my-4">
        {isRegistering ? "Register" : "Sign in"}
      </h1>
      <p className="text-center">
        {isRegistering
          ? "Create an account so you can purchase photos or collections"
          : "Login to access your account"}
      </p>

      <form className="w-full my-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 pl-4 w-full mb-4 rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
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
      </form>
    </Container>
  );
};
