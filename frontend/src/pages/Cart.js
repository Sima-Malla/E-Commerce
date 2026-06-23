import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayNPRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await handleLoading();
      setLoading(false);
    };
    load();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });
        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_YOUR_PUBLISHABLE_KEY_HERE");

      // Normalize product data for backend
      const body = {
        products: data.map((item) => ({
          name: item.productId.productName,
          image: item.productId.productImage[0],
          price: item.productId.sellingPrice,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(
        "http://localhost:8080/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      if (session.id) {
        stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/*** View product list */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={"loading-" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                />
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product.productId.productImage[0]}
                      alt={product.productId.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-orange-600 rounded-full p-2 hover:bg-orange-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product.productId.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.productId.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-orange-600 font-medium text-lg">
                        {displayNPRCurrency(product.productId.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayNPRCurrency(
                          product.productId.sellingPrice * product.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          decreaseQty(product._id, product.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          increaseQty(product._id, product.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/*** Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse" />
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-orange-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayNPRCurrency(totalPrice)}</p>
              </div>

              <button
                onClick={makePayment}
                className="bg-blue-600 p-2 text-white w-full mt-2"
              >
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
