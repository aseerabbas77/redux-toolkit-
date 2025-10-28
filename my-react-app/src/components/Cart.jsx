import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Total price calculation
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <h2 className="text-center text-xl">🛒 Your Cart is Empty</h2>
      </div>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50">
      <div className="flex flex-col p-6 shadow-lg bg-white rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Your Cart
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-3"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain rounded"
            />

            <div className="flex-1 px-4">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700">x {item.quantity}</span>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 text-lg"
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        {/* 💰 Total Price */}
        <div className="flex justify-between items-center mt-4 text-lg font-semibold text-gray-800">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        {/* 🧹 Clear Cart Button */}
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-6 rounded w-full transition"
        >
          Clear Cart
        </button>

        {/* 💳 Checkout Button */}
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-3 rounded w-full transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
