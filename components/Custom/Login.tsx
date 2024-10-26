"use client";

import { Camera } from "lucide-react";
import Google from "@/components/Custom/Icons/Google";
import { signIn } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const emailRef = React.useRef<HTMLInputElement>(null);
  switch (session.status) {
    case "loading":
    case "unauthenticated":
      return (
        <div className="relative">
          <h2 className="absolute text-xl font-bold bg-black left-[5%] px-2">Get Started</h2>
          <div className="flex flex-col gap-2 bg-black rounded-lg text-white border-2 p-4 my-3">
            <input
              type="text"
              className="p-2 rounded-md input text-white w-72"
              placeholder="Type your email..."
              ref={emailRef}
            ></input>
            <button
              className="btn btn-md border-none animated-gradient-background"
              onClick={() => {
                signIn("email", { email: emailRef.current?.value });
              }}
            >
              Create My Yard
              <Camera className="ml-2 h-4 w-4" />
            </button>
            <button
              className="btn btn-md"
              onClick={() => {
                signIn("google");
              }}
            >
              <Google className="ml-2 h-4 w-4" />
              Continue with Google
            </button>
          </div>
        </div>
      )
    default:
      return (
        <div className="flex flex-col gap-2 items-center">
          <div className="text-xl font-bold">
            👋 Welcome back {session?.data?.user?.name}
          </div>
          <Link href="/dashboard" className="btn btn-md border-none animated-gradient-background">
            Go to Dashboard
          </Link>
        </div>
      )
  }
}

export default Login;