### Good to have Next Features

- Cookies instead of JWT for auth
- rate limiting middleware
- Frontend

- MongoDB is schemaless, we can put anything inside the database - the schema of two documents can be different.
  - mongoose make you define schema for things like _auto-completions / validating data before it goes into the DB_ to make sure we are doing things right.
  - Schemaless DBs can be dangerous, using schemas in mongo makes it slightly less dangerous.
  - Generally in our applications we need _strict schemas_ for our data to remain **consistent and predictable** even though Mongo DB beings schema less.
