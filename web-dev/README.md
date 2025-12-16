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

- JWTs can be _decoded_ by anyone, but it can only be _verified_ by only the person who issued them (using the JWT Secret)

  - res.header("jwt", token) -> sending the token in headers

- "iat" field in jwt is **issued at** - "Unix Time stamp" at which the jwt is issued

### Databases

- NoSQL databases are designed to handle a variety of data models and workloads that may not fit into the tabular schema of relational databases.

  - Properties

    - Schema Flexibility - allow for a _flexible schema_ , meaning you can store data in formats that don't require a fixed structure.
    - Scalability - Many NoSQL DBs are designed to scale out **horizontally**, making it easier to distribute data across multiple servers and handle large volumes of traffic.

- MongoDB is a NoSQL database that uses a document-oriented approach. Data is stored in flexible , JSON like documents, which can have nested structures and varied fields.
- MongoDB is schemaless, we don't need to define a schema beforehand.
- MongoDB have **Clusters** => inside Clusters we have multiple **Databases** => Inside Databases we have **Collections** => Inside Collections we have **Documents** => Inside Documents we have **Fields**

- We should use **async-await** for DB calls, as there are chances the DB call would take some time and might fail in case it is down or unavailable, in that scenario we don't want to send our user a success message in case the DB call failed.

- **Salting** in hashing ensures even though the passwords are same, they get hashed to different hashed passwords.This prevents attackers from using pre-computed tables(rainbow tables) to crack passwords. A salt is a random value added to the password before hashing.

- If the /admin and /user uses same JWT_SECRET and we are using different tables for admin and users, there might be chances that the "\_id" of some users and admin could be same (although less probability), so it is better to use different JWT_SECRETS for both if using different tables. This way we can prevent users to exploit the /admin functionalities. The middlewares will also get confused and let the request through if both of them are signed with same JWT_SECRET

```js
function App() {
  const [counter, setCounter] = useState(1);
  let timer = 0; // every time the component re-renders due to state change, it is going to be overriden and reinitialized to 0. So it won't work as expected. So in order to preserve the value over re-renders we use useState or useRef.
  const timer2 = useRef(null); // persist across re-renders but doesn't trigger re-render when its value changes, middle ground between raw variables and useState

  function startClock() {
    let value = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    timer2.current = value;
  }

  function stopClock() {
    clearInterval(timer2.current);
  }
}
```

- useRef() => persistent across renders and no re-renders on change - provides a way to create a reference to a value or a DOM element that persists across renders but doesn't trigger re-render when the value changes.

### Context API

- Context - is created using **createContext()**. It serves as a container for the data you want to share
- Provider - This component wraps part of your application and provides the context value to all its descendants. Any component that is a child of this Provider can access the context.
- Consumer - This component subscribes to context changes. It allows you to access the context value using useContext hook.

```js

function BulbProvider({children}) {
  const BulbContext = createContext();
  const [bulbOn, setBulbOn] = useState(false);
  return (
    <div>
    <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbOn: setBulbOn }}>
      {children} -> can access the context values provided by the Provider component
    </BulbContext.Provider>
      {other-children can reside here} -> can't access the context values as they are not wrapped by the Provider
  </div>
  )
}

function App() {
  return (
    <BulbProvider>
      <Light />
    </BulbProvider>
  )
}

const {bulbOn, setBulbOn} = useContext(BulbContext); -> to use the value inside the component we use useContext()
```
