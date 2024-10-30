"use client";

import { Mail } from "lucide-react";
import Google from "@/components/Custom/Icons/Google";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="text-4xl font-bold animated-gradient-text">
        LandscapeAI
      </div>
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
          <Mail className="ml-2 h-4 w-4" />
          Send Magic Link
        </button>
        <span className="text-sm text-gray-500 w-full text-center">or</span>
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
}

export default Login;