import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items) || [];
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found || null);

    if (found) {
      // If products have category field use that, otherwise fallback to simple title matching
      const sameCategory = products.filter(
        (p) =>
          p.id !== found.id &&
          (p.category && found.category
            ? p.category === found.category
            : p.title && found.title
            ? p.title.split(" ")[0] === found.title.split(" ")[0] 
            : false)
      );
      setRelated(sameCategory.slice(0, 4));
    } else {
      setRelated([]);
    }
  }, [id, products]);

  if (!product)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-gray-600">
        Product not found.
      </p>
    );

  return (
    <div className="min-h-scree  bg-gray-60 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full max-w-md object-contain rounded"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col text-left">
          <h1 className="text-sm font-semibold text-blue-600 mb-1">Name</h1>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>

          <h3 className="text-sm font-semibold text-blue-600 mb-1">Price</h3>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ${product.price}
          </p>

          <h3 className="text-sm font-semibold text-blue-600 mb-1">Description</h3>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex flex-col md:flex-row  gap-3">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-600 text-white px-5 py-2 rounded-md w-full md:w-auto hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-800 px-4 py-2 w-full md:w-auto rounded-md hover:bg-gray-300 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h3>

        {related.length === 0 ? (
          <p className="text-gray-600">No related products found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp) => (
              <div
                key={rp.id}
                className="flex flex-col items-center border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={rp.image}
                  alt={rp.title}
                  className="h-40 w-full object-contain mb-3"
                />
                <h4 className="text-sm font-semibold text-center text-gray-800 mb-1 line-clamp-2">
                  {rp.title}
                </h4>
                <p className="text-gray-600 font-medium mb-3">${rp.price}</p>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => dispatch(addToCart(rp))}
                    className="bg-blue-600 text-white py-2 rounded-md w-1/2 text-sm hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => navigate(`/product/${rp.id}`)}
                    className="bg-gray-200 text-gray-800 py-2 rounded-md w-1/2 text-sm hover:bg-gray-300 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
