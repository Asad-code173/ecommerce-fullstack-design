// imports
import React, { useState } from "react"
import logo from '../assets/Layout/Brand/logo.png'
import profile from '../assets/Layout/icons/profile.png'
import Message from '../assets/Layout/icons/Message.png'
import Order from '../assets/Layout/icons/Order.png'
import cart from '../assets/Layout/icons/cart.png'
import person from "../assets/Layout/Brand/person.png"
import shopping_cart from "../assets/Layout/Brand/shopping_cart.png"
import Avatar from "../assets/Layout/Brand/Avatar.png"
import close from "../assets/Layout/Brand/close.png"
import home from "../assets/Layout/Brand/home.png"
import categories from "../assets/Layout/Brand/categories.png"
import favorite_border from "../assets/Layout/Brand/favorite_border.png"
import inventory_2 from "../assets/Layout/Brand/inventory_2.png"
import language from "../assets/Layout/Brand/language.png"
import contactus from "../assets/Layout/Brand/contactus.png"
import about from "../assets/Layout/Brand/about.png"





import { HiMenu } from 'react-icons/hi'
import Input from "./Input"
import { BiSearch } from "react-icons/bi"
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"

const Header = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const showMobileSearch = ["/", "/products/all"].includes(location.pathname);
  const showMobileHamburger = location.pathname === "/";
  const showpageWithBrandLogo = ["/"].includes(location.pathname);

  function shouldShowBackArrow(pathname: string) {
  if (pathname === "/products/all") return true;
  if (pathname.startsWith("/product/")) return true;
  if (pathname.startsWith("/cart")) return true;
  return false;
}
const showBackArrowIcon = shouldShowBackArrow(location.pathname);

  return (
    <>
      {/* HEADER */}
      <div className="bg-white h-14 w-full md:h-20  flex items-center px-8 gap-8 relative z-50">
        {/* LEFT SIDE */}


        <section className="flex items-center gap-4">
          {/* Hamburger menu for mobile */}
          {showMobileHamburger && (
            < HiMenu
              onClick={() => setIsSidebarOpen(true)}
              className="w-7 h-7 md:hidden cursor-pointer"
            />
          )}
          {showBackArrowIcon && (
            <BiArrowBack className="md:hidden w-6 h-6 mt-2"/>
          )}
          
        

          {/* Logo Section */}
          <Link to="/" className="flex items-center md:ml-12 gap-2 cursor-pointer">
            {/* Mobile: show logo only on selected pages */}
            {showpageWithBrandLogo && (
              <>
             
              <img
                src={logo}
                className="w-8 h-8 md:hidden"
                alt="Brand Logo"
              />
              <span className="md:hidden text-xl md:text-2xl font-semibold w-18 text-[#8CB7F5]">
                Brand
              </span>
               </>
              
            )}

          
            <div className="hidden md:flex items-center gap-2">
              <img
                src={logo}
                className="w-10 h-10"
                alt="Brand Logo"
              />
              <span className="text-xl md:text-2xl font-semibold w-18 text-[#8CB7F5]">
                Brand
              </span>
            </div>
          </Link>

        </section>

        {/* Center search bar Desktop */}
        <div className="hidden md:block w-[640px] h-10 rounded-sm border-2 border-[#0D6EFD]">
          <div className="flex h-full w-full">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 text-sm outline-none"
            />
            <select className="border-l border-[#0D6EFD] px-2 text-sm outline-none">
              <option className="text-sm font-normal">All category</option>
              <option>Electronics</option>
              <option>Clothes</option>
            </select>
            <button className="bg-[#0D6EFD] text-white px-6 text-sm font-medium">
              Search
            </button>
          </div>
        </div>


        {/* ICONS */}
        <section className="flex items-center ml-auto gap-4 md:mr-24 mr-0">
          <div className="flex flex-col items-center text-xs cursor-pointer order-2 md:order-0">
            <Link to="/sign-up">
            <img src={person} className="w-6 h-6 block md:hidden" alt="person" />
            <img src={profile} className="hidden md:block md:w-5 md:h-5 mb-1" alt="Profile" />
            </Link>
            
            <p className="hidden md:block font-normal text-xs leading-none tracking-normal text-[#8B96A5] text-center">
              Profile
            </p>
          </div>

          <div className="hidden md:flex flex-col items-center text-xs cursor-pointer">
            <img src={Message} className="w-5 h-5 mb-1" alt="Messages" />
            <p className="font-normal text-xs leading-none tracking-normal text-[#8B96A5] flex items-center justify-center">
              Messages
            </p>
          </div>

          <div className="hidden md:flex flex-col items-center text-xs cursor-pointer">
            <img src={Order} className="w-5 h-5 mb-1" alt="Orders" />
            <p className="font-normal text-xs leading-none tracking-normal flex items-center justify-center text-[#8B96A5]">
              Orders
            </p>
          </div>

          <div className="flex flex-col items-center text-xs cursor-pointer">
            <Link to="/cart">
            <img src={shopping_cart} className="w-6 h-6 block md:hidden" alt="shoppingcart" />
            <img src={cart} className="hidden md:block md:w-5 md:h-5 mb-1" alt="Cart" />
            </Link>
            <p className="hidden md:block font-normal text-xs leading-none tracking-normal text-[#8B96A5] text-center">
              Cart
            </p>
          </div>
        </section>
      </div>
      {showMobileSearch && (
        <div className=" md:hidden w-full h-14 bg-white">
          {/* // mobile search */}

          <div className="md:hidden w-96  mx-auto  ">
            <div className="h-10 flex items-center gap-2 px-3 border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-200 transition">
              <BiSearch className="text-gray-500 text-lg" />
              <Input
                type="search"
                placeholder="Search"
                className="border-none px-0 py-0 h-full focus:bg-transparent bg-gray-100 "
              />
            </div>
          </div>


        </div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >


        {/* Mobile Menu Items */}

        <div className="bg-[#EFF2F4] px-5 py-4">
          <img
            onClick={() => setIsSidebarOpen(false)}
            src={close}
            alt="Avatar"
            className="ml-auto cursor-pointer -mt-3 hover:text-black"
          />

          <img
            src={Avatar}
            alt="Avatar"
            className="w-11 h-11 ml-5 "
          />
          <div className="ml-6 mt-2">
            <p>Sign in&nbsp;&nbsp;|&nbsp;&nbsp;Register</p>
          </div>

        </div>

        {/* {upper side menu content for mobile */}
        <ul className="list-none px-12 py-3 space-y-6">
          <div className="flex items-center gap-4 ">
            <img src={home} alt="" className="w-5 h-4.25" />
            <li className="text-sm">Home</li>
          </div>
          <div className="flex items-center gap-4 ">
            <img src={categories} alt="" className="w-4.5 h-4" />
            <li className="text-sm">Categories</li>

          </div>
          <div className="flex items-center gap-4">
            <img src={favorite_border} alt="" className="w-5 h-6" />
            <li className="text-sm">Favourites</li>

          </div>

          <div className="flex items-center gap-4">
            <img src={inventory_2} alt="" className="w-5 h-6" />
            <li className="text-sm">My orders</li>

          </div>
        </ul>
        <div className="w-full h-px  bg-gray-100"></div>

        <ul className="list-none px-12 py-4 space-y-6">
          <div className="flex items-center gap-4 ">
            <img src={language} alt="" className="w-5 h-5" />

            <li className="text-sm">English&nbsp;&nbsp;|&nbsp;&nbsp;USD</li>
          </div>
          <div className="flex items-center gap-4 ">
            <img src={contactus} alt="" className="w-4.5 h-5.5" />
            <li className="text-sm">Contact</li>

          </div>
          <div className="flex items-center gap-4">
            <img src={about} alt="" className="w-5 h-4.5" />
            <li className="text-sm">About</li>

          </div>

        </ul>

        <div className="w-full">
          <div className="divider h-px my-4 bg-gray-100 w-[90%] mx-auto">
          </div>
        </div>

        <ul className="list-none px-16 py-3 space-y-6 -mt-2">
          <li className="text-sm">User aggrement</li>
          <li className="text-sm">Partnership</li>
          <li className="text-sm">privacy-policy</li>
        </ul>

      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#DEE2E7] z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Header
