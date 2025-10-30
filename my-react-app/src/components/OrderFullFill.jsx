import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
function OrderFullFill() {
  const location = useLocation();
  const data = location.state; 
  const dispatch = useDispatch();
const navigate=useNavigate();
  const [state, setState] = useState("order-fullfillment");

  useEffect(() => {
    
    if(state==="order-placed"){
      dispatch(clearCart());
      const timer=setTimeout(() => {
        navigate('/')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state,navigate,dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-5 font-bold">{state}</h1>

    
      {data ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-left">
          <h2 className="text-2xl font-semibold mb-3">Customer Details</h2>
          <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
          <p><strong>Permanent Address:</strong> {data.permanentAddress}</p>
          <p><strong>Current Address:</strong> {data.currentAddress}</p>
          <p><strong>Postal Code:</strong> {data.postalCode}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Country:</strong> {data.country}</p>
        </div>
      ) : (
        <p>No data received.</p>
      )}

      <div className="flex gap-2 mt-5">
        <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition">
          Cash on Delivery
        </button>

        <button
          onClick={() => setState("order-placed")}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default OrderFullFill;
