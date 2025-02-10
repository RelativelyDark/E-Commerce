import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { noExcuseLogo, profileIcon } from "../assets";
import { Link } from "react-router-dom";
import { CategoriesContext } from '../contextApi/CategoriesContext'

const Navbar = () => {
  const { categories } = useContext(CategoriesContext); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); 
  const navigate = useNavigate();
  const inputRef = useRef(null); 

  const handleFocus = () => {
    setFilteredCategories(categories.slice(0, 10));
    setShowDropdown(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (!inputRef.current.contains(document.activeElement)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    console.log(value); // this will give whatever the user is typing out in the search bar dynamically

    setSearchTerm(value);
    setHighlightedIndex(-1);

    if (value.length > 0) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories.slice(0, 5)); 
    }

    setShowDropdown(true);
  };

  const handleSelectCategory = (category) => {
    setSearchTerm(category);
    setShowDropdown(false);
    navigate(`/products/${category}`); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredCategories.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredCategories.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex !== -1) {
        handleSelectCategory(filteredCategories[highlightedIndex]);
      } else if (filteredCategories.length > 0) {
        handleSelectCategory(filteredCategories[0]);
      } else {
        navigate(`/products/${searchTerm}`);
      }
    }
  };

  return (
    <div className="bg-gray-400 py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={noExcuseLogo}
          alt="Logo"
          className="rounded-lg w-12 h-12 object-cover"
        />
        <span className="font-sans text-3xl font-semibold text-gray-800">NoExcuse</span>
      </Link>

      <div className="flex flex-grow justify-center mx-4 relative" ref={inputRef}>
        <input
          type="text"
          placeholder="Search by category"
          className="w-[400px] px-4 py-2 rounded-full border border-black focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} 
        />

        {showDropdown && filteredCategories.length > 0 && (
          <ul className="absolute top-full bg-white text-black rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
            {filteredCategories.map((category, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-300" : "hover:bg-gray-400"
                }`}
                onMouseDown={() => handleSelectCategory(category)} 
                onMouseEnter={() => setHighlightedIndex(index)} 
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="flex gap-4">
        <Link to="/products" className="font-mono font-bold text-xl !text-black px-6 py-2">
          Shop
        </Link>
        <Link to="/cart" className="font-mono font-bold text-xl !text-black px-6 py-2">
          Cart
        </Link>
        <Link to="/order" className="font-mono font-bold text-xl !text-black px-6 py-2">
          Orders
        </Link>
        <Link to="/profile">
          <img
            src={profileIcon}
            alt="Profile"
            className="rounded-full w-12 h-12 object-cover"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
