import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, [isDesktop]);

  return (
    <div className="flex h-screen">
      <div className="my-2 fixed z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 cursor-pointer bg-slate-900 text-white m-2 p-2 rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
      </div>
      {isSidebarOpen ? (
        <div
          className={`transition-all duration-100 md:bg bg-slate-50 h-screen w-96 md:relative absolute top-0 left-0
          px-2 border border-r-2 border-slate-50 shadow-lg`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      ) : (
        <div
          className={`transition-all duration-100 w-0 px-2 border border-r-2 border-slate-50 shadow-lg`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}
      <div className="w-full">
        <MainContainer />
      </div>
    </div>
  );
};

const MainContainer = () => {
  return (
    <div className="flex-1 md:flex flex-col">
      <div className="bg-black hidden md:block h-24 py-20 shadow-lg"></div>
      <div className="px-10">
        <div className="mx-auto flex-1 md:flex flex-col items-center justify-center py-4 border-b-2 border-slate-50">
          <p>{new Date().toDateString()}</p>
          <h1 className="text-4xl py-1">Good Morning! Remi!👋🏻</h1>
        </div>
        <div className="flex flex-col mx-auto md:flex-row md:justify-around gap-4 w-96 md:w-full">
          <ProfileCard />
          <MeetingCard />
          <CTACard />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className="flex flex-col">
      {isSidebarOpen && (
        <div className="relative top-12">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-cyan-400 text-lg font-bold">Webinar.gg</span>
            <img
              className="w-16 rounded-lg"
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile"
            />
          </div>
          <div>
            {["Home", "About", "Settings", "Profile", "Scheduler"].map(
              (link) => (
                <Link
                  name={link}
                  key={link}
                  icon="https://cdn-icons-png.flaticon.com/512/7046/7046086.png"
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Link = ({ name, icon }) => {
  return (
    <div className="bg-slate-100 rounded-lg flex justify-between items-center px-4 py-2 my-2 cursor-pointer shadow-md">
      <span>{name}</span>
      <span>
        <img className="w-4" src={icon} alt="icon" />
      </span>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <div className="bg-slate-100 w-48 max-h-64 rounded-lg md:-translate-y-32 flex flex-col items-center py-10 shadow-lg">
      <img
        className="w-32 px-2 rounded-lg"
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="profile"
      />
      <div className="py-2">
        <h1 className="text-slate-400 text-center pt-8">Remi Malek</h1>
        <h1 className="text-slate-400 text-center">re***@******.com</h1>
      </div>
    </div>
  );
};

const MeetingCard = () => {
  return (
    <div className="py-4 w-64 md:w-96 bg-slate-100 rounded-lg px-2 mt-2 shadow-lg">
      <div className="px-2 bg-slate-50 p-2 rounded-lg text-sm flex justify-between">
        <p>📅 {new Date().toDateString()}</p>
        <div>← | →</div>
      </div>
      <div className="flex flex-col gap-4">
        {[
          {
            from: "11:30 AM",
            to: "11:50 AM",
            status: "Live 🔴",
            name: "My First Webinar",
          },
          {
            from: "11:50 AM",
            to: "12:30 PM",
            status: "Upcoming 🔵",
            name: "UI Mockup",
          },
          {
            from: "12:30 PM",
            to: "12:50 PM",
            status: "Upcoming 🔵",
            name: "Frontend Development",
          },
          {
            from: "12:50 PM",
            to: "1:50 PM",
            status: "Upcoming 🔵",
            name: "Backend Development",
          },
        ].map((event, index) => {
          return <MeetingLink event={event} key={index} />;
        })}
      </div>
    </div>
  );
};

const MeetingLink = ({ event }) => {
  return (
    <div className="text-black flex gap-2 border-t-2 border-slate-300">
      <div className="my-2 px-2 border-r-4 border-cyan-400">
        <p className="text-md font-bold">{event.from}</p>
        <p className="text-xs">{event.to}</p>
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-xs font-bold">{event.status}</p>
        <h1 className="font-light">{event.name}</h1>
      </div>
    </div>
  );
};

const CTACard = () => {
  return (
    <div className="py-8 px-2 w-48 md:w-80 md:h-56 bg-slate-100 rounded-lg flex md:flex-row flex-col gap-4 mt-2 shadow-lg mb-10 md:mb-0">
      {["Schedule a Webinar", "Join a Webinar", "Open Recordings"].map(
        (value, index) => (
          <CTAIcon
            key={index}
            icon={"https://cdn-icons-png.flaticon.com/512/7046/7046086.png"}
            name={value}
          />
        )
      )}
    </div>
  );
};

const CTAIcon = ({ icon, name }) => {
  return (
    <div className="items-center flex-col w-24 flex px-2 cursor-pointer flex-wrap">
      <div className="bg-cyan-400 w-12 rounded-lg px-2 py-1">
        <img className="w-12" src={icon} alt="icon" />
      </div>
      <p className="text-sm text-center pt-1">{name}</p>
    </div>
  );
};

export default Profile;
