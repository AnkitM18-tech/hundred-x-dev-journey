"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className="max-w-2xl text-zinc-700 dark:bg-zinc-100 bg-zinc-800 rounded-xl min-w-48 mx-auto flex flex-col gap-4 my-40 py-10">
      <h1 className="text-center text-3xl font-bold py-2">Sign Up</h1>
      <div className="flex flex-col justify-center gap-4 w-3/4 px-2 mx-auto">
        <input
          ref={usernameRef}
          className="border-zinc-900 border-2 rounded-md px-4 py-2"
          type="text"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          className="border-zinc-900 border-2 rounded-md px-4 py-2"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={async () => {
            await fetch("http://localhost:3000/api/v1/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: usernameRef.current?.value,
                password: passwordRef.current?.value,
              }),
            });
            router.push("/signin");
          }}
          className="bg-zinc-700 rounded-md px-4 py-2 text-zinc-100 cursor-pointer hover:bg-zinc-950"
        >
          Sign Up
        </button>
        <span>
          Already have an account?{" "}
          <Link className="underline font-semibold" href="/signin">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
