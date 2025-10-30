import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    permanentAddress: "",
    currentAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-lg border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🛍️ Checkout Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "firstName", placeholder: "First Name" },
            { name: "lastName", placeholder: "Last Name" },
            { name: "permanentAddress", placeholder: "Permanent Address" },
            { name: "currentAddress", placeholder: "Current Address" },
            { name: "postalCode", placeholder: "Postal Code" },
            { name: "city", placeholder: "City" },
            { name: "country", placeholder: "Country" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-600 font-medium mb-1"
              >
                {field.placeholder}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 outline-none"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Proceed to Order
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Your information is secure 🔒 and used only for delivery.
        </p>
      </div>
    </div>
  );
}

export default Checkout;
