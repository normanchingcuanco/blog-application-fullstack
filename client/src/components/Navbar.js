import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      {!token && <Link to="/login">Login</Link>} |{" "}
      {!token && <Link to="/register">Register</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;