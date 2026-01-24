import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/cropped-gpsfavicon-300x300.webp";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <nav className="w-full bg-black">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
                {/* Logo */}
                <div className="shrink-0">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-16 w-auto" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {/* ✅ Wall Canvas Dropdown Wrapper (IMPORTANT) */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <button className="text-white hover:text-gpsfdk-orange flex items-center gap-1">
                            Wall Canvas <span className="text-xs">▼</span>
                        </button>

                        {/* ✅ Hover Bridge (so dropdown doesn't close while moving mouse down) */}
                        <div className="absolute left-0 top-full w-full h-4" />

                        {/* ✅ Mega Menu */}
                        {isOpen && (
                            <div className="absolute left-0 top-full mt-4 w-[600px] bg-black shadow-lg border rounded-lg p-6 z-50 ">
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
                    <Link
                        to="#"
                        className="text-white hover:text-gpsfdk-orange "
                    >
                        House Nameplates
                    </Link>

                    <Link
                        to="#"
                        className="text-white hover:text-gpsfdk-orange "
                    >
                        Watch & Buy
                    </Link>
                </div>
                {/* Placeholder for right side (e.g., cart, user icon) */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/profile"
                        className="text-white hover:text-gpsfdk-orange "
                    >
                        <HiOutlineUser className="w-5 h-5 text-white font-medium" />
                    </Link>
                    <button className="text-white hover:text-gpsfdk-orange relative">
                        <HiOutlineShoppingBag className="w-5 h-5 text-white font-medium" />
                        <span className="absolute -top-2 -right-2 bg-gpsfdk-orange text-white rounded-full py-0.5 px-1 flex items-center justify-center text-xs">2</span>
                    </button>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden">
                        <HiBars3BottomRight className="w-6 h-6 text-white hover:text-gpsfdk-orange" />
                    </button>
                    {/* Add SearchBar component here*/}
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
