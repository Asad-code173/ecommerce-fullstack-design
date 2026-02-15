import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import googlePlay from "../assets/Layout/Misc/googlePlay.png"
import Applestore from "../assets/Layout/Misc/Applestore.png"
import logo from "../assets/Layout/Brand/logo.png"
import usa from "../assets/Layout1/Image/flags/usa.png";
import email from "../assets/Layout/Brand/email.png"

const Footer = () => {
  return (
    <footer className= " bg-[#EFF2F4] text-gray-600">
      
      <div className="border-b border-gray-200 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Subscribe on our newsletter
          </h2>
          <p className="text-sm mt-2">
            Get daily news on upcoming offers from many suppliers all over the
            world
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <img src={email}/>
              </span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
<div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-[#8CB7F5] font-bold text-2xl">
            <div className=" text-white w-9 h-9 flex items-center justify-center rounded-md">
              <img src={logo} className="w-11 h-11"/>
            </div>
             Brand
          </div>
          <p className="mt-4 text-sm max-w-xs leading-6">
            Best information about the company <br/> goes here but now lorem ipsum is
          </p>

          <div className="flex gap-3 mt-4 text-gray-400">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-600 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-blue-600 cursor-pointer" />
            <FaYoutube className="hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Columns */}
        {[
          {
            title: "About",
            links: ["About Us", "Find store", "Categories", "Blogs"],
          },
          {
            title: "Partnership",
            links: ["About Us", "Find store", "Categories", "Blogs"],
          },
          {
            title: "Information",
            links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
          },
          {
            title: "For users",
            links: ["Login", "Register", "Settings", "My Orders"],
          },
          
        ].map((col) => (
          <div key={col.title}>
            <h3 className="font-semibold text-gray-800 mb-3">
              {col.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link} className="hover:text-blue-600 cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* App */}
        <div className="mr-4">
          <h3 className="font-semibold text-gray-800 mb-3">Get app</h3>
          <div className="space-y-3">
            <img
              src={Applestore}
              alt="App Store"
              className="h-10 w-32 cursor-pointer"
            />
            <img
              src={googlePlay}
              alt="Google Play"
              className="h-10 w-32 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2023 Ecommerce.</span>
          <div className="flex items-center gap-2">
            <img src={usa}/>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
