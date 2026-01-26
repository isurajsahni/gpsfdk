import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/cropped-gpsfavicon-300x300.webp";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";

const Navbar = () => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftItems = [
    "Abstract Art",
    "Black and White",
    "Cats",
    "Super Collection",
    "Canvas On Wheels",
    "Galaxy",
  ];

  const rightItems = [
    "City & Sight",
    "Millionaire Art",
    "Oils",
    "Flowers",
    "Scenic Pleasure",
    "Pink Town",
  ];

  const toggleCartDrawer = () => {
    setCartOpen(!cartOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full bg-black">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* ✅ Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <button className="text-white hover:text-gpsfdk-orange flex items-center gap-1">
              Wall Canvas <span className="text-xs">↴</span>
            </button>

            {/* ✅ Hover bridge to prevent closing */}
            <div className="absolute left-0 top-full w-full h-4" />

            {isMegaOpen && (
              <div className="absolute left-0 top-full mt-4 w-[500px] bg-black shadow-lg border border-white/20 rounded-lg p-6 z-50">
                <div className="grid grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="flex flex-col gap-4">
                    {leftItems.map((item, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="text-white hover:text-gpsfdk-orange font-medium"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4">
                    {rightItems.map((item, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="text-white hover:text-gpsfdk-orange font-medium"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Normal Links */}
          <Link to="#" className="text-white hover:text-gpsfdk-orange">
            House Nameplates
          </Link>

          <Link to="#" className="text-white hover:text-gpsfdk-orange">
            Watch & Buy
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link to="/profile" className="text-white hover:text-gpsfdk-orange">
            <HiOutlineUser className="w-5 h-5" />
          </Link>
          
          {/* Cart Button */}
          <button
            onClick={toggleCartDrawer}
            className="text-white hover:text-gpsfdk-orange relative"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-gpsfdk-orange text-white rounded-full py-0.5 px-1 flex items-center justify-center text-xs">
              2
            </span>
          </button>
   {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>


          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            <HiBars3BottomRight className="w-6 h-6 text-white hover:text-gpsfdk-orange" />
          </button>
        </div>
      </div>

      {/* ✅ Cart Drawer */}
      <CartDrawer drawerOpen={cartOpen} toggleCartDrawer={toggleCartDrawer} />

     {/* ✅ Mobile Menu Drawer */}
<div
  className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Close Button */}
  <div className="flex justify-end p-4">
    <IoMdClose
      className="w-6 h-6 text-black cursor-pointer"
      onClick={toggleMobileMenu}
    />
  </div>

  <div className="flex flex-col gap-4 px-6">

    {/* ✅ Wall Canvas Mega Menu for Mobile */}
    <div className="border-b pb-3">
      <button
        onClick={() => setIsMegaOpen(!isMegaOpen)}
        className="w-full flex items-center justify-between text-black font-semibold"
      >
        Wall Canvas
        <span className="text-lg">{isMegaOpen ? "−" : "+"}</span>
      </button>

      {/* ✅ Mega Menu inside Mobile */}
      {isMegaOpen && (
        <div className="mt-4 grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {leftItems.map((item, index) => (
              <Link
                key={index}
                to="#"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gpsfdk-orange font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {rightItems.map((item, index) => (
              <Link
                key={index}
                to="#"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gpsfdk-orange font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* ✅ Other Links */}
    <Link
      to="#"
      onClick={toggleMobileMenu}
      className="text-black font-semibold"
    >
      House Nameplates
    </Link>

    <Link
      to="#"
      onClick={toggleMobileMenu}
      className="text-black font-semibold"
    >
      Watch & Buy
    </Link>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
