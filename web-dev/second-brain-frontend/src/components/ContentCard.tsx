import Article from "../assets/article.svg";
import Video from "../assets/video.svg";
import Audio from "../assets/audio.svg";
import Image from "../assets/image.svg";
import Share from "../assets/share.svg";
import Delete from "../assets/delete.svg";
import type { ReactElement } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "article" | "video" | "audio" | "image";
}

const typeIcons: Record<string, string> = {
  article: Article,
  video: Video,
  audio: Audio,
  image: Image,
};

const linkTypes: Record<string, (link: string) => ReactElement> = {
  video: (link) => (
    <iframe
      className="rounded-md w-full h-72"
      src={link.replace("watch?v=", "embed/")}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  ),
  article: (link) => (
    <blockquote className="twitter-tweet" data-theme="dark" data-width="550">
      <a href={link.replace("x.com", "twitter.com")}></a>
    </blockquote>
  ),
  image: (link) => (
    <iframe src={link} className="w-full h-80 object-cover">
      <img src={link} alt="article" />
    </iframe>
  ),
  audio: (link) => (
    <iframe
      src={link}
      className="w-full h-80 border-none object-contain rounded-md block"
    ></iframe>
  ),
};

const ContentCard = ({ title, link, type }: CardProps) => {
  return (
    <div className="flex flex-col bg-tuna-300 border border-tuna-50 text-tuna-900 dark:bg-tuna-100 dark:text-tuna-900 max-w-96 rounded-md px-4 py-2">
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-4">
          <img
            src={typeIcons[type]}
            alt="article"
            className="size-4 md:size-6"
          />
          <span className="font-bold text-sm md:text-xl">{title}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <a href={link} target="_blank">
            <img
              src={Share}
              alt="article"
              className="size-4 md:size-6 cursor-pointer"
            />
          </a>
          <img
            src={Delete}
            alt="article"
            className="size-4 md:size-6 cursor-pointer"
          />
        </div>
      </div>
      <div className="my-4 mx-1 rounded-md min-w-80 max-h-80 overflow-scroll">
        {linkTypes[type](link)}
      </div>
    </div>
  );
};

export default ContentCard;
