## Middlewares

Middleware functions are functions that have access to <i>request</i> object, <i>response</i> object and the <i>next</i> middleware function in the application's request-response cycle.

Middleware functions can perform the following tasks -

    - Execute any code
    - Make changes to the request and response objects
    - End the request-response cycle
    - Call the next middleware function in the stack - transfer control to the next middleware function

Middlewares can be re-used, so instead of rewriting the logic we can re-use the middleware function wherever it is needed.

Middlewares can be used globally -

    - app.use(middlewareName) - this triggers for all the endpoints below it, so put it at the top for convenience if all your endpoints need this middleware function

or in between the route and handler function individually -

    - app.get("/", middlewareName, (req, res) => {})

**Order Matters in middlewares where we introduce them in the code.**
