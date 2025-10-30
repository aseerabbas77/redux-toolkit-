import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [menu, setMenu] = useState(false);

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-gray-900 text-white shadow-md z-50">
      {/* Hamburger icon (visible on mobile) */}
      <button
        className="text-2xl cursor-pointer md:hidden"
        onClick={() => setMenu(true)}
      >
        <FaBars />
      </button>

      <h1 className="text-2xl font-bold">MyStoe</h1>

      <div className="flex items-center gap-6">
        <Link to="/" className="hidden md:block">
          <h1 className="text-2xl font-bold">Home</h1>
        </Link>
          <Link to="/" className="hidden md:block">
          <h1 className="text-2xl font-bold">about</h1>
        </Link>
          <Link to="/" className="hidden md:block">
          <h1 className="text-2xl font-bold">contact</h1>
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col items-center justify-center gap-6 shadow-lg transform transition-transform duration-300 ${
          menu ? "translate-x-0 w-3/5" : "-translate-x-full w-3/5"
        } md:hidden`}
      >
        <button
          onClick={() => setMenu(false)}
          className="absolute top-5 right-5 text-2xl text-white hover:text-red-400"
        >
          <FaTimes />
        </button>

        <ul className="flex flex-col items-center gap-6 text-xl">
          <li>
            <Link to="/" onClick={() => setMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenu(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenu(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4 relative">
        <Link to="/cart">
          <button className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            <FaShoppingCart className="text-lg text-white" />
            <span className="text-white">Cart</span>

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
