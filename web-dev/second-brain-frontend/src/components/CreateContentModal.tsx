import { useRef } from "react";
import Close from "../assets/close.svg";
import { BACKEND_URL } from "../config";
const CreateContentModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const title = useRef<HTMLInputElement>(null);
  const link = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLSelectElement>(null);

  const addContent = async () => {
    const data = {
      title: title.current?.value,
      type: type.current?.value,
      link:
        type.current?.value === "image"
          ? link.current?.value + "?width=320"
          : link.current?.value,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Content added successfully");
        close();
      }
    } catch (error) {
      alert(`Error adding content: ${error}`);
    }
  };

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-tuna-950 opacity-95 fixed top-0 left-0 flex justify-center dark:text-tuna-950">
          <div className="flex flex-col justify-center px-4 py-2">
            <div className="w-96 bg-tuna-100 min-h-96 rounded-md p-4">
              <div className="flex justify-between items-center px-2 py-1">
                <h1 className="text-md md:text-xl font-semibold">
                  Add Content
                </h1>
                <img
                  src={Close}
                  alt="icon"
                  className="size-6 md:size-10 cursor-pointer"
                  onClick={close}
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label htmlFor="title" className="font-bold">
                  Title
                </label>
                <input
                  ref={title}
                  type="text"
                  id="title"
                  className="px-2 py-1 border-2 border-tuna-900 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label htmlFor="link" className="font-bold">
                  Link
                </label>
                <input
                  ref={link}
                  type="text"
                  id="link"
                  className="px-2 py-1 border-2 border-tuna-900 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label htmlFor="type" className="font-bold">
                  Type
                </label>
                <select
                  ref={type}
                  name="type"
                  id="type"
                  className="px-2 py-1 border-2 border-tuna-900 rounded-md focus:outline-none"
                >
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 py-6 px-2">
                <button
                  className="bg-tuna-700 text-tuna-50 px-4 py-2 rounded-md cursor-pointer"
                  onClick={addContent}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
