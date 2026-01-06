import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col text-tuna-900 dark:text-tuna-50 items-center justify-center gap-4 h-screen">
      <h1 className="text-xl font-bold">
        To access this page, You need to Sign In First
      </h1>
      <Link to="/login" className="hover:text-tuna-600 text-lg">
        Go to Sign In <span className="animate-pulse mx-2">→</span>
      </Link>
    </div>
  );
};

export default Error;
