import HamburgerMenu from "../assets/hamburger.svg";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";
import Video from "../assets/video.svg";
import Audio from "../assets/audio.svg";
import Image from "../assets/image.svg";
import Article from "../assets/article.svg";
import SidebarButton from "./SidebarButton";

interface SideBarProps {
  theme: string | null;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const sideBarIcons: Record<string, { icon: string; text: string }> = {
  video: {
    icon: Video,
    text: "Video",
  },
  image: {
    icon: Image,
    text: "Image",
  },
  article: {
    icon: Article,
    text: "Article",
  },
  audio: {
    icon: Audio,
    text: "Audio",
  },
};

const Sidebar = ({
  theme,
  toggleTheme,
  isSidebarOpen,
  toggleSidebar,
}: SideBarProps) => {
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64 md:w-80" : "w-16 md:w-20"
      } bg-tuna-300 h-full fixed z-10 shadow-md transition-all duration-100 rounded-r-sm`}
    >
      <div className="absolute top-4 left-4 flex gap-4 items-center">
        <img
          src={HamburgerMenu}
          alt="hamburger-menu"
          onClick={toggleSidebar}
          className="size-8 md:size-10 rounded-sm cursor-pointer mb-4"
        />
        {isSidebarOpen && (
          <h1 className="text-tuna-900 font-bold text-2xl mb-4">
            Second Brain 🧠
          </h1>
        )}
      </div>

      {isSidebarOpen && (
        <div className="flex flex-col absolute top-30 left-4 gap-10 text-tuna-900">
          {["video", "image", "article", "audio"].map((item) => (
            <SidebarButton
              text={sideBarIcons[item].text}
              icon={
                <img
                  src={sideBarIcons[item].icon}
                  alt={item}
                  className="size-6 md:size-8 cursor-pointer my-2"
                />
              }
              onClick={() => {}}
            />
          ))}
        </div>
      )}

      <img
        src={theme === "dark" ? Sun : Moon}
        alt="theme-btn"
        className="size-8 md:size-10 absolute bottom-4 left-4 cursor-pointer mb-4"
        onClick={toggleTheme}
      />
    </aside>
  );
};

export default Sidebar;
