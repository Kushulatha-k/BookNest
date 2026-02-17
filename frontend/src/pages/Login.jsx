import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/users/login", form);

      localStorage.setItem("token", data.token);

      alert("Login Successful ✅");
      navigate("/books");

    } catch (error) {
      alert("Login Failed ❌");
      console.log(error.response?.data);
    }
  };

  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1521587760476-6c12a4b040da">
      <Navbar />

      <div className="container mt-5 bg-light p-4 rounded" style={{ maxWidth: "400px" }}>
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}

export default Login;
