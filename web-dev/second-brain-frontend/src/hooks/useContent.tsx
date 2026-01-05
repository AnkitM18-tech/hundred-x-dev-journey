import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: "article" | "video" | "audio" | "image";
}

export default function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  const refresh = async () => {
    setTimeout(() => {
      fetchContent();
    }, 1000);
  };

  async function fetchContent() {
    const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token") as string,
      },
    });
    const data = await response.json();
    setContents(data.data);
  }
  useEffect(() => {
    fetchContent();
  }, []);

  return { contents, refresh };
}
