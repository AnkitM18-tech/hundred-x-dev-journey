import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Content } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import ContentCard from "./ContentCard";

const ShareBoard = () => {
  const { shareLink } = useParams();
  const [contents, setContents] = useState<{
    user: string;
    content: Content[];
  }>({ user: "", content: [] });

  const fetchBrain = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
      const data = await response.json();
      setContents(data.data);
    } catch (error) {
      alert(`Error fetching brain: ${error}`);
    }
  };
  useEffect(() => {
    fetchBrain();
  }, []);

  return (
    <div>
      <div className="flex justify-between mx-10">
        <h1 className="text-md md:text-2xl font-bold text-tuna-700 dark:text-tuna-50 text-center my-1">
          Shared Brain of -{" "}
          <span className="text-tuna-950 dark:text-tuna-500">
            {contents.user}
          </span>
        </h1>
        <span className="text-md md:text-2xl font-bold text-tuna-700 dark:text-tuna-50 text-center my-1">
          <span className="animate-pulse mx-2">←</span>Go to{" "}
          <Link
            to="/dashboard"
            className="dark:text-tuna-300 text-tuna-950 animate-pulse"
          >
            {" "}
            dashboard{" "}
          </Link>
        </span>
      </div>
      <div className="flex flex-wrap gap-4 mx-10 my-10">
        {contents.content.map((content) => (
          <ContentCard
            key={content._id}
            title={content.title}
            link={content.link}
            type={content.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ShareBoard;
