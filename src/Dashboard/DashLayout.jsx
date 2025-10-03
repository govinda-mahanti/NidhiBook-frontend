import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Receipt, User, Settings, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

const DashLayout = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Using a format closer to the image
      const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setCurrentTime(date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Expense",
      path: "/dashboard/expense",
      icon: <Receipt size={20} />,
    },
    { label: "Income", path: "/dashboard/income", icon: <Receipt size={20} /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] text-gray-300 flex flex-col justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold text-center text-white mb-12">
            Nidhibook
          </h1>
          <ul className="space-y-2">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/*  <footer className="text-xs text-center text-gray-500">
          <p>Made with ❤️</p>
          <p>&copy; Nidhibook</p>
        </footer> */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-[#161b22] border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">{currentTime}</div>
          <div className="flex items-center gap-6 relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-gray-400 hover:text-white"
            >
              <User size={20} />
            </button>

            {/* Settings Dropdown */}
            {/*   {showSettings && (
              <div className="absolute top-10 right-12 bg-[#161b22] border border-gray-700 shadow-lg rounded-md p-2 w-48 z-10">
                <ul className="text-sm text-gray-300">
                  <li className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50">
                    Reset Password
                  </li>
                  <li className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50">
                    Terms
                  </li>
                  <li className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50">
                    Privacy
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-red-500 hover:bg-gray-700/50"
                  >
                    <LogOut size={16} /> Logout
                  </li>
                </ul>
              </div>
            )} */}
            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute top-10 right-12 bg-[#161b22] border border-gray-700 shadow-lg rounded-md p-2 w-48 z-10">
                <ul className="text-sm text-gray-300">
                  <li
                    onClick={() => {
                      setShowSettings(false);
                      navigate("/dashboard/profile"); // or your reset password route
                    }}
                    className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50"
                  >
                    Reset Password
                  </li>
                  <li className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50">
                    Terms
                  </li>
                  <li className="px-3 py-2 rounded cursor-pointer hover:bg-gray-700/50">
                    Privacy
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-red-500 hover:bg-gray-700/50"
                  >
                    <LogOut size={16} /> Logout
                  </li>
                </ul>
              </div>
            )}

            {/* Profile Dropdown */}
            {showProfile && user && (
              <div className="absolute top-10 right-0 bg-[#161b22] border border-gray-700 shadow-lg rounded-md p-4 w-64 z-10 text-gray-300">
                <h2 className="font-semibold mb-2 text-white">Your Profile</h2>
                <div className="text-sm space-y-1">
                  <p>{user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
