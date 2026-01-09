import { Client } from "pg";

const pgClient = new Client(
  "postgresql://postgres:mysecretpassword@localhost/postgres?ssl_mode=disabled"
);

pgClient
  .connect()
  .then(() => console.log("Database Connected!"))
  .catch((e) => console.error("Database Connection failed!"));

try {
  const createTodoTable = `
        CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `;

  // can prevent sql injection => the injected sql will be stored as string, it won't get appended after the main query and won't get executed

  const insertQuery = `INSERT into users (username, email, password) VALUES ($1, $2, $3);`;
  const response = await pgClient.query(insertQuery, ["test", "test", "test"]);

  const result = await pgClient.query(createTodoTable);
  console.log(result);
} catch (error) {
  console.log(error);
}
