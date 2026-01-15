"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

function User() {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const data = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const response = await data.json();
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex my-64 justify-center text-zinc-700">
      <section className="dark:bg-zinc-50 bg-zinc-700 rounded-md px-4 py-2 flex flex-col gap-4">
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Name:
          </span>{" "}
          {data?.name}
        </span>
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Username:
          </span>{" "}
          {data?.username}
        </span>
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Email:
          </span>{" "}
          {data?.email}
        </span>
      </section>
    </div>
  );
}

export default User;
