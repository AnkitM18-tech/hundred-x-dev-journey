import { prisma } from "./lib/prisma.js";

async function createUser(username: string, password: string) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
}

// createUser("admin", "password");

async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      todos: true,
    },
  });
  return user;
}

console.log(await getUser(1));
