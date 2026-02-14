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
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

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
      <div className=" mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <div className="shrink-0 flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </Link>

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
                      <button
                        key={index}
                        type="button"
                        className="text-white hover:text-gpsfdk-orange font-medium bg-transparent border-none cursor-pointer p-0 text-left"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4">
                    {rightItems.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-white hover:text-gpsfdk-orange font-medium bg-transparent border-none cursor-pointer p-0 text-left"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Normal Links */}
          <Link to="/products/house-nameplates" className="text-white hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0">
            House Nameplates
          </Link>

          <Link to="/products/watch-buy" className="text-white hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0">
            Watch & Buy
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gpsfdk-gold hover:text-gpsfdk-orange">
              Admin
            </Link>
          )}
        </div>

        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <Link to="/profile" className="text-white hover:text-gpsfdk-orange">
                <HiOutlineUser className="w-5 h-5" />
              </Link>
              <div className="hidden group-hover:block absolute right-0 top-full mt-1 py-2 px-3 bg-black border border-white/20 rounded shadow z-50">
                <p className="text-white text-sm">{user.name}</p>
                <button type="button" onClick={logout} className="text-gpsfdk-orange text-sm hover:underline mt-1">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gpsfdk-orange">
              <HiOutlineUser className="w-5 h-5" />
            </Link>
          )}
          <button
            onClick={toggleCartDrawer}
            className="text-white hover:text-gpsfdk-orange relative"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gpsfdk-orange text-white rounded-full py-0.5 px-1 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
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
        <div className="mt-4 grid grid-cols-1 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {leftItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gpsfdk-orange font-medium bg-transparent border-none cursor-pointer p-0 text-left"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {rightItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gpsfdk-orange font-medium bg-transparent border-none cursor-pointer p-0 text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* ✅ Other Links */}
    <button
      type="button"
      onClick={toggleMobileMenu}
      className="text-black font-semibold bg-transparent border-none cursor-pointer p-0 text-left"
    >
      House Nameplates
    </button>

    <button
      type="button"
      onClick={toggleMobileMenu}
      className="text-black font-semibold bg-transparent border-none cursor-pointer p-0 text-left"
    >
      Watch & Buy
    </button>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
