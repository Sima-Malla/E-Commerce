import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch(SummaryApi.allOrders.url, {
      method: SummaryApi.allOrders.method,
      credentials: "include",
    });

    const data = await response.json();
    if (data.success) {
      setOrders(data.data);
    } else {
      toast.error(data.message || "Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Selling Price</th>
            <th>User ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.productName}</td>
              <td>{order.brandName}</td>
              <td>{order.quantity}</td>
              <td>${order.price.toFixed(2)}</td>
              <td>${order.sellingPrice.toFixed(2)}</td>
              <td>{order.userId}</td>
              <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
