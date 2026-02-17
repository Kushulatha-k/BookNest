import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Cart() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "/orders",
        {
          books: cart.map(item => ({
            book: item._id,
            quantity: item.quantity
          })),
          totalPrice
        },
        {
          headers: { Authorization: token }
        }
      );

      alert("Order Placed Successfully 🎉");

      localStorage.removeItem("cart");
      setCart([]);

      navigate("/orders");

    } catch (error) {
      alert("Order Failed ❌");
    }
  };

  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1519681393784-d120267933ba">
      <Navbar />

      <div className="container mt-5 text-dark bg-light p-4 rounded">
        <h2>🛒 Your Cart</h2>

        {cart.length === 0 && <p>Your cart is empty.</p>}

        {cart.map(item => (
          <div
            key={item._id}
            className="d-flex align-items-center mb-3"
          >
            <img
              src={item.image}
              alt={item.title}
              width="80"
              className="me-3"
            />

            <div>
              <h6>{item.title}</h6>
              <p>
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h4>Total: ₹{totalPrice}</h4>

            <button
              className="btn btn-success mt-3"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default Cart;
