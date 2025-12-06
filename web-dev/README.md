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

## Some commonly used Middlewares

    - app.use(express.json())
        => if we want to send JSON data to the server, first we need to parse that data. In order to handle POST and PUT / PATCH method body (JSON), we use this middleware to parse that JSON data into object first, so that we can use those data. express uses bodyParser library under the hood.

    - cors - cross origin resource sharing
        => CORS is a security feature implemented by web browsers, that controls how resources on a web server can be requested from another domain. It is crucial for managing cross-origin requests and ensuring secure interactions between <i>different origins</i> on the web

        => https://google.com (FE server) ---> https://api.facebook.com (BE server) - cross origin request
        => Same Origin means a website's ****protocol(http / https), hostname (google.com, facebook.com etc), and ports(443, 80, 3000)**** are identical to another, on the contrast cross-origin occurs when any of these three components differ, triggering the browser's Same Origin Policy (SOP), a security feature that restricts how a page from one origin can interact with another origin
        => In order to enable CORS , the backend should whitelist the URL of the Frontend.

By default the cross origin requests are blocked. To enable our frontend to interact with our backend, we use cors middleware.

    - pnpx serve from public/index.html - serve the HTML file fro public folder
