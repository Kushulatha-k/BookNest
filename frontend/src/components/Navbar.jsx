import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          BookNest
        </Link>

        <div>
          {token ? (
            <>
              <Link className="btn btn-light me-2" to="/books">
                Books
              </Link>
              <Link className="btn btn-warning me-2" to="/cart">
                Cart
              </Link>
              <Link className="btn btn-info me-2" to="/orders">
                Orders
              </Link>
              <button
                className="btn btn-danger"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-success me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
