import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const { data } = await axios.get("/orders", {
          headers: { Authorization: token }
        });

        setOrders(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1524578271613-d550eacf6090">
      <Navbar />

      <div className="container mt-5 text-dark bg-light p-4 rounded">
        <h2>📦 My Orders</h2>

        {orders.length === 0 && <p>No Orders Yet.</p>}

        {orders.map(order => (
          <div
            key={order._id}
            className="card p-3 mb-3"
          >
            <h6>Total: ₹{order.totalPrice}</h6>
            <p>
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

export default Orders;
