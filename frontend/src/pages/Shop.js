import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import displayNPRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import SummaryApi from "../common";
import productCategory from "../helpers/productCategory";

const Shop = () => {
  const { fetchUserAddToCart } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryList = urlSearch.getAll("category");

  const urlCategoryObject = productCategory.reduce((acc, curr) => {
    acc[curr.value] = true;
    return acc;
  }, {});

  const [selectCategory, setSelectCategory] = useState(urlCategoryObject);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryList);
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response;

      // If search query is present
      if (location.search && location.search.includes("search=")) {
        response = await fetch(SummaryApi.searchProduct.url + location.search);
      }
      // If filtering by category
      else if (filterCategoryList.length > 0) {
        response = await fetch(SummaryApi.filterProduct.url, {
          method: SummaryApi.filterProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: filterCategoryList }),
        });
      }
      // Default: fetch all products
      else {
        response = await fetch("/api/product");
      }

      const result = await response.json();
      let products = result?.data || [];

      // Apply sorting
      if (sortBy === "asc") {
        products.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (sortBy === "dsc") {
        products.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }

      setData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Update filtered category list and update URL when category changes
  useEffect(() => {
    const activeCategories = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(activeCategories);

    const newUrl =
      activeCategories.length > 0
        ? `/shop?${activeCategories.map((cat) => `category=${cat}`).join("&")}`
        : `/shop`;

    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [selectCategory]);

  // Fetch products when URL search or sort changes
  useEffect(() => {
    fetchProducts();
  }, [location.search, sortBy]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Shop Products</h2>
      <div className="lg:grid grid-cols-[200px,1fr] gap-4">
        {/* Sidebar */}
        <div className="hidden lg:block bg-white p-4 rounded shadow">
          <h3 className="text-base font-semibold text-slate-600 border-b pb-1 mb-2">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sortBy"
                value="asc"
                checked={sortBy === "asc"}
                onChange={handleSortChange}
              />
              Price - Low to High
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sortBy"
                value="dsc"
                checked={sortBy === "dsc"}
                onChange={handleSortChange}
              />
              Price - High to Low
            </label>
          </form>

          <h3 className="text-base font-semibold text-slate-600 border-b pb-1 mb-2">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2">
            {productCategory.map((category) => (
              <label
                key={category.value}
                className="flex items-center gap-2 capitalize"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={category.value}
                  checked={!!selectCategory[category.value]}
                  onChange={handleSelectCategory}
                />
                {category.label}
              </label>
            ))}
          </form>
        </div>

        {/* Product Grid */}
        <div>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {loadingList.map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded shadow p-4 animate-pulse"
                >
                  <div className="h-48 bg-slate-200 mb-4 rounded" />
                  <div className="h-4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          )}

          {!loading && data.length === 0 && (
            <p className="bg-white text-center text-lg p-6 rounded shadow">
              No products found.
            </p>
          )}

          {!loading && data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="bg-white rounded shadow hover:shadow-md transition p-4 flex flex-col"
                >
                  <div className="h-48 flex items-center justify-center bg-slate-100 rounded mb-4">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="object-contain h-full hover:scale-110 transition-transform mix-blend-multiply"
                    />
                  </div>
                  <h3 className="font-medium text-lg line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-orange-600 font-medium">
                      {displayNPRCurrency(product.sellingPrice)}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      {displayNPRCurrency(product.price)}
                    </span>
                  </div>
                  <button
                    className="mt-3 text-sm bg-orange-600 hover:bg-orange-700 text-white py-1 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
