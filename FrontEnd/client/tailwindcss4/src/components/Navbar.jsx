import React from 'react'
import { noExcuseLogo, profileIcon } from '../assets'

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-amber-300 py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
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
          placeholder="Search by category"
          className="w-[400px] px-4 py-2 rounded-full border border-black focus:ring-2 focus:ring-orange-400"
        />
      </div>

        <nav className="flex gap-4">
            <Link
                to="/products"
                className="font-mono font-bold text-xl !text-black px-6 py-2"
                >
                Shop
            </Link>
          <Link
            to="/cart"
            className="font-mono font-bold text-xl !text-black px-6 py-2"
          >
            Cart
          </Link>
          <Link
            to="/order"
            className="font-mono font-bold text-xl !text-black px-6 py-2"
          >
            Orders
          </Link>
          <Link
            to="/profile"
            >
            <img
                src={profileIcon}
                alt="Logo"
                className="rounded-full w-12 h-12 object-cover"
            />
          </Link> 

        </nav>
    </div>
  )
}

export default Navbar