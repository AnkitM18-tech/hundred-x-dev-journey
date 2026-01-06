import { useEffect, useState } from "react";
import Plus from "../assets/plus.svg";
import Share from "../assets/share.svg";
import Button from "./Button";
import ContentCard from "./ContentCard";
import CreateContentModal from "./CreateContentModal";
import useContent from "../hooks/useContent";
import { BACKEND_URL, FRONTEND_URL } from "../config";

const Container = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  const shareBrain = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({ share: true }),
      });

      if (response.ok) {
        const data = await response.json();
        const shareUrl = `${FRONTEND_URL}/brain/${data.data.hash}`;
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => alert("Share link Copied to clipboard"))
          .catch((err) => alert(`Error sharing brain: ${err}`));
      }
    } catch (error) {
      alert(`Error sharing brain: ${error}`);
    }
  };

  useEffect(() => {
    refresh();
  }, [isModalOpen]);

  return (
    <div className={`${isSidebarOpen ? "ml-56 md:ml-90" : "ml-20"}`}>
      <CreateContentModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
      <div className="flex items-center justify-between pt-4 px-10">
        <h1 className="text-md md:text-xl font-bold dark:text-tuna-50 text-tuna-950">
          All Saved Content
        </h1>
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            size="md"
            text={"Share Brain"}
            icon={<img src={Share} className="size-4" />}
            onClick={shareBrain}
          />
          <Button
            variant="primary"
            size="md"
            text={"Add Content"}
            icon={<img src={Plus} className="size-4" />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <div className="flex flex-wrap m-10 gap-4 max-h-96">
        {contents.map((content) => (
          <ContentCard
            id={content._id}
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

export default Container;
