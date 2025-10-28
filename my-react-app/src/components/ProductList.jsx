import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 p-6">
      {items.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow flex flex-col justify-between h-full"
        >
    
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />
            <h3 className="text-lg font-semibold mt-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-700">${product.price}</p>

          
            <p className="text-gray-600 line-clamp-3 min-h-[60px]"></p>
          </div>

          {/* --- Buttons (always at bottom) --- */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-600 text-white px-[60px] py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaShoppingCart /> Add
            </button>

            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-1"
            >
              <FaEye /> View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
