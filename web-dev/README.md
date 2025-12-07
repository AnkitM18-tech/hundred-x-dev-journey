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

```js

// transformation function
function fn(i) {
    // perform some operation
}

// Custom Map
function map(arr, fn) {
    const modifiedArr = [];
    for(let i = 0; i <= arr.length: i++) {
        modifiedArr.push(fn(arr[i]));
    }
    return modifiedArr;
}

```

### Tokens vs JWT

- Stateful Tokens - We need to store these tokens in a database.
  The problem is that **we need to send a request to the database every time a user wants to hit an authenticated endpoint** and then we send that token with the request -> Expensive Operation

- We can use JWTs (JSON Web Tokens) in order to prevent this expensive operation. **JWTs are stateless, they contain all the info needed to authenticate a request, so the server doesn't need to store session data. All the data is stored in the token itself**.

- _JWTs are a compact and self-contained way to represent information between two parties. They are commonly used for authentication and information exchange in web applications_. We can store JWTs in Cookies or Auth Headers(Authorization). **Cookies are only browser specific, mobile devices don't understand the cookies**
