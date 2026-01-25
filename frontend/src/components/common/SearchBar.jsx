import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { Form } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
        // Implement search logic here
        setIsOpen(false);
    }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 bg-black h-24 z-50" : "w-auto"}`}>
        {
            isOpen ?(
                <form className='relative flex items-center justify-center w-full'
                onSubmit={handleSearch}>
                    <div className='relative w-1/2'>
                    <input type="text" placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-white text-white border border-gpsfdk-gold bg-black'/>
                    {/* Search Icon inside input */}
                    <button type="submit"><HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white hover:text-gpsfdk-orange" /></button>
                    </div>
                    <button type='button'
                    onClick={handleSearchToggle} className='hover:text-gpsfdk-orange relative left-2 ml-4'>
                        <HiMiniXMark className='text-white h-6 w-6 '/>
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className="w-6 h-6 text-white hover:text-gpsfdk-orange" />
                </button>
            )
        }
    </div>
  )
}

export default SearchBar