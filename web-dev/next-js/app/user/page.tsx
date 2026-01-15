interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

async function User() {
  //   const data = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await fetch("http://localhost:3000/api/v1/user");
  const response = await data.json();
  return (
    <div className="flex my-64 justify-center text-zinc-700">
      <section className="dark:bg-zinc-50 bg-zinc-700 rounded-md px-4 py-2 flex flex-col gap-4">
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Name:
          </span>{" "}
          {response.name}
        </span>
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Username:
          </span>{" "}
          {response.username}
        </span>
        <span>
          <span className="text-indigo-500 font-bold animate-pulse duration-100">
            Email:
          </span>{" "}
          {response.email}
        </span>
      </section>
    </div>
  );
}

export default User;
