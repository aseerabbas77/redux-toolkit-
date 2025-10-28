import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-gray-900 text-white shadow-md z-50">
      <h1 className="text-xl font-bold">MyStore</h1>
      <Link 
       to="/" 
      >
        <h1 className="text-2xl font-bold">Home</h1>
      </Link>
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
