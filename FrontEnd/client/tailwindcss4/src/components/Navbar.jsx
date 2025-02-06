import React from 'react'
import { noExcuseLogo, profileIcon } from '../assets'

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={noExcuseLogo}
            alt="Logo"
            className="rounded-lg w-12 h-12 object-cover"
          />
          <span className="font-sans text-3xl font-semibold text-gray-800">NoExcuse</span>
        </Link>

        <div className="flex flex-grow justify-center mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-[300px] px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

        <nav className="flex gap-4">
            <Link
                to="/products"
                className="font-mono font-bold text-lg bg-blue-200 !text-black px-6 py-2 rounded-lg transition-all hover:bg-blue-600 shadow-md"
                >
                Products
            </Link>
          <Link
            to="/cart"
            className="font-mono font-bold text-lg bg-blue-200 !text-black px-6 py-2 rounded-lg transition-all hover:bg-blue-600 shadow-md"
          >
            Cart
          </Link>
          <Link
            to="/order"
            className="font-mono font-bold text-lg bg-blue-200 !text-black px-6 py-2 rounded-lg transition-all hover:bg-blue-600 shadow-md"
          >
            Orders
          </Link>
          <Link
            to="/profile"
            >
            <img
                src={profileIcon}
                alt="Logo"
                className="rounded-lg w-12 h-12 object-cover"
            />
          </Link> 

        </nav>
    </div>
  )
}

export default Navbar