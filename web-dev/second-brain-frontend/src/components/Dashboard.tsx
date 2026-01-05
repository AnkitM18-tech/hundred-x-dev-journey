import { useState } from "react";
import Container from "./Container";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") || "dark"
  );

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setTheme(localStorage.getItem("theme"));
  }

  return (
    <div>
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Container isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default Dashboard;
