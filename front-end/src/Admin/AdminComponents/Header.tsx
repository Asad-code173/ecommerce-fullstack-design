import React, { useState } from "react";
import {
  BellIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon, // ✅ add this
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  role: string;
}

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleSidebar}) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const navigate = useNavigate();

  const user: User = {
    username: "Admin",
    role: "Administrator",
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white w-full h-16 sticky top-0 shadow-md flex items-center justify-between px-4 sm:px-6 lg:px-10">

      {/* LEFT SIDE - Hamburger (Mobile Only) */}
      <div className="flex items-center">
        <Bars3Icon
          className="w-6 h-6 cursor-pointer md:hidden"
          onClick={toggleSidebar} 
        />
      </div>

      {/* CENTER - Search (Desktop) */}
      <div className="flex flex-1 justify-center">
        <div className="hidden sm:flex items-center border border-gray-300 rounded-2xl overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="px-4 py-2 sm:w-48 md:w-72 outline-none text-gray-700"
          />
          <MagnifyingGlassIcon className="w-6 h-6 mx-2 text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black sm:hidden" />
        <BellIcon className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
        <EnvelopeIcon className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />

        <div className="relative flex items-center gap-3">
          <button
            className="w-8 h-8 rounded-full border border-black flex items-center justify-center"
            onClick={() => setOpenSetting(!openSetting)}
          >
            {user.username.charAt(0).toUpperCase()}
          </button>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold">{user.username}</span>
            <span className="text-xs text-gray-500">{user.role}</span>
          </div>

          {openSetting && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">
                  <Cog6ToothIcon className="w-5 h-5 mr-3 text-gray-500" />
                  Settings
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
