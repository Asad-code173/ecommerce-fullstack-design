import useSideMenu from "../Hooks/useSideMenu";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/Layout/Brand/logo.png";

interface SideMenuProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const SideMenu = ({ isOpen, closeSidebar }: SideMenuProps) => {
  const location = useLocation();
  const SideItems = useSideMenu();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="bg-white w-64 fixed inset-y-0 left-0 h-full hidden md:block ">
        <div className="flex items-center gap-2 px-10 py-4">
          <img src={logo} alt="Brand" className="w-8 h-8" />
          <span className="text-xl font-semibold text-[#8CB7F5]">
            Brand
          </span>
        </div>

        <div className="mt-6">
          {SideItems?.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`ml-6 flex items-center space-x-3 p-3 rounded-lg transition ${
                location.pathname === item.url
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <item.Icon className="text-lg" />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeSidebar} className="text-gray-600">
            ✕
          </button>
        </div>

        <div className="px-6">
          {SideItems?.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              onClick={closeSidebar}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <item.Icon className="text-lg" />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default SideMenu;
