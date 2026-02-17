import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/users/register", form);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed ❌");
      console.log(error.response?.data);
    }
  };

  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1495446815901-a7297e633e8d">
      <Navbar />

      <div className="container mt-5 bg-light p-4 rounded" style={{ maxWidth: "400px" }}>
        <h2>Register</h2>

        <form onSubmit={submitHandler}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            Register
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}

export default Register;
