import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center bg-gray-50 min-h-screen ">
  
      <div className="grid sm:grid-cols-1 md:grid-cols-4 items-center p-6 shadow-lg bg-white rounded-lg w-full mx-4 my-10">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center w-full h-full shadow rounded-lg border-b py-5 ml-2 mt-2"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[200px] h-[200px] object-contain rounded"
            />

            <div className="flex-1 px-4 text-center">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 flex items-center gap-1 text-sm"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
              >
                -
              </button>

              <span className="text-gray-700 font-medium">{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 text-lg"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Total price + Buttons center mein, neat & small */}
      <div className="flex flex-col items-center space-y-4 mb-10">
        <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm transition"
          >
            Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
