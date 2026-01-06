import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BACKEND_URL } from "../config";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  async function signin() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (token !== undefined) {
          localStorage.setItem("token", token);
          alert("Signed in successfully");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert(`Error signing in: ${error}`);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="min-w-3/12 min-h-80 border-2 rounded-md px-2 py-4">
        <h1 className="font-bold text-2xl mb-4 text-center">Sign In</h1>
        <div className="flex flex-col gap-4 justify-between">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g: john.doe@gmail.com"
            className="px-4 py-2 focus:outline-none rounded-md border border-tuna-700 dark:border-tuna-100"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="e.g: John#123"
            className="px-4 py-2 focus:outline-none rounded-md border border-tuna-700 dark:border-tuna-100"
          />
          <div className="flex flex-col gap-10">
            <button
              className="px-4 py-2 rounded-md dark:bg-tuna-300 dark:text-tuna-900 text-tuna-50 bg-tuna-900 cursor-pointer"
              onClick={signin}
            >
              Submit
            </button>
            <Link to="/" className="text-center">
              Don't have an account? <span className="underline">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
