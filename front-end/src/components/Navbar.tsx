import React, { useState } from "react"
import { HiMenu } from "react-icons/hi"
import { FiChevronDown, FiChevronRight } from "react-icons/fi"
import uae from "../assets/Layout1/Image/flags/uae.png"
import usa from "../assets/Layout1/Image/flags/usa.png"
import china from "../assets/Layout1/Image/flags/china.png"
import italy from "../assets/Layout1/Image/flags/italy.png"
import { NavLink } from "react-router-dom"

type Country = {
  name: string
  flag: string
}

const countries: Country[] = [
  { name: "UAE", flag: uae },
  { name: "USA", flag: usa },
  { name: "China", flag: china },
  { name: "Italy", flag: italy },
]

const Navbar: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>

      <div className="hidden sm:flex w-full bg-white border-t border-b border-gray-200 px-20 h-14 flex items-center">

        {/* LEFT NAV LINKS */}
        <div className="flex items-center gap-6 text-sm text-[#1C1C1C]">
          <NavLink
            to="/products/all"
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium ml-6 ${isActive ? "text-[#0D6EFD]" : "text-[#1C1C1C]"
              }`
            }
          >
            <HiMenu className="w-5 h-5" />
            <span>All category</span>
          </NavLink>


          <p className="cursor-pointer hover:text-[#0D6EFD]">Hot offers</p>
          <p className="cursor-pointer hover:text-[#0D6EFD]">Gift boxes</p>
          <p className="cursor-pointer hover:text-[#0D6EFD]">Products</p>
          <p className="cursor-pointer hover:text-[#0D6EFD]">Menu item</p>

          <div className="flex items-center gap-1 cursor-pointer hover:text-[#0D6EFD]">
            <span>Help</span>
            <FiChevronDown className="w-4 h-4" />
          </div>
        </div>



        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-6 text-sm text-[#1C1C1C]">

          <div className="flex items-center gap-1 cursor-pointer">
            <span>English, USD</span>
            <FiChevronDown className="w-4 h-4" />
          </div>

          {/* SHIP TO DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <span>Ship to</span>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-7 h-auto object-cover rounded-sm"
              />
              <FiChevronDown className="w-4 h-4 mr-6" />
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md z-50">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    onClick={() => {
                      setSelectedCountry(country)
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-7 h-auto object-cover rounded-sm"
                    />
                    <span className="text-sm">{country.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Nav Menu BreadCrumb */}
      {/* <div className="hidden md:block w-full h-16 px-28 mt-4">
        <div className="nav-breadcrumb no-underline flex gap-4 list-none">
          <div className="flex items-center justify-center gap-1">
            <li className="text-[#8B96A5]">Home</li>
            <FiChevronRight className="text-[#8B96A5] " />
          </div>
          <div className="flex items-center justify-center gap-1">
            <li className="text-[#8B96A5]">Clothings</li>
            <FiChevronRight className="text-[#8B96A5]" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <li className="text-[#8B96A5]">Men's wear</li>
            <FiChevronRight className="text-[#8B96A5]" />
          </div>
          <div className="flex items-center justify-center">
            <li className="text-[#8B96A5]">Summer clothing</li>
            
          </div>


        </div>

      </div> */}
    </>
  )
}

export default Navbar

