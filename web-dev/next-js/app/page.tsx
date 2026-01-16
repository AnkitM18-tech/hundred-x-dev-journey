// "use client";

import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

// export default function () {
//   return (
//     <SessionProvider>
//       <Home />
//     </SessionProvider>
//   );
// }

export default async function Home() {
  // const session = useSession();
  const session = await getServerSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-10 mx-auto">
          <h1 className="text-4xl font-bold">Todo Application</h1>
          {/* {session.status === "unauthenticated" ? ( */}
          <div className="flex justify-between">
            <Link
              href="/signup"
              className="bg-zinc-500 hover:bg-zinc-700 rounded-md px-4 py-2 cursor-pointer"
            >
              Sign Up
            </Link>
            <Link
              // href="/signin"
              href=""
              // onClick={() => signIn()}
              className="bg-zinc-500 hover:bg-zinc-700 rounded-md px-4 py-2 cursor-pointer"
            >
              Sign In
            </Link>
          </div>
          {/* ) : ( */}
          <Link
            href="/"
            className="bg-zinc-500 hover:bg-zinc-700 rounded-md px-4 py-2 cursor-pointer"
            // onClick={() => signOut()}
          >
            {JSON.stringify(session)}
          </Link>
          {/* )} */}
        </div>
      </main>
    </div>
  );
}
